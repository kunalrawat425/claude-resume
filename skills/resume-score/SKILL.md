---
name: resume-score
description: "Estimate the ATS score of a resume file (DOCX or text). Returns per-category scores (parsability, headings, quantification, verb variety, active voice, vague filler, length) and a weighted overall 0-100. Triggers on: score my resume, ATS score, how good is my resume, rate my resume, /resume score."
user-invokable: true
argument-hint: "<file>"
license: MIT
metadata:
  author: Kunal Rawat
  version: 1.0.0
  category: career
  parent-skill: resume
---

# Resume Score: Heuristic ATS Score Estimator

**Invocation:** `/resume score <file>`

**Scripts:** `scripts/score_resume.py` at the plugin root.

Runs heuristic checks against a resume DOCX or text file and returns per-category scores plus a weighted overall (0–100). Mirrors the rubric in the parent `resume` skill's `references/scoring-rubric.md`.

## Behavior

**Always interview the user briefly before scoring** — even though scoring is technically file-only, the score is more useful when contextualized to the role/seniority the user is targeting. Use `mcp__conductor__AskUserQuestion` (one question per call) to ask:

1. Target role and seniority
2. Years of experience
3. Page-count preference (1 / 2)
4. JD available? (paste if yes — used for keyword-coverage commentary)

Skip any answers already inferable from the file's content (e.g., title in header). Then run the score script and present the results with the user's target context applied.

## Quick Reference

| Step | What it does |
|---|---|
| 1 | Brief interview (target role, YoE, page count, optional JD) via AskUserQuestion. |
| 2 | Extract text from DOCX (zipfile + ElementTree) or read raw text. |
| 3 | Detect bullets via standard markers + strong-verb prefix heuristic. |
| 4 | Score 7 categories independently. |
| 5 | Compute weighted overall and print breakdown with target-role commentary. |

## Categories

- **Parsability** — column/whitespace-bleed detection.
- **Headings** — count of standard section headings present.
- **Quantification** — fraction of bullets containing a number.
- **Verb variety** — flags any verb used 3+ times.
- **Active voice** — regex for passive constructions.
- **Vague filler** — exact-match list of buzzwords.
- **Length** — word count vs typical 1–2 page range.

## Output

```
  ATS score estimate for: my_resume.docx
  --------------------------------------------------
  parsability      100/100
  headings         100/100
  quantification    98/100
    > 27/27 bullets quantified (100%).
  verbs             95/100
    > No verb used 3+ times.
  active_voice      96/100
    > No passive constructions detected.
  vague             96/100
  length            95/100
  visual            95/100
  --------------------------------------------------
  Overall (weighted)     97.0/100
```

## Caveat

This is a heuristic, not a real ATS scan. For the actual score against a specific scanner, run the file through Jobscan, Resume Worded, Enhancv, or TopResume. Use this skill to catch issues before submission.
