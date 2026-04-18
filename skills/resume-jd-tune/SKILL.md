---
name: resume-jd-tune
description: "Tailor an existing resume to a specific job description. Extracts hard-skill keywords from the JD, ensures they appear in the Skills section and most-recent-role bullets, adds a bridging title line if the user's title differs materially from the target. Reports projected Jobscan match score before and after. Triggers on: tailor my resume, tune for JD, match this job description, /resume tune, optimize for this role."
user-invokable: true
argument-hint: "<resume> <jd-file-or-url>"
license: MIT
metadata:
  author: Kunal Rawat
  version: 1.0.0
  category: career
  parent-skill: resume
---

# Resume JD Tune: Job-Description Keyword Tuner

**Invocation:** `/resume tune <resume-file> <jd-file-or-url>`

**Scripts:** Inline (no script needed; runs in the orchestrator).

Tailors an existing ATS-safe resume to a specific job description by mirroring the JD's hard-skill keywords and bridging title vocabulary. Targets Jobscan's 75–80% match benchmark.

## Quick Reference

| Step | What it does |
|---|---|
| 1 | Parse the JD — extract hard skills, required tools, exact title, key phrases. |
| 2 | Diff against the resume's Skills section + most-recent-role bullets. |
| 3 | Insert missing JD keywords into Skills (only if user has the skill). |
| 4 | Rewrite 1–2 bullets in the most-recent role to use JD's exact phrasing. |
| 5 | Add bridging title line under the name if the user's title differs from the JD title. |
| 6 | Report projected match score before/after. |

## Rules

- **Never claim a skill the user doesn't have.** If the JD lists "Kafka" and the user has never touched it, do NOT add it. Flag the gap to the user.
- **Mirror exact phrasing where possible.** If the JD says "Kubernetes," include both "Kubernetes" and "K8s" in Skills (one parses each variant).
- **Acronym + expansion once.** "SEO (Search Engine Optimization)" the first time only.
- **Bridging title is optional.** Only add if the user's title is materially different from the JD's. "Senior Software Engineer" → "Senior Software Engineer | Backend Platform Engineer" is fine.
- **Don't keyword-stuff.** AI-layered ATS in 2026 (Jobscan AI, Eightfold) cross-check claims against bullet evidence and penalize unsupported skills.

## Output

A modified DOCX named `<original-name>_tuned_for_<jd-slug>.docx`, plus a side-by-side report:

```
JD: Senior Backend Engineer @ AcmeCo

Match score:    72%  →  87%
Hard skills:    14/19 → 19/19  (added: gRPC, Postgres, Kubernetes)
Title bridge:   added "| Backend Platform Engineer"
Bullets edited: 2 (Aerem, Sky2c)
Skill gaps:     [none — user had all JD skills]
```

If there are skill gaps, the report calls them out so the user can decide whether to add evidence in a different format (project, certification, side work).

## Sources

Match-score benchmarks from Jobscan, Resume Worded, and Enhancv (2026). Methodology: keyword overlap weighted by section (Skills 1.0x, recent-role bullets 0.6x, summary 0.4x, older bullets 0.2x).
