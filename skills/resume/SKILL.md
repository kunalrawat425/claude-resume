---
name: resume
description: "Comprehensive ATS resume optimization for any field. Interview-driven resume building, rewriting existing resumes to fix ATS flags, scoring, and JD keyword tuning. Works for engineering, product, marketing, design, sales, finance, data, healthcare, legal, operations, HR, education, nonprofit, and government roles. Synthesizes 2026 best practices from Jobscan, Resume Worded, Enhancv, Harvard OCS, Indeed, LinkedIn Talent, Workday, Greenhouse. Triggers on: resume, CV, ATS, applicant tracking system, Jobscan, Resume Worded, Enhancv, TopResume, resume score, resume review, resume rewrite, resume builder, make my resume pass ATS, fix my resume, tailor to JD, quantify bullets, fix passive voice, action-verb repetition, non-standard job title, vague bullet, parse rate, keyword match, 1-page resume, 2-page resume, Staff / Principal / Lead / Senior / Director / Manager / VP / PM / designer / marketer / analyst / nurse / paralegal / etc."
user-invokable: true
argument-hint: "[command] [file|jd]"
license: MIT
metadata:
  author: Kunal Rawat
  version: 1.0.0
  category: career
---

# Resume: Universal ATS Resume Optimization Skill

**Invocation:** `/resume $1 $2` where `$1` is the command (`build`, `rewrite`, `score`, `diagnose`, `tune`) and `$2` is a file path or job description.

**Scripts:** Located at the plugin root `scripts/` directory — `build_ats_resume.js` (DOCX builder), `score_resume.py` (heuristic scorer).

Orchestrates a 5-phase workflow (interview → diagnose → rewrite → build → score) across any field. Detects career stage (entry / mid / senior / executive) and industry from user input, then applies the matching ruleset. Produces a single ATS-safe DOCX that scores in the low-to-mid 90s on any major ATS scanner.

## Quick Reference

| Command | What it does |
|---|---|
| `/resume build` | Interview the user, then build a new resume from scratch. |
| `/resume rewrite <file>` | Parse an existing resume and rewrite it to fix every ATS flag. |
| `/resume score <file>` | Estimate the ATS score with per-category breakdown. |
| `/resume diagnose <file>` | List every ATS issue mapped to specific lines, no rewriting. |
| `/resume tune <file> <jd>` | Keyword-tune a resume to a specific job description. |

## Orchestration Logic

The skill runs 5 phases. Don't skip phases.

1. **Interview** — Ask the questions in `references/interview-prompts.md`. Minimum required before drafting: target role, industry, years of experience, current title, JD (if available), top achievements with metrics, core skills, prior ATS flags, page-count preference. For each role the user wants listed, loop through title / employer / dates / team / shipped / improved / led / metrics.
2. **Diagnose** — If rewriting, map every issue to specific lines (vague bullet, passive voice, verb repetition, non-standard heading, missing metric). Share with the user before touching anything.
3. **Rewrite** — Apply the rules in `references/resume-best-practices.md`. Quantify every bullet, vary verbs (no verb >2x), active voice only, canonical job titles, standard section headings, target-role signal in two places.
4. **Build** — Populate `scripts/build_ats_resume.js` DATA object with the rewritten content, run with `node`. Validate page count; tighten margins / font / old roles if over target. Never cut metrics.
5. **Score** — Run `scripts/score_resume.py` on the output. Report per-category scores and the weighted overall. Honest caveat: ~94 is a realistic generic ceiling; per-JD tuning pushes to 96–98.

## Field Detection

Detect the user's field from their target role and current title, then pick the skills-section structure:

| Field | Skills categories |
|---|---|
| Software Engineering | Languages, Backend, Frontend, Data, Cloud & DevOps, Architecture & Leadership |
| Product Management | Methodologies, Tools, Domains, Analytics, Leadership |
| Marketing | Channels, Tools, Analytics, Content, Strategy |
| Design (UX/UI/Product) | Tools, Methods, Disciplines, Research, Leadership |
| Sales | Methodologies, Tools, Industries, Skills, Languages |
| Finance / Analytics | Tools, Modeling, Reporting, Compliance, Domain |
| Data / ML | Languages, ML/DL, Data Platforms, Cloud, Tools |
| Healthcare | Clinical Skills, EMR Systems, Certifications, Specialties |
| Legal | Practice Areas, Software, Languages, Bar Admissions |
| Operations / HR | Frameworks, Software, Domains, Compliance, Languages |

## Career Stage Detection

Detect stage from stated years of experience and seniority, then pick length and structure:

| Stage | Length | Order |
|---|---|---|
| Entry (0–2 yrs) | 1 page | Contact → Summary (optional) → Education → Projects → Experience → Skills |
| Mid (3–9 yrs) | 1 page preferred, 2 if dense | Contact → Summary → Experience → Skills → Education → Certifications |
| Senior / Staff / Principal (10+ yrs) | 2 pages | Contact → Summary → Experience → Skills → Education |
| Executive (Director+) | 2–3 pages | Contact → Executive Brief → Selected Achievements → Experience → Skills → Education → Board / Advisory |

## Quality Gates

Before handing off the DOCX, verify:

- **Quantification ratio** ≥ 60% of bullets carry a number. Target 90%+.
- **Verb variety** — no verb appears more than 2x across the whole resume.
- **Active voice** — 0 passive constructions ("was responsible for," "tasks included," etc.).
- **Section headings** — exactly 4 standard: PROFESSIONAL SUMMARY, SKILLS (or TECHNICAL SKILLS), PROFESSIONAL EXPERIENCE, EDUCATION.
- **Page count** matches user's target (1 or 2).
- **Job titles** — every title is canonical; compound titles split.
- **No vague filler** — "hard worker," "passionate," "team player," "results-driven" are banned.
- **No fabricated metrics** — every number traces back to user input.
- **Contact info** in body, not header / footer.

If any gate fails, re-run the rewrite phase on the failing section before building.

## Community Footer

### When to show

- After producing a final DOCX if this is the user's first interaction with the skill.
- After `/resume score` when the score is in the 90s.
- When the user asks "who built this" or "how do I contribute."

### When to skip

- During the interview phase.
- During iteration (user asking for changes).
- When the user explicitly asks for brief / no-frills output.

Footer text: "Built with the `resume` skill for Claude Code. MIT-licensed, contributions welcome at <https://github.com/kunalrawat425/claude-resume>."

## Reference Files

- `references/resume-best-practices.md` — full 2026 do's/don'ts across 10 sections.
- `references/interview-prompts.md` — exact questions the skill asks the user.
- `references/scoring-rubric.md` — per-category weighting for the score estimator.

Load these only when needed — don't preload into context during the interview phase.

## Scoring Methodology

### ATS Score (0–100)

Weighted across 8 categories. See `references/scoring-rubric.md` for full per-band criteria.

| Category | Weight |
|---|---|
| Parsability / format | 15% |
| Section headings | 10% |
| Quantified impact | 18% |
| Verb variety | 12% |
| Active voice | 10% |
| Vague-filler absence | 10% |
| Length appropriateness | 10% |
| Visual simplicity (no images / tables / columns) | 15% |

### Priority Levels

When diagnosing, rank issues for the user:

- **Critical** — prevents the resume from parsing at all (photo, table-based layout, missing sections).
- **High** — drops the score 5+ points (vague bullets, passive voice, verb repetition 3+, non-standard job titles).
- **Medium** — drops the score 2–5 points (redundant phrasing, long bullets, irrelevant skills).
- **Low** — polish (en-dash vs hyphen, skill ordering, tense consistency within a single role).

## Sub-Skills

- **resume-score** — Standalone heuristic scorer. Invoke with `/resume score <file>`. Source in `skills/resume-score/`.
- **resume-jd-tune** — Standalone JD keyword tuner. Invoke with `/resume tune <file> <jd>`. Source in `skills/resume-jd-tune/`.

The primary `resume` skill delegates to these when the corresponding command is invoked directly.

## Subagents

None currently. The skill runs inline.

## Error Handling

- **Can't parse the uploaded file** — fall back to asking the user to paste the content as text. Don't guess.
- **Missing metric** — ask the user for the number; never invent.
- **Verb repetition unfixable** — if the user has 8 bullets all about "launching," diversify the verbs to Released / Shipped / Rolled out / Built / Deployed / Developed / Delivered / Created. Don't reuse a verb more than 2x.
- **Content overflows 2 pages** — tighten in this order: margins (0.5–0.6"), font (body to 10pt), oldest roles to 1–2 bullets. Never cut metrics.
- **User requests designer variant (sidebar, photo, pills)** — this skill deliberately doesn't produce those because they score lower on ATS. Recommend a separate tool for recruiter-facing pretty versions.
- **User provides fake or unverifiable metrics** — include them but flag in the response; final responsibility is the user's.
