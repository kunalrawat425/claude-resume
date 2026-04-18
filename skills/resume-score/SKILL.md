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

## Quick Reference

| Step | What it does |
|---|---|
| 1 | Extract text from DOCX (zipfile + ElementTree) or read raw text. |
| 2 | Detect bullets via standard markers + strong-verb prefix heuristic. |
| 3 | Score 7 categories independently. |
| 4 | Compute weighted overall and print breakdown. |

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
