<!-- Updated: 2026-05-06 -->

![Fix My Resume](screenshots/cover-image.png)

# Fix My Resume — ATS Resume Optimizer for Claude Code

> **Your resume is getting rejected before a human ever reads it.**
> ATS software auto-screens 98% of applicants. Most resumes fail on vague bullets, passive voice, repeated verbs, and missing keywords — not on qualifications.
> This skill fixes that.

Comprehensive ATS resume builder and optimizer for Claude Code. Interview-driven — asks you the right questions first, then writes, scores, and tunes your resume to pass any major ATS scanner. Works for any field: engineering, product, marketing, design, sales, finance, data, healthcare, legal, operations, HR, education, nonprofit, government.

![Resume Command Demo](screenshots/resume-command-demo.gif)

[![CI](https://github.com/kunalrawat425/fix-my-resume/actions/workflows/ci.yml/badge.svg)](https://github.com/kunalrawat425/fix-my-resume/actions/workflows/ci.yml)
[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-blue)](https://claude.ai/claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/release/kunalrawat425/fix-my-resume)](https://github.com/kunalrawat425/fix-my-resume/releases)

---

## Why This Exists

Most resume advice is generic. Most resume tools are expensive SaaS. Most AI resume generators hallucinate metrics.

This skill is different:

- **Interview-first** — never writes a word until it knows your actual achievements, metrics, and target role
- **Refuses to fabricate** — if there's no number, it asks you for one
- **ATS-native output** — single-column DOCX, Arial font, no tables, no images, no text boxes — exactly what Workday, Greenhouse, and Lever parse correctly
- **Free** — runs in Claude Code, open source, MIT licensed

---

## Before & After ATS Score

Here's what the skill catches and fixes on a real bad resume:

### Before (typical first-draft resume)

```
OBJECTIVE
Hard-working, passionate team player looking for opportunities.

WORK HISTORY
Software Engineer at BigCo, 2020-Present
- Was responsible for working on backend services
- Tasks included writing code and reviewing PRs
- Worked on improving performance
- Worked on migrating systems
- Worked on debugging issues

Engineer at SmallCo, 2018-2020
- Responsibilities included building features
- Was involved in deployments
- Was tasked with fixing bugs
```

```
ATS Score: 73.5/100   ← Below recruiter visibility threshold

  parsability      90/100
  headings         70/100   ← Missing standard sections
  quantification   55/100   ← 0/10 bullets have a number
  verbs            78/100   ← "Worked" repeated 5x, "Was" repeated 3x
  active_voice     75/100   ← 5 passive constructions
  vague_filler     50/100   ← "team player", "responsible for", "tasks included"
  length           70/100
```

### After (skill-rewritten)

```
PROFESSIONAL SUMMARY
Senior Software Engineer with 6 years building distributed payment systems.
Shipped retry pipeline recovering $18M annually. Cut infra cost 38%.

TECHNICAL SKILLS
Languages: Go, Python, TypeScript
Backend: gRPC, Postgres, Redis, Kafka
Cloud & DevOps: AWS, Kubernetes, Terraform

PROFESSIONAL EXPERIENCE
Software Engineer, BigCo | 2020–Present
- Shipped retry pipeline recovering $18M in failed payments annually
- Reduced p99 order latency 42% by replacing JSON with protobuf
- Migrated 9 services to gRPC, cutting east-west bandwidth cost 38%
- Mentored 3 engineers; 2 promoted to senior in 14 months

Engineer, SmallCo | 2018–2020
- Built feature flag service used by 40 engineers across 5 product teams
- Cut deploy time 78% (45 min → 10 min) by parallelizing test suite
- Resolved 120+ production bugs, lifted SLO from 99.5% to 99.92%
```

```
ATS Score: 94.5/100   ← Strong — passes any major scanner

  parsability      100/100
  headings         100/100
  quantification    98/100   ← 8/8 bullets quantified (100%)
  verbs             95/100   ← No verb used 3+ times
  active_voice      96/100   ← 0 passive constructions
  vague_filler      96/100   ← No vague filler detected
  length            70/100   ← Short sample; real resume hits 95+
```

**+21 points. Same person, same experience. Just better writing.**

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
- [What It Does](#what-it-does)
- [What It Cannot Do](#what-it-cannot-do)
- [Use Cases](#use-cases)
- [Features](#features)
- [Limitations](#limitations)
- [Architecture](#architecture)
- [Extensions](#extensions)
- [Ecosystem](#ecosystem)
- [Requirements](#requirements)
- [Uninstall](#uninstall)
- [Contributing](#contributing)

---

## Installation

### Plugin Install (Claude Code 1.0.33+)

```bash
# Add marketplace (one-time)
/plugin marketplace add kunalrawat425/fix-my-resume

# Install plugin
/plugin install resume@fix-my-resume
```

### Manual Install (macOS / Linux)

```bash
git clone --depth 1 https://github.com/kunalrawat425/fix-my-resume.git
bash fix-my-resume/install.sh
```

<details>
<summary>One-liner (curl)</summary>

```bash
curl -fsSL https://raw.githubusercontent.com/kunalrawat425/fix-my-resume/main/install.sh | bash
```

Prefer to review first?

```bash
curl -fsSL https://raw.githubusercontent.com/kunalrawat425/fix-my-resume/main/install.sh > install.sh
cat install.sh
bash install.sh
rm install.sh
```

</details>

### Windows (PowerShell)

```powershell
git clone --depth 1 https://github.com/kunalrawat425/fix-my-resume.git
powershell -ExecutionPolicy Bypass -File fix-my-resume\install.ps1
```

> **Why git clone instead of `irm | iex`?** Piping remote scripts into your shell runs unreviewed code. Clone lets you inspect `install.ps1` first.

---

## Quick Start

```bash
# Build a new resume from scratch — skill interviews you first
/resume

# Rewrite an existing resume (fixes every ATS flag)
/resume path/to/resume.docx

# Score your resume (0–100 with per-category breakdown)
/resume score path/to/resume.docx

# Tailor your resume to a specific job description
/resume tune path/to/resume.docx path/to/jd.txt

# Diagnose issues without rewriting
/resume diagnose path/to/resume.docx
```

> **Interview always fires first.** Every command opens with a set of structured questions via numbered options — one at a time, never batched. Picks up where you left off if you already provided info.

---

## Commands

| Command | Description |
|---------|-------------|
| `/resume` | Interview → build ATS-safe resume from scratch |
| `/resume <file>` | Parse existing resume → interview to fill gaps → diagnose → rewrite |
| `/resume score <file>` | Heuristic ATS score, 7 categories, 0–100 weighted |
| `/resume diagnose <file>` | List every issue by line, no rewrite |
| `/resume tune <file> <jd>` | Keyword-tune to JD; targets 75–80% Jobscan match |

---

## What It Does

### Catches and fixes every common ATS failure mode

| Issue | Example | Fix applied |
|-------|---------|-------------|
| **Vague filler** | "hard worker", "team player", "results-driven" | Removed — banned list enforced |
| **Passive voice** | "was responsible for", "tasks included" | Rewritten to active verbs |
| **Verb repetition** | "Worked" used 5× | Diversified: Shipped / Built / Migrated / Mentored / Reduced |
| **No metrics** | "improved performance" | Asks you for the number — never invents |
| **Non-standard headings** | "Career History", "Skillset" | Normalized to EXPERIENCE / SKILLS / EDUCATION |
| **Wrong format** | Tables, columns, text boxes, photos | Produces single-column plain DOCX |
| **Missing keywords** | JD says "Kubernetes", resume says "k8s" | Adds both (parsers handle one or the other) |
| **Fabricated titles** | "Ninja", "Guru", "Wizard" | Replaced with canonical titles |
| **Header contact info** | Email in header/footer | Moved to body (Workday/Greenhouse parse body only) |

### Produces a real, ready-to-submit DOCX

- Single-column layout (no tables, images, text boxes)
- Arial font, US Letter, 0.5–0.6" margins
- True OOXML bullet numbering — not unicode hacks
- Contact info in body (not header/footer)
- ATS-safe hyperlinks in body text

### Scores before and after

`/resume score` runs a Python heuristic across 8 categories and returns a weighted 0–100. Shows exactly what's dragging the score down and by how much.

---

## What It Cannot Do

Be explicit about limits:

| Cannot | Why |
|--------|-----|
| **Invent metrics** | Fabricated numbers are a fireable offense. Asks you instead. |
| **Guarantee job interviews** | ATS score ≠ hiring decision. Human review still matters. |
| **Fetch your LinkedIn profile** | Requires LinkedIn MCP extension (optional add-on) |
| **Submit to job portals** | Produces the DOCX — you submit it |
| **Do real Jobscan scan** | Heuristic scorer mirrors Jobscan methodology, not API-connected |
| **Build designer resumes** | Two-column, photo, sidebar resumes score lower on ATS — deliberately not supported |
| **Apply for remote/visa sponsorship** | Puts your preference on the resume — doesn't apply |
| **Write cover letters** | Separate skill (see Ecosystem) |
| **Guarantee accuracy of your own data** | Flags user-provided metrics as "unverifiable" but includes them |
| **Handle non-English resumes** | English only in v1 |

---

## Use Cases

### When to use this skill

**You're applying and getting no callbacks**
→ `/resume diagnose your-resume.docx` — see exactly what ATS is rejecting and why

**You want to rewrite from scratch for a new role**
→ `/resume` — interview-driven, starts fresh, never borrows from old positions

**You have a resume but it's vague and metric-free**
→ `/resume your-resume.docx` — rewrite phase quantifies every bullet and cuts filler

**You found a specific job posting you want**
→ `/resume tune your-resume.docx jd.txt` — keyword-match to that exact JD

**You want a score before submitting**
→ `/resume score your-resume.docx` — 30-second pass, see where you land

**You're mid-level changing industries**
→ `/resume` — field detection picks the right skills-section structure for the target industry

**You're senior/staff pivoting to a new company**
→ `/resume your-resume.docx` + `/resume tune` — preserve leadership signals, tune keywords

**You haven't updated your resume in years**
→ `/resume your-resume.docx` — extracts all your existing content, modernizes format and language

### When NOT to use this skill

- You need a visually designed, two-column, PDF portfolio resume for creative roles
- You want to generate fake experience or credentials
- You need cover letters (use a cover letter skill)
- You want to auto-apply to jobs at scale

---

## Features

### Interview-First, Every Time
Every command — `/resume`, `/resume <file>`, `/resume score`, `/resume tune` — opens with a structured interview. Questions come one at a time with numbered choices (≤4 options per prompt, tool constraint). Adapts based on answers; skips questions already answered from an uploaded file.

**Required block (always asked):**
target role → company type → years of experience → current title → JD (paste or skip) → top achievements with metrics → core skills → prior ATS scan results → page count

### Career-Stage Aware

| Stage | Length | Structure |
|-------|--------|-----------|
| Entry (0–2 yrs) | 1 page | Education first |
| Mid (3–9 yrs) | 1–2 pages | Experience first |
| Senior / Staff (10+ yrs) | 2 pages | Leadership signals prominent |
| Executive (Director+) | 2–3 pages | P&L / org scale, board section |

### Universal Field Support

| Field | Skills structure |
|-------|-----------------|
| Software Engineering | Languages, Backend, Frontend, Cloud & DevOps, Architecture |
| Product Management | Methodologies, Tools, Domains, Analytics, Leadership |
| Marketing | Channels, Tools, Analytics, Content, Strategy |
| Design | Tools, Methods, Disciplines, Research, Leadership |
| Sales | Methodologies, Tools, Industries, Skills |
| Finance / Analytics | Tools, Modeling, Reporting, Compliance |
| Data / ML | Languages, ML/DL, Data Platforms, Cloud |
| Healthcare | Clinical Skills, EMR, Certifications, Specialties |
| Legal | Practice Areas, Bar Admissions, Software |
| Operations / HR | Frameworks, Software, Domains, Compliance |

### Quality Gates (enforced before every DOCX)

- ≥60% of bullets carry a number (target 90%+)
- No verb used more than 2× across the whole resume
- Zero passive voice constructions
- Exactly 4 canonical section headings
- Page count matches your preference
- No fabricated metrics
- No vague filler (banned list: "hard worker", "passionate", "team player", "results-driven", "synergy", "leverage", "dynamic")
- Contact info in body, not header/footer

---

## Limitations

Know these before you start:

**The heuristic scorer is not Jobscan.** It mirrors Jobscan/Resume Worded methodology using regex and word counts. It does not call the Jobscan API. Scores may differ from real scanner output by ±5–10 points. Use the score to find issues, not as a final pass/fail.

**DOCX bullet detection on built resumes.** The score estimator's bullet detector uses regex against standard markers. The DOCX builder uses OOXML true bullets, which the parser reads correctly — but the text-extract path may undercount bullets. Run the scorer on a `.txt` export if you want a perfect count.

**No real-time JD fetching.** `/resume tune` requires you to paste the JD text or provide a local file. JD URL fetching requires the optional JD Crawler extension.

**English only.** Field detection, verb tally, and passive voice detection are English-only. Non-English resumes will still parse and format, but the language quality checks won't fire.

**Long careers hit the 2-page wall.** 20+ years of experience will be trimmed to 2 pages. The oldest roles go to 1–2 bullets. Metrics are never cut — context sometimes is.

**Designer resumes deliberately unsupported.** Two-column, photo, sidebar, pill-tag layouts score 20–40 points lower on ATS. This skill does not produce them. Use a visual design tool for portfolio/recruiter-facing versions.

---

## Architecture

```
~/.claude/plugins/fix-my-resume/
├── skills/
│   ├── resume/               # Primary skill — orchestrates 5-phase workflow
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── interview-prompts.md   # All interview questions (≤4 opts each)
│   │       ├── resume-best-practices.md
│   │       └── scoring-rubric.md
│   ├── resume-score/         # Standalone scorer
│   └── resume-jd-tune/       # Standalone JD tuner
├── scripts/
│   ├── build_ats_resume.js   # DOCX builder (docx-js, auto-resolves global install)
│   └── score_resume.py       # Heuristic scorer (pure Python, no deps)
└── docs/
    ├── INSTALLATION.md
    ├── COMMANDS.md
    ├── ARCHITECTURE.md
    └── TROUBLESHOOTING.md
```

**5-phase workflow — phases never skipped:**

1. **Interview** — AskUserQuestion, one at a time, ≤4 options, mandatory on every command
2. **Diagnose** — map every issue to specific lines before touching anything
3. **Rewrite** — apply best-practices rules, enforce quality gates
4. **Build** — populate `build_ats_resume.js` DATA object, run with `node`, validate page count
5. **Score** — run `score_resume.py`, report per-category, confirm quality gate pass

---

## Extensions

Optional add-ons via MCP servers.

### LinkedIn Profile Sync
Pull resume content from your LinkedIn profile to skip the interview phase.
```bash
./extensions/linkedin/install.sh
```
See [LinkedIn Extension](extensions/linkedin/README.md).

### Jobscan API
Submit the built DOCX to Jobscan's real scanner, get the actual score back.
```bash
./extensions/jobscan/install.sh
```
See [Jobscan Extension](extensions/jobscan/README.md).

### JD Crawler
Fetch a JD from a URL (LinkedIn Jobs, Indeed, Greenhouse, Lever, Workday) for `/resume tune`.
```bash
./extensions/jd-crawler/install.sh
```
See [JD Crawler Extension](extensions/jd-crawler/README.md).

---

## Ecosystem

| Skill | What it does | How it connects |
|-------|--------------|-----------------|
| [Fix My Resume](https://github.com/kunalrawat425/fix-my-resume) | ATS builder, scorer, JD tuner | Core — produces the DOCX |
| [Claude Cover Letter](https://github.com/kunalrawat425/claude-cover-letter) | Tailored cover letters | Reuses your resume metrics + target role |
| [Claude Job Search](https://github.com/kunalrawat425/claude-job-search) | LinkedIn / Indeed / Greenhouse discovery | Feeds JDs into `/resume tune` |
| [Claude Interview Prep](https://github.com/kunalrawat425/claude-interview-prep) | Mock interview drills | Pulls bullet metrics for behavioral questions |

**Full job-search workflow:**
```
1. /job-search find "Senior Backend Engineer remote"   — get matching JDs
2. /resume tune my-resume.docx jd-1.txt               — tailor to top match
3. /cover-letter draft my-resume.docx jd-1.txt        — write cover letter
4. /interview-prep behavioral my-resume.docx           — drill behavioral Qs
5. Submit DOCX + cover letter via the portal
```

---

## Requirements

- Claude Code 1.0.33+ (for plugin install) or any Claude environment with skill support
- Node.js 18+ — DOCX builder (`npm install -g docx` run automatically by `install.sh`)
- Python 3.9+ — heuristic scorer (no extra packages)
- Optional: LibreOffice (`soffice`) for PDF preview

---

## Documentation

- [Installation Guide](docs/INSTALLATION.md)
- [Commands Reference](docs/COMMANDS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Resume Best Practices (2026)](skills/resume/references/resume-best-practices.md)
- [Interview Prompts](skills/resume/references/interview-prompts.md)
- [Scoring Rubric](skills/resume/references/scoring-rubric.md)

---

## Uninstall

```bash
# Plugin install
/plugin uninstall resume@fix-my-resume
/plugin marketplace remove kunalrawat425/fix-my-resume

# Manual
bash uninstall.sh         # macOS / Linux
powershell -ExecutionPolicy Bypass -File uninstall.ps1   # Windows
```

---

## Community Contributors

| Contributor | Contribution |
|-------------|--------------|
| **Kunal Rawat** | Initial skill, DOCX builder, scorer, interview prompts, always-on interview UX |
| _Your name here_ | Open a PR — field templates, extensions, translations welcome |

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CONTRIBUTORS.md](CONTRIBUTORS.md).

## License

MIT — see [LICENSE](LICENSE).

---

Built for Claude Code by [@kunalrawat425](https://github.com/kunalrawat425)

## Author

Kunal Rawat — Senior Software Engineer focused on AI workflow tooling.

- [LinkedIn](https://linkedin.com/in/kunalrawat425)
- [GitHub](https://github.com/kunalrawat425)
