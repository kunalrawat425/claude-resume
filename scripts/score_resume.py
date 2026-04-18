#!/usr/bin/env python3
"""
Heuristic ATS score estimator.

Runs a set of checks against a DOCX or plain-text resume and returns a
per-category score plus an overall estimate. Mirrors the rubric in
references/scoring-rubric.md.

Usage:
    python3 score_resume.py path/to/resume.docx
    python3 score_resume.py path/to/resume.txt

Exit code 0 always; use the printed score.
"""

import re
import sys
from collections import Counter
from pathlib import Path


STANDARD_HEADINGS = {
    "professional summary", "summary", "profile",
    "technical skills", "skills",
    "professional experience", "experience", "work experience",
    "education",
    "projects", "certifications", "publications",
}

VAGUE_PHRASES = [
    "hard worker", "team player", "results-driven", "go-getter",
    "passionate", "detail-oriented", "self-starter", "synergy",
    "dynamic individual", "proven track record of success",
    "responsible for", "tasks included", "duties involved",
    "was tasked with", "helped to", "worked on",
]

PASSIVE_PATTERNS = [
    r"\bwas\s+\w+ed\b",
    r"\bwere\s+\w+ed\b",
    r"\bbeen\s+\w+ed\b",
    r"\bbeing\s+\w+ed\b",
    r"\bresponsible\s+for\b",
    r"\btasked\s+with\b",
    r"\binvolved\s+in\b",
]

STRONG_VERBS = set("""
Architected Built Designed Developed Engineered Implemented Launched Released
Shipped Deployed Created Constructed Established Pioneered Prototyped Productionized
Led Owned Drove Directed Headed Spearheaded Championed Mentored Coached Guided
Coordinated Orchestrated Aligned Partnered Convened
Optimized Improved Reduced Cut Accelerated Increased Boosted Lifted Doubled Tripled
Streamlined Refactored Rebuilt Modernized Hardened Stabilized Migrated
Analyzed Assessed Audited Diagnosed Evaluated Forecasted Modeled Researched
Investigated Identified Defined Strategized Prioritized Planned Roadmapped
Delivered Achieved Generated Produced Secured Won Closed Captured Acquired
Retained Recovered Expanded Grew Saved Earned Promoted Resolved Documented
Automated Integrated Redesigned Rolled Tuned Headed Handled
""".split())


def extract_text(path: Path) -> str:
    if path.suffix.lower() == ".docx":
        try:
            import zipfile, xml.etree.ElementTree as ET
            with zipfile.ZipFile(path) as z:
                with z.open("word/document.xml") as f:
                    tree = ET.parse(f)
            ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
            texts = [t.text or "" for t in tree.iter("{%s}t" % ns["w"])]
            return "\n".join(texts)
        except Exception as e:
            print(f"[warn] DOCX parse failed ({e}); reading as text.", file=sys.stderr)
    return path.read_text(encoding="utf-8", errors="ignore")


def split_bullets(text: str) -> list[str]:
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    bullets = []
    for ln in lines:
        # Heuristic: likely a bullet if line starts with •, -, *, or if
        # it begins with a strong verb in past tense and is at least 5 words.
        if ln[:1] in {"•", "-", "*", "▸", "►"}:
            bullets.append(ln.lstrip("•-*▸► ").strip())
            continue
        first_word = re.match(r"^[A-Za-z]+", ln)
        if first_word and first_word.group(0) in STRONG_VERBS and len(ln.split()) >= 5:
            bullets.append(ln)
    return bullets


def score_parsability(text: str) -> tuple[int, list[str]]:
    notes = []
    score = 100
    # Multi-column hint: lots of lines with wide internal whitespace runs often
    # indicate two-column text bleed (sidebar content mid-line).
    wide_gaps = sum(1 for ln in text.splitlines() if "  " in ln and len(ln) > 50)
    total = max(1, len([ln for ln in text.splitlines() if ln.strip()]))
    if wide_gaps / total > 0.25:
        score -= 8
        notes.append("Possible multi-column layout (many wide internal gaps).")
    if len(text) < 800:
        score -= 10
        notes.append("Very short text — parse may have failed or resume is too brief.")
    return max(0, min(100, score)), notes


def score_headings(text: str) -> tuple[int, list[str]]:
    found = set()
    for ln in text.splitlines():
        candidate = ln.strip().lower().rstrip(":")
        if candidate in STANDARD_HEADINGS:
            found.add(candidate)
    core = {"summary", "professional summary", "profile"}, \
           {"experience", "professional experience", "work experience"}, \
           {"education"}, {"skills", "technical skills"}
    hits = sum(1 for s in core if found & s)
    score = 60 + hits * 10
    notes = []
    if hits < 4:
        missing = [list(s)[0] for s in core if not (found & s)]
        notes.append(f"Missing or non-standard headings for: {', '.join(missing)}")
    return min(100, score), notes


def score_quantification(bullets: list[str]) -> tuple[int, list[str]]:
    if not bullets:
        return 60, ["No bullets detected — skipping quantification check."]
    numeric = re.compile(r"\d")
    with_number = sum(1 for b in bullets if numeric.search(b))
    ratio = with_number / len(bullets)
    if ratio >= 0.9:
        score = 98
    elif ratio >= 0.75:
        score = 92
    elif ratio >= 0.6:
        score = 85
    elif ratio >= 0.4:
        score = 72
    else:
        score = 55
    notes = [f"{with_number}/{len(bullets)} bullets quantified ({ratio:.0%})."]
    return score, notes


def score_verb_variety(bullets: list[str]) -> tuple[int, list[str]]:
    verbs = []
    for b in bullets:
        m = re.match(r"^([A-Z][a-z]+)", b)
        if m:
            verbs.append(m.group(1))
    counts = Counter(verbs)
    over = {v: c for v, c in counts.items() if c >= 3}
    if not over:
        return 95, [f"No verb used 3+ times (best: {', '.join(f'{v}={c}' for v, c in counts.most_common(3))})."]
    penalty = sum(min(10, (c - 2) * 4) for v, c in over.items())
    notes = [f"Repeated verbs: " + ", ".join(f"{v} ({c}x)" for v, c in over.items())]
    return max(40, 92 - penalty), notes


def score_active_voice(text: str) -> tuple[int, list[str]]:
    hits = 0
    examples = []
    for pat in PASSIVE_PATTERNS:
        for m in re.finditer(pat, text, re.IGNORECASE):
            hits += 1
            if len(examples) < 3:
                start = max(0, m.start() - 20)
                end = min(len(text), m.end() + 20)
                examples.append(text[start:end].strip())
    if hits == 0:
        return 96, ["No passive constructions detected."]
    penalty = min(40, hits * 4)
    return max(55, 95 - penalty), [f"{hits} passive constructions. Examples: {examples[:3]}"]


def score_vague(text: str) -> tuple[int, list[str]]:
    lower = text.lower()
    hits = [p for p in VAGUE_PHRASES if p in lower]
    if not hits:
        return 96, ["No vague filler detected."]
    return max(50, 95 - len(hits) * 8), [f"Vague phrases found: {hits}"]


def score_length(text: str, path: Path) -> tuple[int, list[str]]:
    words = len(text.split())
    if 400 <= words <= 900:
        return 95, [f"Length looks like 1-2 pages ({words} words)."]
    if words < 300:
        return 70, [f"Too short ({words} words) — may parse as incomplete."]
    if words > 1400:
        return 72, [f"Too long ({words} words) — likely 3+ pages."]
    return 85, [f"Length is borderline ({words} words)."]


def overall(scores: dict) -> float:
    weights = {
        "parsability": 0.15,
        "headings": 0.10,
        "quantification": 0.18,
        "verbs": 0.12,
        "active_voice": 0.10,
        "vague": 0.10,
        "length": 0.10,
        "visual": 0.15,    # assumed high for an ATS-built DOCX
    }
    # Visual default: assume 95 for a DOCX from our template; caller can override.
    scores.setdefault("visual", 95)
    total = sum(scores[k] * weights[k] for k in weights)
    return round(total, 1)


def main():
    if len(sys.argv) < 2:
        print("Usage: score_resume.py <resume.docx|resume.txt>")
        sys.exit(1)

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"File not found: {path}")
        sys.exit(1)

    text = extract_text(path)
    bullets = split_bullets(text)

    results = {}
    all_notes = {}

    results["parsability"], all_notes["parsability"] = score_parsability(text)
    results["headings"], all_notes["headings"] = score_headings(text)
    results["quantification"], all_notes["quantification"] = score_quantification(bullets)
    results["verbs"], all_notes["verbs"] = score_verb_variety(bullets)
    results["active_voice"], all_notes["active_voice"] = score_active_voice(text)
    results["vague"], all_notes["vague"] = score_vague(text)
    results["length"], all_notes["length"] = score_length(text, path)

    total = overall(results)

    print(f"\n  ATS score estimate for: {path.name}")
    print("  " + "-" * 50)
    for k, v in results.items():
        print(f"  {k:15s}  {v:3d}/100")
        for note in all_notes.get(k, []):
            print(f"    > {note}")
    print("  " + "-" * 50)
    print(f"  Overall (weighted)     {total}/100")
    print()
    if total >= 90:
        print("  Strong — should score well on any major ATS scanner.")
    elif total >= 80:
        print("  Decent — a few fixes above will push it over 90.")
    elif total >= 70:
        print("  Below the typical 75% recruiter-visibility threshold. Fix the issues above.")
    else:
        print("  Major issues. Rewrite using the ATS Resume Optimizer skill.")


if __name__ == "__main__":
    main()
