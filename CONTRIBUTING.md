# Contributing to claude-resume

Contributions welcome. A few things worth knowing before you open a PR.

## What's most useful

1. **Field-specific skill templates.** The skills-section structure for marketing, design, finance, healthcare, legal, and nonprofit is light. If you work in one of those fields and have strong opinions, open a PR adding a more detailed template to `skills/resume/references/resume-best-practices.md` under Section 6 or 7.
2. **Extensions.** `extensions/linkedin/`, `extensions/jobscan/`, `extensions/jd-crawler/` are placeholders. If you build any of them, open a PR.
3. **Translations.** If you want to run the interview in a non-English language, contribute a translated copy of `skills/resume/references/interview-prompts.md`.
4. **Better score heuristic.** `scripts/score_resume.py` is deliberately simple. Tighter regex for passive voice, smarter bullet detection, and new categories (e.g., buzzword density) are all welcome.

## Workflow

```bash
git clone https://github.com/kunalrawat425/claude-resume.git
cd claude-resume
git checkout -b feature/your-thing
# make changes
bash install.sh   # reinstall locally to test
# test with /resume build, /resume score, etc.
git commit -m "feat: short description"
git push origin feature/your-thing
```

Open a PR against `main`. Include:

- What you changed.
- Why it matters (cite Jobscan / Resume Worded / source if you're changing a best practice).
- How you tested it (paste a before/after score if relevant).

## Style

- Keep SKILL.md files under 500 lines. Put long reference material in `references/`.
- Write imperative prose. Explain the *why* in one sentence before the *what*.
- No emojis in SKILL.md files or scripts. README can have them sparingly.
- Python: black-formatted, no linter strictness required.
- JavaScript: prettier-formatted, ES modules OK.
- Markdown: no trailing whitespace; blank line before headings and lists.

## Filing issues

Bug: OS + Claude Code version + command + full error output.

Feature request: what you're trying to do + why the current skill doesn't cover it + rough idea of how it would work.

## Code of conduct

Be kind. No harassment. Disagreements handled in the issue thread, not by escalating to email.

## License

By contributing you agree your contributions are released under the MIT License.
