# Installation Guide

Three install paths depending on how you use Claude.

## Plugin install (recommended)

Claude Code 1.0.33+. Single command adds the marketplace and installs the skill.

```bash
/plugin marketplace add kunalrawat425/claude-resume
/plugin install resume@claude-resume
```

Verify:

```bash
/plugin list
```

`resume`, `resume-score`, and `resume-jd-tune` should appear.

## Manual install (Unix / macOS / Linux)

```bash
git clone https://github.com/kunalrawat425/claude-resume.git
cd claude-resume
bash install.sh
```

`install.sh` copies the three skills into your Claude Code skills directory (`~/.claude/skills/` on macOS/Linux) and runs `npm install -g docx` if the `docx` package isn't present.

## Windows (PowerShell)

```powershell
git clone https://github.com/kunalrawat425/claude-resume.git
cd claude-resume
powershell -ExecutionPolicy Bypass -File install.ps1
```

## Dependencies

- **Claude Code** 1.0.33+ for plugin install, or any Claude environment that supports skills (Cowork, Claude.ai with plugins).
- **Node.js** 18+ and the `docx` package — needed by `scripts/build_ats_resume.js`. Installed automatically by `install.sh` / `install.ps1`.
- **Python** 3.9+ — needed by `scripts/score_resume.py`.
- **LibreOffice** (optional) — for PDF preview. `brew install --cask libreoffice` (macOS) or `apt install libreoffice` (Linux).

## Verifying the install

After install, restart Claude Code and run:

```bash
/resume build
```

The skill should respond with the interview prompts from `skills/resume/references/interview-prompts.md`.

Or test the score estimator:

```bash
python3 ~/.claude/skills/resume/scripts/score_resume.py path/to/resume.docx
```

## Uninstalling

```bash
# Plugin install
/plugin uninstall resume@claude-resume
/plugin marketplace remove kunalrawat425/claude-resume

# Manual install
bash uninstall.sh         # macOS / Linux
powershell -ExecutionPolicy Bypass -File uninstall.ps1   # Windows
```
