# Changelog

All notable changes to `claude-resume` will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
