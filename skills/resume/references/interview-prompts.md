# Interview Prompts

The exact questions to ask the user before drafting the resume. Don't dump these all at once — group sensibly and adapt to what the user already shared (e.g., if they uploaded a resume, parse what you can from it first and only ask the gaps).

## Required (must have answers before drafting)

1. **Target role title and seniority** — e.g., "Senior Backend Engineer," "Director of Product Marketing," "Staff Data Scientist."
2. **Target industry or company type** — startup, enterprise, FAANG, public sector, agency, healthcare, fintech, etc.
3. **Years of total relevant experience** (number).
4. **Current or most recent title and employer.**
5. **Do you have the actual job description?** If yes, paste it — this enables keyword tuning. If no, ask for the closest representative JD they're targeting.
6. **Top 3–5 career achievements** with numbers (or, if they don't have numbers, ask them to add them now — don't invent).
7. **Core stack / tools / domain skills** — the hard skills they want represented.
8. **Any previous ATS scan results or flagged issues** (Jobscan, Enhancv, Resume Worded, TopResume) — paste them so the rewrite addresses each flag.
9. **Desired page count** — 1 or 2. Default by experience level: <10 yrs → 1, 10+ yrs → 2.

## Context / tuning

10. **Location + remote / hybrid / onsite preference** + willingness to relocate.
11. **Work authorization constraint** to flag (e.g., "Need H-1B sponsorship") or omit.
12. **Employment gaps, career pivots, or non-linear moves** to address.
13. **Education** — degrees, institutions, graduation years, GPA (if ≥3.5), relevant coursework (if entry-level).
14. **Certifications, licenses, publications, patents, open-source contributions, speaking engagements** — anything that would add credibility.
15. **Leadership scope** — team size managed, budget owned, cross-functional reach.
16. **Languages spoken** if relevant to target market.
17. **Tone preference** — conservative / traditional vs. modern / bold.
18. **"Do not include" items** — old employer they want hidden, project under NDA, embarrassing role, etc.
19. **LinkedIn URL, portfolio, GitHub** to include.

## For each role (loop through every job they want listed)

20. **Title, employer, dates, location** (city + state, or "Remote").
21. **Team / org size and where they sat in it.**
22. **What did they ship or deliver?** Specific outputs with metrics.
23. **What did they improve?** Baseline → new state with %.
24. **What did they lead, mentor, or influence beyond their direct work?**
25. **Technologies / tools used** (for tech roles); methodologies / frameworks (for non-tech).
26. **Key business outcome** their work produced — revenue lifted, cost cut, retention improved, churn reduced, customer satisfaction up, etc.

## Post-draft

27. **Want to tailor this resume to a specific JD?** If yes, paste the JD and run the keyword-tuning pass.
28. **Want an ATS self-check report?** Run `scripts/score_resume.py` on the output to surface remaining flags.
29. **Want a one-line summary to use as a LinkedIn headline / email signature?** Optional value-add.

## How to phrase the interview

Open with one short paragraph explaining what's about to happen and why:

> "Before I write anything, I need a few facts so the resume actually lands you the role you want. I'll ask the most important ones first, then drill into each job. If you have an actual job description for the role you're targeting, paste it — it'll roughly double the score. If you don't have metrics for some achievements, that's fine, but I'll ask for numbers as we go because vague bullets are the #1 reason resumes get filtered out."

Then ask the **required** block as the first batch (numbered, expecting answers in one reply). After they respond, work through context / tuning + per-role in the order it makes sense.

## When the user already uploaded a resume

If the user shared a resume file:
1. Parse and extract everything you can — header, summary, all roles, dates, all bullets, skills, education.
2. Show them a brief recap: "I read your resume. Here's what I have for each role: [summary table]. Anything missing or wrong?"
3. Then ask only the gaps from the **required** list (target role, target industry, JD, prior ATS flags, page count) plus any **per-role** fields where you couldn't extract metrics.

This avoids re-asking for info already in the document and keeps the interview short.
