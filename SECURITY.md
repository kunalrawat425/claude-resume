# Security Policy

## Reporting a vulnerability

If you find a security issue in this skill (e.g., the install script does something it shouldn't, the scoring script can be made to read arbitrary files), please report it privately by emailing the maintainer rather than opening a public issue.

Email: kunal.rawat@aerem.co

Include:
- A description of the vulnerability.
- Steps to reproduce.
- The affected file(s) and version.
- Optional: a suggested fix.

I'll acknowledge within 72 hours and aim to ship a fix within 14 days for critical issues.

## What this skill touches on your machine

- **Install scripts** copy files into `~/.claude/skills/` (or `%USERPROFILE%\.claude\skills\` on Windows). Nothing else.
- **Optional `npm install -g docx`** installs the `docx` package from npm into your global node modules.
- **`scripts/build_ats_resume.js`** writes a single `.docx` file to the current working directory.
- **`scripts/score_resume.py`** reads the file path you pass it. Doesn't write anything. Doesn't make network calls.

No telemetry. No background processes. No data leaves your machine.

## Dependencies audit

- `docx` (npm) — actively maintained, MIT-licensed.
- Python standard library only.

Run `npm audit` after install if you want to verify.
