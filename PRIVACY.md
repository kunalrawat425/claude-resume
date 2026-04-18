# Privacy

This skill runs entirely on your machine. Nothing about your resume or career history is transmitted to any server.

## What the skill does

- **Reads** the resume file you pass it (DOCX, PDF, text).
- **Writes** a new DOCX file in your current working directory.
- **Calls** `node`, `python3`, and (optionally) `soffice` / `pdftoppm` as local subprocesses.

## What the skill doesn't do

- No network calls from `build_ats_resume.js` or `score_resume.py`.
- No telemetry.
- No account, no sign-in, no data collection.

## Interaction with Claude

When you invoke the skill in Claude Code / Cowork / Claude.ai, your prompt (including any resume content you paste or file you attach) is sent to Anthropic's API as part of normal Claude operation. That's governed by Anthropic's privacy policy, not this skill's. If you're sensitive about resume content, consider redacting employer names / specific project names before pasting.

## Extensions

Optional extensions (LinkedIn sync, Jobscan API, JD crawler) DO make network calls to the services they integrate with. Each extension has its own README with its own privacy terms. Install extensions only if you're comfortable with those services seeing your data.

## Questions

Email kunal.rawat@aerem.co.
