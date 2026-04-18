# Architecture

A Claude Code plugin containing one primary skill and two helper sub-skills, plus shared scripts.

## Repo layout

```
claude-resume/
├── .claude-plugin/
│   └── marketplace.json       # plugin manifest
├── docs/                       # public-facing docs (this folder)
├── screenshots/                # cover image, demo gifs
├── scripts/                    # shared executables
│   ├── build_ats_resume.js     # DOCX builder (docx-js template)
│   └── score_resume.py         # heuristic ATS scorer
├── skills/                     # Claude skills
│   ├── resume/                 # primary skill
│   │   ├── SKILL.md
│   │   └── references/         # loaded on demand
│   │       ├── resume-best-practices.md
│   │       ├── interview-prompts.md
│   │       └── scoring-rubric.md
│   ├── resume-score/           # standalone scorer skill
│   │   └── SKILL.md
│   └── resume-jd-tune/         # standalone JD tuner skill
│       └── SKILL.md
├── install.sh                  # macOS / Linux installer
├── install.ps1                 # Windows installer
├── uninstall.sh
├── uninstall.ps1
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
└── PRIVACY.md
```

## How the skills relate

`skills/resume/SKILL.md` is the orchestrator. It runs the 5-phase workflow (interview → diagnose → rewrite → build → score) and delegates to the helper sub-skills when the user invokes their commands directly:

```
/resume build      → resume orchestrator
/resume rewrite    → resume orchestrator
/resume diagnose   → resume orchestrator
/resume score      → resume-score sub-skill
/resume tune       → resume-jd-tune sub-skill
```

Each sub-skill has its own `SKILL.md` and is invocable on its own; the orchestrator just routes to it.

## Scripts vs skills

Skills contain prompts and references — instructions for Claude. Scripts contain deterministic code — DOCX generation and parsing-style scoring. The skill's SKILL.md tells Claude when and how to invoke each script.

`scripts/build_ats_resume.js` is a `docx-js` template. Claude populates the `DATA` object with the rewritten content and runs `node build_ats_resume.js`. The script handles fonts, numbering, margins, and section spacing — Claude never hand-writes docx XML.

`scripts/score_resume.py` is a Python heuristic that extracts text from a DOCX (via `zipfile` + `xml.etree.ElementTree`), runs regex / count checks across 7 categories, and returns a weighted overall.

## Field detection

The orchestrator detects field from the user's stated target role and current title, then picks the skills-section structure (engineering uses `Languages` / `Backend`, marketing uses `Channels` / `Tools`, healthcare uses `Clinical Skills` / `EMR`, etc.). See the field detection table in `skills/resume/SKILL.md`.

## Career-stage detection

Detects from years of experience:

- 0–2 yrs → entry → 1 page, education first
- 3–9 yrs → mid → 1–2 pages, experience first
- 10+ yrs → senior / staff / principal → 2 pages, leadership signals
- Director+ → executive → 2–3 pages, P&L / org-scale signals

## Quality gates

Before handing off the DOCX, the orchestrator verifies: ≥60% bullets quantified, no verb >2x, 0 passive constructions, 4 standard headings, target page count, canonical job titles, no vague filler, contact info in body.

If a gate fails, the orchestrator re-runs the rewrite phase on just the failing section. It doesn't hand off a resume that fails its own checks.
