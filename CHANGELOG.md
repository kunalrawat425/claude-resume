# Changelog

All notable changes to `fix-my-resume` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-06

### Changed
- Renamed repo from `claude-resume` to `fix-my-resume`
- README fully rewritten: before/after ATS score demo, limitations section, use-cases table, what-it-cannot-do table, detailed features, ecosystem workflow
- `marketplace.json` updated with new name, homepage, and keywords

### Fixed
- `AskUserQuestion` ≤4 options cap — interview prompts chunked into branching pairs (was silently failing with "too_big" validation error)
- `build_ats_resume.js` MODULE_NOT_FOUND when `docx` installed via `npm install -g` — added `loadDocx()` that resolves `npm root -g` and pushes global modules path
- Interview is now mandatory on every command (`/resume`, `/resume <file>`, `/resume score`, `/resume tune`, `/resume diagnose`) — not just no-args invocation

### Added
- Always-on interview enforced in all three SKILL.md files (primary + sub-skills)
- E2E test: bad sample 73.5 → rewritten 94.5 (+21 ATS points)

## [1.0.0] - 2026-04-18

### Added
- Initial release.
- Primary `resume` skill with 5-phase workflow (interview → diagnose → rewrite → build → score).
- `resume-score` sub-skill — heuristic ATS scorer.
- `resume-jd-tune` sub-skill — JD keyword tuner.
- DOCX builder (`scripts/build_ats_resume.js`) producing single-column ATS-safe output.
- Python score estimator (`scripts/score_resume.py`) across 7 categories.
- 2026 best-practices reference synthesized from Jobscan, Resume Worded, Enhancv, Harvard OCS, Indeed, LinkedIn Talent, Workday, and Greenhouse.
- Interview prompts for any field (engineering, PM, marketing, design, sales, finance, data, healthcare, legal, ops, HR, education).
- Field detection and career-stage detection (entry / mid / senior / executive).
- Install scripts for macOS, Linux, and Windows.
- Plugin marketplace manifest.
