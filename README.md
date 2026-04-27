<!-- Updated: 2026-04-28 -->

![Claude Resume](screenshots/cover-image.png)

# Claude Resume - ATS Resume Optimization Skill for Claude Code

Comprehensive ATS resume builder and optimizer for Claude Code. 3 core sub-skills covering interview-driven resume building, ATS score estimation, and JD keyword tuning. Works for any field — engineering, product, marketing, design, sales, finance, data, healthcare, legal, operations, HR, education, nonprofit, government. Synthesizes 2026 best practices from Jobscan, Resume Worded, Enhancv, Harvard OCS, Indeed, LinkedIn Talent Blog, Workday, and Greenhouse parsing docs.

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
# Add marketplace (one-time)
/plugin marketplace add kunalrawat425/claude-resume

# Install plugin
/plugin install resume@claude-resume
```

### Manual Install (Unix/macOS/Linux)

```bash
git clone --depth 1 https://github.com/kunalrawat425/claude-resume.git
bash claude-resume/install.sh
```

<details>
<summary>One-liner (curl)</summary>

```bash
curl -fsSL https://raw.githubusercontent.com/kunalrawat425/claude-resume/main/install.sh | bash
```

Prefer to review the script before running?

```bash
curl -fsSL https://raw.githubusercontent.com/kunalrawat425/claude-resume/main/install.sh > install.sh
cat install.sh        # review
bash install.sh       # run when satisfied
rm install.sh
```

</details>

### Windows (PowerShell)

```powershell
git clone --depth 1 https://github.com/kunalrawat425/claude-resume.git
powershell -ExecutionPolicy Bypass -File claude-resume\install.ps1
```

> **Why git clone instead of `irm | iex`?** Claude Code's own security guardrails flag `irm ... | iex` as a supply chain risk (downloading and executing remote code with no verification). The git clone approach lets you inspect the script at `claude-resume\install.ps1` before running it.

## Quick Start

```bash
# Start Claude Code
claude

# Build a new resume — skill always interviews you first
/resume

# Score an existing resume (still asks clarifying questions)
/resume score path/to/resume.docx

# Rewrite an existing resume to fix every ATS flag
/resume path/to/resume.docx

# Tailor a resume to a specific job description
/resume tune path/to/resume.docx path/to/jd.txt

# Diagnose ATS issues without rewriting
/resume diagnose path/to/resume.docx
```

> **Always-on interview.** Every invocation begins with a structured set of questions via `mcp__conductor__AskUserQuestion` — one question at a time, numbered options, free-text "Other" available on every prompt. The skill never drafts, scores, or tunes until the required-block answers are collected. See [Interview Prompts](skills/resume/references/interview-prompts.md).

### Demo:

![Resume Build Demo](screenshots/resume-build-demo.gif)

**`/resume`: interview-first build flow:**

![Resume Interview Demo](screenshots/resume-interview-demo.gif)

## Commands

| Command | Description |
|---------|-------------|
| `/resume` | Interview-driven builder. Always asks the required-block questions before drafting. |
| `/resume <file>` | Parse existing resume, run interview to fill gaps, diagnose, then rewrite. |
| `/resume score <file>` | Heuristic ATS score with per-category breakdown across 7 dimensions. |
| `/resume diagnose <file>` | Lists every ATS issue mapped to specific lines, no rewriting. |
| `/resume tune <file> <jd>` | Tailors a resume to a JD; targets 75–80% Jobscan match. |
| `/resume rewrite <file>` | Alias for `/resume <file>` — rewrite an existing resume. |

### `/resume`
**Interview-Driven Resume Builder**

Walks the user through a structured interview before writing a single line. Always asks the questions in `references/interview-prompts.md` — one at a time, numbered options where applicable, free-text "Other" on every prompt.

**Capabilities:**
- 9 required questions (target role, industry, YoE, current title, JD, achievements, skills, prior ATS results, page count)
- 9 context/tuning questions (work preference, authorization, gaps, education, certifications, leadership, tone, exclusions, links)
- Per-role loop — title, employer, dates, shipped, improved, led, business outcome
- Field detection picks the right skills-section structure
- Career-stage detection picks length and ordering
- Refuses to fabricate metrics — asks for the number instead

### `/resume score [file]`
**Heuristic ATS Score Estimator**

Runs `scripts/score_resume.py` over a DOCX or text file and returns per-category scores.

**Capabilities:**
- Parsability (column / whitespace bleed)
- Section heading match against canonical list
- Quantification ratio (% of bullets with a number)
- Verb variety (flags any verb 3+ times)
- Active voice (regex passive detection)
- Vague filler (exact-match buzzword list)
- Length appropriate to detected stage
- Weighted overall 0–100

### `/resume tune [file] [jd]`
**JD Keyword Tuner**

Mirrors the JD's hard-skill keywords and bridging title vocabulary into the resume.

**Capabilities:**
- Hard-skill keyword extraction from JD
- Skills-section gap fill (only for skills the user actually has)
- Bullet rewrite in most-recent role to mirror JD phrasing
- Bridging title line when user's title differs from target
- Projected Jobscan match score before/after
- Refuses to claim skills the user doesn't have

### `/resume diagnose [file]`
**Issue Diagnostic, No Rewrite**

Lists every ATS issue mapped to specific lines, ranked Critical → High → Medium → Low. Useful when the user wants to fix things by hand.

## Features

### ATS Scoring (Current Methodology)
- **Quantification ratio** — target ≥60% of bullets carry a number, 90%+ ideal
- **Verb variety** — no verb used 3+ times (modern ATS flag this)
- **Active voice** — 0 passive constructions
- **Heading match** — 4 canonical: Summary, Skills, Experience, Education

> Note: Modern AI-layered ATS in 2026 (Jobscan AI, Eightfold) cross-check skill claims against bullet evidence. Keyword stuffing without supporting bullets gets penalized.

### Interview-First Workflow
Every command — even `/resume score` and `/resume tune` — opens with a structured interview:
- **Required block** asked first (target role, industry, YoE, JD, achievements, skills, page count)
- **Context block** asked after (work preference, authorization, gaps, leadership scope, tone)
- **Per-role loop** for every job to be listed
- One question per `AskUserQuestion` tool call — never batched

### Career-Stage Aware
- **Entry (0–2 yrs)** — 1 page, education first
- **Mid (3–9 yrs)** — 1 page preferred, 2 if dense
- **Senior / Staff / Principal (10+ yrs)** — 2 pages, leadership signals
- **Executive (Director+)** — 2–3 pages, P&L / org scale signals

### Universal Field Support
| Field | Skills-section structure |
|-------|--------------------------|
| Software Engineering | Languages, Backend, Frontend, Data, Cloud & DevOps, Architecture |
| Product Management | Methodologies, Tools, Domains, Analytics, Leadership |
| Marketing | Channels, Tools, Analytics, Content, Strategy |
| Design (UX/UI/Product) | Tools, Methods, Disciplines, Research, Leadership |
| Sales | Methodologies, Tools, Industries, Skills, Languages |
| Finance / Analytics | Tools, Modeling, Reporting, Compliance, Domain |
| Data / ML | Languages, ML/DL, Data Platforms, Cloud, Tools |
| Healthcare | Clinical Skills, EMR Systems, Certifications, Specialties |
| Legal | Practice Areas, Software, Languages, Bar Admissions |
| Operations / HR | Frameworks, Software, Domains, Compliance, Languages |

### DOCX Builder
- Single-column ATS-safe output (no tables / images / text boxes)
- Arial body font, true bullet numbering, plain-text contact line
- Contact info in body, not header / footer (parses correctly in Workday / Greenhouse)
- Auto page-count enforcement (margins → font → trim oldest roles, never cuts metrics)

### Quality Gates
Before producing the DOCX:
- Quantification ≥60% of bullets
- 0 passive voice constructions
- No verb used >2x across the resume
- Exactly 4 canonical section headings
- Page count matches user's target
- No fabricated metrics — every number traces to user input
- Banned filler ("hard worker", "passionate", "results-driven") absent

## Architecture

```
~/.claude/plugins/claude-resume/
├── skills/
│   ├── resume/             # Primary orchestrator skill
│   ├── resume-score/       # Heuristic ATS scorer
│   └── resume-jd-tune/     # JD keyword tuner
├── scripts/
│   ├── build_ats_resume.js # DOCX builder (docx-js)
│   └── score_resume.py     # Pure-Python heuristic scorer
├── references/             # Best-practices, interview prompts, rubric
└── docs/                   # Installation, commands, architecture
```

The primary skill orchestrates a 5-phase workflow: **interview → diagnose → rewrite → build → score**. Phases are not skipped. References sit beside `SKILL.md` so the model loads only what it needs:

- `references/resume-best-practices.md` — full 2026 do's/don'ts across 10 sections
- `references/interview-prompts.md` — exact questions the skill asks, with `AskUserQuestion` JSON
- `references/scoring-rubric.md` — per-category weighting for the score estimator

### Recently Added
- v1.0 — Always-on interview phase across every command
- v1.0 — `mcp__conductor__AskUserQuestion` integration for one-question-at-a-time UX
- v1.0 — Universal field support (was engineering-only)
- v1.0 — JD keyword tuning sub-skill
- v1.0 — Heuristic Python score estimator

## Requirements

- Claude Code 1.0.33+ (for plugin install) or any Claude environment that supports skills
- Node.js 18+ and `docx` package (`npm install -g docx`) — for the DOCX builder
- Python 3.9+ — for the score estimator
- Optional: LibreOffice (`soffice`) and `pdftoppm` for PDF preview generation

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

<details>
<summary>One-liner (curl)</summary>

```bash
curl -fsSL https://raw.githubusercontent.com/kunalrawat425/claude-resume/main/uninstall.sh | bash
```

</details>

## Extensions

Optional add-ons that integrate external data sources via MCP servers.

### LinkedIn Profile Sync

Pull resume content directly from a LinkedIn profile to skip the interview phase. Requires the LinkedIn MCP connector.

```bash
# Install (requires LinkedIn MCP)
./extensions/linkedin/install.sh
```

```bash
# Example commands
/resume linkedin sync linkedin.com/in/your-handle
/resume linkedin diff linkedin.com/in/your-handle resume.docx
```

See [LinkedIn Extension](extensions/linkedin/README.md) for full documentation.

### Jobscan API

Submit the produced DOCX to Jobscan's real ATS scanner and pull the actual match score back into Claude. Requires a Jobscan API key.

```bash
# Install (requires Jobscan API key)
./extensions/jobscan/install.sh
```

```bash
# Example commands
/resume jobscan score resume.docx jd.txt
/resume jobscan compare v1.docx v2.docx jd.txt
```

See [Jobscan Extension](extensions/jobscan/README.md) for full documentation.

### JD Crawler

Fetch job descriptions from URLs (LinkedIn Jobs, Indeed, Greenhouse, Lever, Workday) and feed them into `/resume tune` automatically.

```bash
# Install extension
./extensions/jd-crawler/install.sh
```

```bash
# Example commands
/resume tune resume.docx https://jobs.example.com/listing/123
```

See [JD Crawler Extension](extensions/jd-crawler/README.md) for full documentation.

## Ecosystem

Claude Resume is part of a family of Claude Code skills that work together:

| Skill | What it does | How it connects |
|-------|--------------|-----------------|
| [Claude Resume](https://github.com/kunalrawat425/claude-resume) | ATS resume builder, scorer, JD tuner | Core — generates the DOCX you submit to portals |
| [Claude Cover Letter](https://github.com/kunalrawat425/claude-cover-letter) | Tailored cover letters from resume + JD | Companion — reuses resume metrics and target-role positioning |
| [Claude Job Search](https://github.com/kunalrawat425/claude-job-search) | LinkedIn / Indeed / Greenhouse JD discovery | Feeds JDs into `/resume tune` |
| [Claude Interview Prep](https://github.com/kunalrawat425/claude-interview-prep) | Mock interview drills from resume bullets | Pulls bullet metrics for behavioral questions |

**Workflow example:**

1. `/job-search find "Senior Backend Engineer remote"` — get matching JDs
2. `/resume tune my-resume.docx jd-1.txt` — tailor for the top match
3. `/cover-letter draft my-resume.docx jd-1.txt` — generate matching cover letter
4. `/interview-prep behavioral my-resume.docx` — drill behavioral questions
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
|-------------|--------------|
| **Kunal Rawat** | Initial skill, DOCX builder, score estimator, interview prompts, always-on interview UX |
| _Your name here_ | Open a PR to add a field-specific skills template, an extension, or a translation |

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for contribution guidelines.

## License

MIT License — see [LICENSE](LICENSE) for details.

## Contributing

Contributions welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting PRs.

---

Built for Claude Code by [@kunalrawat425](https://github.com/kunalrawat425)

---

## Author

Built by Kunal Rawat — Senior Software Engineer focused on AI workflow tooling.

- [LinkedIn](https://linkedin.com/in/kunalrawat425)
- [GitHub](https://github.com/kunalrawat425)
