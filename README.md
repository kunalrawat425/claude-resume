[![Claude Resume](screenshots/cover-image.png)](screenshots/cover-image.png)

# Claude Resume - ATS Resume Optimization Skill for Claude Code

Comprehensive ATS resume builder and optimizer for Claude Code. Interview-driven resume rewriting, scoring, and JD tailoring across any field — engineering, product, marketing, design, sales, finance, healthcare, legal, operations, HR, education, nonprofit, government. Synthesizes 2026 best practices from Jobscan, Resume Worded, Enhancv, Harvard OCS, Indeed, LinkedIn Talent Blog, Workday, and Greenhouse parsing docs.

![Resume Command Demo](screenshots/resume-command-demo.gif)

[![CI](https://github.com/kunalrawat425/claude-resume/actions/workflows/ci.yml/badge.svg)](https://github.com/kunalrawat425/claude-resume/actions/workflows/ci.yml)
[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-blue)](https://claude.ai/claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/github/v/release/kunalrawat425/claude-resume)](https://github.com/kunalrawat425/claude-resume/releases)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
- [Features](#features)
- [Architecture](#architecture)
- [Extensions](#extensions)
- [Ecosystem](#ecosystem)
- [Documentation](#documentation)
- [Requirements](#requirements)
- [Uninstall](#uninstall)
- [Contributing](#contributing)

## Installation

### Plugin Install (Claude Code 1.0.33+)

```bash
/plugin marketplace add kunalrawat425/claude-resume
/plugin install resume@claude-resume
```

### Manual Install (Unix/macOS/Linux)

```bash
git clone https://github.com/kunalrawat425/claude-resume.git
cd claude-resume
bash install.sh
```

<details>
<summary>One-liner (curl)</summary>

```bash
# Pipe-to-bash (fast, less safe)
curl -fsSL https://raw.githubusercontent.com/kunalrawat425/claude-resume/main/install.sh | bash

# Review-first (recommended)
curl -fsSL https://raw.githubusercontent.com/kunalrawat425/claude-resume/main/install.sh -o install.sh
less install.sh
bash install.sh
```

</details>

### Windows (PowerShell)

```powershell
git clone https://github.com/kunalrawat425/claude-resume.git
cd claude-resume
powershell -ExecutionPolicy Bypass -File install.ps1
```

> **Why git clone instead of `irm | iex`?** Piping a remote script directly into your shell runs unreviewed code. `git clone` lets you inspect `install.ps1` before executing it. The script only writes to your Claude Code skills directory and `npm install -g docx`.

## Quick Start

```bash
# Score an existing resume
/resume score path/to/resume.docx

# Rewrite an existing resume to fix all ATS flags
/resume rewrite path/to/resume.docx

# Build a new resume from scratch (skill will interview you)
/resume build

# Tailor a resume to a specific job description
/resume tune path/to/resume.docx path/to/jd.txt

# Diagnose ATS issues without rewriting
/resume diagnose path/to/resume.docx
```

### Demo:

![Resume Build Demo](screenshots/resume-build-demo.gif)

## Commands

| Command | Description |
|---|---|
| `/resume build` | Interview-driven resume builder — asks target role, JD, metrics per role, then produces ATS-safe DOCX. |
| `/resume rewrite <file>` | Rewrites an existing resume fixing every ATS flag (vague bullets, passive voice, verb repetition, non-standard headings, missing metrics). |
| `/resume score <file>` | Heuristic ATS score with per-category breakdown (parsability, headings, quantification, verb variety, voice, length). |
| `/resume diagnose <file>` | Lists every ATS issue mapped to specific lines, no rewriting. |
| `/resume tune <file> <jd>` | Tailors a resume to a specific job description; targets 75–80% Jobscan match. |

### `/resume build`

Walks the user through the interview defined in `references/interview-prompts.md` — target role, seniority, industry, JD, prior ATS flags, then per-role facts (title, employer, dates, team, what shipped, what improved, metrics). Produces a single ATS-safe DOCX. Never invents metrics; asks the user for any number it doesn't have.

### `/resume rewrite [file]`

Reads an existing resume (PDF, DOCX, text), extracts every fact, then rewrites bullets to: quantify every line, replace passive voice, vary action verbs (no verb >2x), standardize headings and titles, and tighten to 1–2 pages. Preserves all original metrics; ask the user before changing dates or employers.

### `/resume tune [file] [jd]`

Runs a keyword-tuning pass: extracts hard-skill keywords from the JD, ensures they appear in Skills + most-recent-role bullets, adds bridging job titles where the user's title differs materially from the target. Reports the projected Jobscan match score before and after.

## Features

### Interview-First Workflow

Resumes fail because the inputs are underspecified. The skill runs a structured interview (target role, JD, prior flags, per-role metrics) before drafting a single line. Cuts iteration cycles from 5+ to 1–2.

### 2026 Best Practices Reference

Synthesizes current authoritative guidance from Jobscan, Resume Worded, Enhancv, Harvard OCS, Indeed, LinkedIn Talent Blog, and Workday/Greenhouse parsing docs. 10 categories covering ATS truths, format, content, keyword tuning, career stage, what AI-layered ATS actually score in 2026, and a verb bank.

### Universal — Any Field

Engineering, product, marketing, design, sales, finance, data, healthcare, legal, operations, HR, education, nonprofit, government. The skill detects field from target role and applies the right skill-section structure (`Languages` / `Backend` for engineers, `Channels` / `Tools` for marketers, `Methodologies` / `Domains` for PMs, etc.).

### Refuses to Fabricate Metrics

If the raw content has no number for a bullet, the skill asks the user. Never invents — fabricated metrics are a fireable offense in many industries.

### Action-Verb Tally Enforcer

Modern ATS flag any verb used 3+ times. The skill keeps a running count while writing and replaces a verb the moment it would hit 3.

### Career-Stage Aware

Entry-level (1 page, education first), mid-level (1–2 pages, experience first), senior/staff/principal (2 pages, leadership signals), executive (2–3 pages, P&L / org scale signals). Picks the right ruleset from the user's stated experience.

### Heuristic Score Estimator

`/resume score` runs a Python pass over the DOCX and returns per-category scores (parsability, headings, quantification, verb variety, active voice, vague filler, length) with an overall weighted estimate. Mirrors how Jobscan / Resume Worded / Enhancv weight things. Useful before running through a real scanner.

### JD Keyword Tuning

`/resume tune` extracts hard-skill keywords and exact phrases from the JD, ensures they appear in the Skills section and most-recent-role bullets, and adds a bridging title line when needed. Targets Jobscan's 75–80% benchmark.

## Architecture

The skill is a Claude Code plugin containing one primary skill (`skills/resume/`) plus two helper sub-skills (`skills/resume-score/`, `skills/resume-jd-tune/`). The primary skill orchestrates the workflow; sub-skills are invoked when the user runs `/resume score` or `/resume tune` directly.

The DOCX builder is in `scripts/build_ats_resume.js` — a `docx-js` template that produces ATS-safe single-column output (Arial font, true bullet numbering, plain-text contact line, no images / tables / text boxes). The score estimator is in `scripts/score_resume.py` — pure-Python regex / heuristic checks across 7 categories.

References sit beside the SKILL.md so the model loads only what it needs:
- `references/resume-best-practices.md` — full 2026 do's/don'ts
- `references/interview-prompts.md` — questions the skill asks the user
- `references/scoring-rubric.md` — per-category weighting

### Recently Added

- v1.0 — Universal field support (was engineering-only)
- v1.0 — JD keyword tuning sub-skill
- v1.0 — Heuristic score estimator (Python)

## Requirements

- Claude Code 1.0.33+ (for plugin install) or any Claude environment that supports skills.
- Node.js 18+ and `docx` package (`npm install -g docx`) — for the DOCX builder.
- Python 3.9+ — for the score estimator.
- Optional: LibreOffice (`soffice`) and `pdftoppm` for PDF preview generation.

## Uninstall

```bash
# Plugin install
/plugin uninstall resume@claude-resume
/plugin marketplace remove kunalrawat425/claude-resume

# Manual install (Unix/macOS/Linux)
bash uninstall.sh

# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File uninstall.ps1
```

## Extensions

Optional add-ons that extend the skill with external data sources via MCP servers.

### LinkedIn Profile Sync

Pull resume content directly from a LinkedIn profile to skip the interview phase. Requires the LinkedIn MCP connector. See [LinkedIn Extension](extensions/linkedin/README.md) for full documentation.

### Jobscan API

Submit the produced DOCX to Jobscan's real ATS scanner and pull the actual score back into Claude. Requires a Jobscan API key. See [Jobscan Extension](extensions/jobscan/README.md) for full documentation.

### JD Crawler

Fetch a job description from a URL (LinkedIn Jobs, Indeed, Greenhouse, Lever, Workday) and feed it into `/resume tune` automatically. See [JD Crawler Extension](extensions/jd-crawler/README.md) for full documentation.

## Ecosystem

| Skill | What it does | How it connects |
|---|---|---|
| [Claude Resume](https://github.com/kunalrawat425/claude-resume) | ATS resume builder and scorer | Generates the DOCX you submit to portals |
| [Claude Cover Letter](https://github.com/kunalrawat425/claude-cover-letter) | Tailored cover letters from your resume + JD | Reuses the resume's metrics and target-role positioning |
| [Claude Job Search](https://github.com/kunalrawat425/claude-job-search) | Searches LinkedIn / Indeed / Greenhouse for matching JDs | Feeds JDs into `/resume tune` |
| [Claude Interview Prep](https://github.com/kunalrawat425/claude-interview-prep) | Mock interview drills derived from your resume bullets | Pulls bullet metrics for behavioral question prep |

**Workflow example:**

1. `/job-search find "Senior Backend Engineer remote"` — get matching JDs
2. `/resume tune my-resume.docx jd-1.txt` — tailor for the top match
3. `/cover-letter draft my-resume.docx jd-1.txt` — generate matching cover letter
4. `/interview-prep behavioral my-resume.docx` — drill behavioral questions from your bullets
5. Submit DOCX + cover letter via the portal

## Documentation

- [Installation Guide](docs/INSTALLATION.md)
- [Commands Reference](docs/COMMANDS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Resume Best Practices (2026)](skills/resume/references/resume-best-practices.md)
- [Interview Prompts](skills/resume/references/interview-prompts.md)
- [Scoring Rubric](skills/resume/references/scoring-rubric.md)

## Community Contributors

Built initially for personal use, opened up because the rewrite rules generalize across fields.

| Contributor | Contribution |
|---|---|
| **Kunal Rawat** | Initial skill, DOCX builder, score estimator, interview prompts |
| _Your name here_ | Open a PR to add a field-specific skills template, an extension, or a translation |

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for contribution guidelines.

## License

MIT License — see [LICENSE](LICENSE) for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to file issues, propose changes, or add an extension.

---

Built for Claude Code by [@kunalrawat425](https://github.com/kunalrawat425)

---

## Author

Built by Kunal Rawat — Senior Software Engineer focused on AI workflow tooling.

- [LinkedIn](https://linkedin.com/in/kunalrawat425)
- [GitHub](https://github.com/kunalrawat425)
