# Troubleshooting

## The skill doesn't trigger when I mention "resume"

Check it's installed: `/plugin list` should show `resume`, `resume-score`, `resume-jd-tune`. If not, re-run `bash install.sh` or the plugin install command.

If it's listed but still not triggering, try a more explicit phrasing: "Use the resume skill to score my resume at ~/Downloads/my_resume.docx."

## `npm install -g docx` fails

Permission error on macOS/Linux: run with `sudo npm install -g docx` or use a node version manager (nvm, fnm, asdf) so your user owns the global npm directory.

On Windows: open PowerShell as administrator, or use `nvm-windows` / `fnm` for per-user node.

## `/resume score` errors with "No module named zipfile"

You're on Python 2. The score script requires Python 3.9+. Install with `brew install python3` (macOS), `apt install python3` (Linux), or download from <https://python.org> (Windows). Then run the script with `python3` explicitly.

## The DOCX output is 3 pages and I want 2

The skill auto-tightens when the page count exceeds the target. If it's still over, try:

- `/resume rewrite my_resume.docx --page-count 2` — forces 2-page target.
- Manually trim the oldest role to 1–2 bullets.
- Use smaller margins in `scripts/build_ats_resume.js` (change `margin: { top: 720, right: 864, bottom: 720, left: 864 }` to `720` everywhere).

## The DOCX opens blank in Microsoft Word

You likely have the wrong file. `scripts/build_ats_resume.js` writes to the current directory by default. Check the path the script printed when it finished.

## The score estimator says 72 but Jobscan says 91 (or vice versa)

The score in `scripts/score_resume.py` is a heuristic — it doesn't match any specific scanner exactly. Tools like Jobscan, Resume Worded, Enhancv, and TopResume weight categories differently. Use the heuristic to catch issues before submitting; use a real scanner for the final number.

## "The skill asked me for metrics I don't have"

The skill refuses to invent numbers. If you genuinely don't have a metric, rewrite the bullet to focus on an outcome you can name (scale, duration, scope) or drop it — a resume with 8 quantified bullets beats one with 12 including 4 vague ones.

## My PDF isn't parsing

The skill reads DOCX natively. For PDFs, it extracts text first; if the PDF is image-based (scanned), you'll need to OCR it or re-export from the source doc. Try exporting from Word/Google Docs as "Microsoft Word (.docx)" rather than PDF in the first place.

## Windows says "running scripts is disabled on this system"

That's PowerShell's execution policy. Override it just for this script:

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

## Conflict with another resume skill I installed

Claude Code's skill system picks the first matching skill. Uninstall the other one first, or explicitly invoke this one: "Use the `resume` skill from claude-resume to..."

## Still stuck

Open an issue: <https://github.com/kunalrawat425/claude-resume/issues>. Include: OS, Claude Code version, install method, the command you ran, and the full error output.
