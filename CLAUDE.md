# CLAUDE.md — Notes for Claude Code working on this repo

This file gives Claude context when editing the `claude-resume` skill itself. It's for development of the skill, not for end-users of the skill.

## What this repo is

A Claude Code plugin containing one primary skill (`resume`) and two sub-skills (`resume-score`, `resume-jd-tune`). The skill helps users produce ATS-safe resumes across any field.

## How to work in this repo

1. **Don't edit `SKILL.md` without reading `skills/resume/references/resume-best-practices.md` first.** The references are the source of truth; the SKILL.md is an orchestration layer.
2. **Keep SKILL.md under 500 lines.** Move deep material to references.
3. **Scripts live at repo root (`scripts/`), not inside skill dirs.** The skills point to them.
4. **Field additions** (new industry-specific skills category) go in `skills/resume/references/resume-best-practices.md` Section 6 / 7. Then update the field-detection table in `skills/resume/SKILL.md`.
5. **Never add network calls to `scripts/*`.** Extensions live in `extensions/<name>/` and declare their network behavior in the extension's own README.

## Testing a change

```bash
bash install.sh    # reinstalls locally
# Then in Claude Code:
/resume build      # runs the interview
/resume score ~/somepath/test.docx
/resume rewrite ~/somepath/test.docx
```

Compare before/after scores with `python3 scripts/score_resume.py <file>`.

## Commit style

Conventional commits. Examples:

- `feat(resume): add healthcare field template`
- `fix(score): regex miss for passive voice "had been"`
- `docs(readme): clarify plugin install requirements`
- `refactor(build): extract header builder into helper`
