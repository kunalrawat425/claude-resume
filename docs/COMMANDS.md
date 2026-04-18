# Commands Reference

## `/resume build`

Interview-driven resume builder. Asks the user the questions in `skills/resume/references/interview-prompts.md` — target role, seniority, industry, JD, prior ATS flags, then per-role facts — then produces a single ATS-safe DOCX. Never invents metrics.

```bash
/resume build
```

No arguments. The skill runs the interview inline.

## `/resume rewrite <file>`

Reads an existing resume (PDF, DOCX, text), extracts every fact, then rewrites bullets to fix every ATS flag: quantify, active voice, canonical titles, varied verbs, standard headings, tighten to 1–2 pages. Preserves original metrics.

```bash
/resume rewrite ~/Downloads/my_resume.pdf
```

Output: `FirstName_LastName_resume.docx` in the current directory.

## `/resume score <file>`

Heuristic ATS score. Returns per-category scores and a weighted overall (0–100).

```bash
/resume score ~/Documents/my_resume.docx
```

Categories: parsability, headings, quantification, verb variety, active voice, vague filler, length, visual simplicity.

## `/resume diagnose <file>`

Lists every ATS issue mapped to specific lines, no rewriting. Useful before deciding whether to rewrite in place or start from scratch.

```bash
/resume diagnose ~/Documents/my_resume.docx
```

## `/resume tune <file> <jd>`

Tailors an existing resume to a specific job description. Extracts hard-skill keywords and exact phrases from the JD, ensures they appear in Skills + most-recent-role bullets, adds a bridging title line if needed.

```bash
/resume tune ~/Documents/my_resume.docx ~/Downloads/jd.txt
/resume tune ~/Documents/my_resume.docx "https://boards.greenhouse.io/company/jobs/1234"
```

Reports the projected Jobscan match score before and after.

## Flags (all commands)

- `--page-count 1` — force 1-page output (overrides career-stage default).
- `--page-count 2` — force 2-page output.
- `--field <name>` — override the auto-detected field (engineering, product, marketing, design, sales, finance, data, healthcare, legal, ops, hr, education).
- `--stage <name>` — override career stage (entry, mid, senior, executive).
- `--no-summary` — skip the summary section (rare; mostly for entry-level).
- `--verbose` — show the full interview transcript and verb-tally table.
