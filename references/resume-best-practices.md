# Resume Best Practices — ATS & Recruiter Reference (2026)

A consolidated, actionable reference synthesizing current guidance from Jobscan, Resume Worded, Enhancv, Harvard Office of Career Services, Indeed Career Advice, LinkedIn Talent Blog, Workday and Greenhouse parsing documentation, and current r/resumes / r/cscareerquestions consensus.

## 1. ATS truths in 2026

- The "75% of resumes are rejected by ATS" stat traces to a misquoted 2012 Preptel figure and is **not supported by primary research** [Jobscan, LinkedIn Talent Blog]. Modern ATS rarely auto-reject; they rank, tag, and surface candidates. Recruiters still do the filtering, usually in under 7.4 seconds on first pass [Ladders / Jobscan].
- Nearly all Fortune 500 and ~98%+ of large employers use an ATS (Workday, Greenhouse, Taleo, iCIMS, Lever, SmartRecruiters) [Jobscan, Greenhouse docs].
- Modern parsers (Workday, Greenhouse 2024–2026) handle standard PDFs well. Parse failure is no longer the dominant risk; **poor keyword/content match and recruiter skim-fails** are [Greenhouse parsing docs, Workday Help].
- AI-assisted ATS (Eightfold, Paradox, Workday's AI Talent, HireVue, Jobscan's 2025 GPT-layer) now do semantic matching — synonyms count, but raw keyword coverage still drives initial ranking [Jobscan 2025 AI update, Enhancv].
- Myth: "ATS can't read PDFs." False for 2026 text-based PDFs. True only for scanned/image PDFs [Workday docs, Jobscan].
- Myth: "White-text keyword stuffing works." Detected and penalized by every major 2025+ ATS and will get you blacklisted at many firms [Jobscan, Resume Worded].

## 2. Format & structure DO's

- **File format:** DOCX is the safest universal default for unknown ATS. Use PDF only when (a) the portal explicitly accepts it, or (b) you've confirmed the employer uses Workday / Greenhouse / Lever / SmartRecruiters, all of which parse modern PDFs cleanly [Jobscan 2025, Greenhouse docs]. When in doubt, DOCX.
- **Single column**, top-to-bottom, left-to-right reading order [Jobscan, Harvard OCS].
- **Fonts:** Standard sans-serif (Calibri, Arial, Helvetica, Aptos) or serif (Georgia, Garamond, Cambria). Avoid Times New Roman if you want to look current [Enhancv, Indeed].
- **Font size:** 10–12pt body, 14–16pt name, 11–13pt section headings.
- **Margins:** 0.5"–1" on all sides; 0.7" is a good default.
- **Length:** 1 page for <10 yrs experience; 2 pages for 10+ yrs or senior IC / management; 3 pages only for executive / academic / federal [Harvard OCS, Indeed].
- **Section headings:** Use standard labels — "Experience" or "Professional Experience," "Education," "Skills," "Projects," "Certifications." Parsers key off these exact words [Workday, Jobscan].
- **Dates:** `MMM YYYY – MMM YYYY` format (e.g., "Mar 2022 – Present"). Right-align dates. Never use only years for recent roles [Jobscan, Greenhouse].
- **Contact info:** Name, city + state (no full street address), phone, email, LinkedIn URL, portfolio / GitHub if relevant. Put in body text — **not** in the header / footer region [Workday docs, Jobscan].
- **File naming:** `FirstName_LastName_Role.pdf` or `.docx`. No spaces in some legacy systems; underscores are universally safe [Resume Worded].
- **Bullets:** Use standard round bullets (•) or hyphens. Left-align bullet text.
- **Reverse-chronological** order within each section [Harvard OCS, Indeed].

## 3. Format & structure DON'Ts

- **No photos / headshots** (US / UK / Canada / Australia market). Triggers bias-avoidance auto-filters at many firms and parses as junk [Jobscan, LinkedIn Talent].
- **No tables or multi-column layouts** — Workday and Taleo still mis-order text from columns even in 2026 [Workday docs, r/resumes consensus].
- **No text boxes** — contents often drop entirely from parsed output [Greenhouse].
- **No headers / footers** for contact info — some parsers ignore this region.
- **No graphics, icons, progress bars, star ratings, charts** — parsed as nothing or as gibberish [Jobscan, Enhancv].
- **No emojis** in body content.
- **No special unicode characters** for bullets (◆, ❯, →) — stick to •, -, or *.
- **No unusual fonts** (script, display, decorative).
- **No color-coded meaning** — an ATS reads plain text; color conveys nothing.
- **No "skills bars" or rating scales** (e.g., "Python ████░").
- **No two-page PDFs with one-page fold tricks.**
- **No horizontal dividers made of special characters** — use Word's built-in border tool.

## 4. Content DO's

- **Quantify** everything you can: `%`, `$`, time saved, scale (users, QPS, team size), deltas [Harvard OCS, Jobscan]. Rule of thumb: ≥60% of bullets should carry a number.
- **Strong action verbs** to start every bullet: Led, Built, Shipped, Architected, Reduced, Drove, Scaled, Launched, Automated, Owned [Enhancv verb list, Indeed]. Past tense for prior roles; present tense for current role.
- **Target-role signaling:** Mirror the target JD's title / function in your summary and recent bullets. If you're a "Backend Engineer" targeting "Platform Engineer," introduce platform-adjacent vocabulary [Jobscan].
- **Summary** (3–4 lines, optional for <3 yrs experience): `[Seniority + role] with [X yrs] in [domain]. Built / Led [signature achievement]. Expertise in [3–5 keywords]. Seeking [target role type].` [Resume Worded].
- **Skills section: categorized** outperforms flat for parsing and skim (e.g., `Languages:`, `Cloud & Infra:`, `Data:`, `Tools:`). Include both acronym and expansion once: "AWS (Amazon Web Services)" [Jobscan, Workday parsing].
- **Bullet length:** 1–2 lines, ~15–25 words. Cut anything longer.
- **Bullets per role:** 5–6 for most recent, 3–4 for mid-career roles, 1–2 for older roles.
- **Experience ordering:** Reverse chronological. Within a role, lead with highest-impact bullet, not earliest.
- **Recency:** The most recent 2 roles / 5 years should occupy ~60–70% of the resume's real estate [Harvard OCS].
- **Hard skills first** in skills section, soft skills demonstrated in bullets (not listed).
- **Show outcomes, not duties:** "Responsible for X" → "Delivered X, reducing Y by Z%."

## 5. Content DON'Ts

- **No vague filler:** "hard worker," "team player," "results-driven," "go-getter," "passionate," "detail-oriented," "synergy," "self-starter" [Indeed, Enhancv].
- **No passive voice:** "Was responsible for," "Tasks included," "Duties involved." Rewrite with an active verb.
- **Action-verb repetition:** Don't reuse the same verb more than **twice** across the whole resume [Resume Worded's threshold]. Jobscan flags at 3+. Maintain a verb bank.
- **No redundant phrasing:** "successfully launched," "utilized" (→ "used"), "in order to" (→ "to"), "helped to" (drop "to").
- **No irrelevant skills:** Microsoft Word, email, Internet — assumed.
- **No references** on the resume.
- **No "References available on request"** — dead real estate [Harvard OCS, Indeed].
- **No Objective statement** — replaced by Summary (or omit entirely for experienced candidates) [LinkedIn Talent, Enhancv].
- **No pronouns** ("I," "my," "we").
- **No full mailing address** — city + state only (privacy + parser compliance).
- **No DOB, marital status, nationality, photo** (US norms).
- **No GPA if <3.5** or if you have >3 years experience.
- **No high school** once you have any college or professional experience.
- **No unexplained gaps:** Short-label them ("Career Break — Caregiving, 2023") rather than hide.
- **No jargon-only bullets** that a recruiter (non-expert) can't parse.

## 6. Job-specific keyword tuning

- **Mirror the JD's exact phrasing** for hard skills and tools where true (e.g., if JD says "Kubernetes," don't write "K8s" only — include both) [Jobscan].
- **Density target:** Jobscan's benchmark is a **match score of 75–80%+** against the JD for hard skills, titles, and key phrases. Resume Worded targets similar.
- **Keyword placement priority:**
  1. **Skills section** (highest parser weight) [Workday, Greenhouse].
  2. **Most recent role's bullets** (proves recency of skill).
  3. **Summary** (top-of-page recruiter skim).
  4. **Job titles** — if your internal title is "Software Engineer II" but the role is "Backend Engineer," use "Software Engineer II, Backend" to bridge.
- **Avoid stuffing:** Don't list a skill you can't defend. Modern AI-layer ATS (Eightfold, Jobscan AI 2025) cross-check skill mentions against bullet evidence and penalize unsupported claims [Jobscan 2025 AI update].
- **Synonyms matter now:** Semantic ATS match "managed" ≈ "led" ≈ "oversaw," but exact-match still wins on hard nouns (tool names, certifications) [Enhancv, Jobscan].
- **Title tuning:** If the JD title differs materially from yours, add a **target title line** under your name (e.g., "Platform Engineer | SRE | DevOps").
- **Acronym rule:** Include both forms once — "SEO (Search Engine Optimization)."

## 7. Career-stage adjustments

**Entry-level (0–2 yrs)**
- 1 page, strict.
- Order: Contact → Summary (optional) → Education (first, with GPA if ≥3.5, relevant coursework, honors) → Projects → Experience → Skills.
- Projects section carries weight; treat personal / course projects like jobs with bullets + metrics.
- Internships count as experience.

**Mid-level (3–9 yrs)**
- 1 page preferred; 2 pages acceptable if dense.
- Order: Contact → Summary → Experience → Skills → Education → Certifications.
- Education demoted below experience.
- Emphasize scope growth, promotions, cross-functional impact.

**Senior / Staff / Principal (10+ yrs IC or manager)**
- 2 pages standard.
- Lead with a Summary that names seniority + domain + signature scale (e.g., "team of 12," "$40M ARR," "billions of events / day").
- Leadership signals: mentoring, architecture ownership, cross-team influence, hiring, on-call leadership, tech strategy.
- Older roles (>10 yrs) condensed to 1–2 lines or an "Earlier Experience" block.

**Executive (Director+, VP, C-level)**
- 2–3 pages.
- Add: Board / advisory roles, P&L ownership, M&A, org size scaled, fundraising, strategic initiatives.
- Summary becomes a 4–6 line executive brief.
- Include a "Selected Achievements" block at top for quick skim.
- Keywords: "P&L," "GTM," "org design," "board," "scaled X→Y."

## 8. What modern ATS actually score in 2026

- **Hybrid scoring** is now standard: classic keyword / weight match + LLM semantic scoring layered on top [Jobscan 2025, Eightfold, Workday AI Talent].
- **New scored categories (2025–2026):**
  - **Skill-evidence alignment:** Does a claimed skill show up in bullet context? [Jobscan AI].
  - **Impact density:** Ratio of quantified outcomes to total bullets [Resume Worded].
  - **Seniority inference:** LLMs infer level from verbs, scope, team size — mismatched titles flagged [Eightfold].
  - **Recency of skills:** A skill last used 8 years ago scores lower than one in current role [Workday AI].
  - **Career trajectory:** Upward progression, tenure patterns, job-hop signals [LinkedIn Talent].
  - **Readability / clarity:** LLM-based "would a recruiter understand this in 7 seconds?" score [Enhancv 2025].
- **Still matters:** exact-match keywords, standard headings, parseable format.
- **No longer enough:** keyword match alone — a 90% keyword match with vague bullets will lose to a 75% match with quantified impact [Jobscan AI 2025].
- **Bias controls:** Most 2026 enterprise ATS strip name, photo, and school before scoring — so prestige-school signals are weaker than they were [Workday, Greenhouse DEI docs].

## 9. Common ATS report flags and canonical fixes

| Flag | Canonical Fix |
|---|---|
| **Low keyword match (<60%)** | Add JD's exact hard-skill terms to Skills and recent bullets. |
| **Missing hard skill X** | Add to Skills if true; add evidence bullet if possible. |
| **Contact info not parsed** | Move out of header / footer into body; use plain text. |
| **Dates not parsed** | Use `MMM YYYY – MMM YYYY`; avoid "Present" without a start date. |
| **Non-standard section headings** | Rename to "Experience," "Education," "Skills." |
| **Tables / columns detected** | Convert to single-column, linear layout. |
| **Too long / too short** | Apply page rules from Section 7. |
| **Bullets start with weak verbs** | Replace "Responsible for," "Helped," "Worked on" with strong action verbs. |
| **Low quantification score** | Add numbers to at least 60% of bullets. |
| **Repeated action verbs** | Ensure no verb appears more than 2x. |
| **Buzzword density high** | Remove filler adjectives ("passionate," "dynamic," etc.). |
| **Skill unsupported by bullets** | Either remove skill or add an evidence bullet. |
| **Title mismatch with target** | Add bridging subtitle or parenthetical ("Software Engineer (Backend Platform)"). |
| **Gap detected** | Add short labeled block for the gap. |
| **Education misparsed** | Format as `Degree, Major — Institution, YYYY`. |
| **File format rejected** | Resubmit as DOCX. |
| **Image-based PDF** | Re-export as text-based PDF from source doc. |
| **Inconsistent tense** | Current role present tense; all others past tense. |
| **Too many bullets on old roles** | Trim 10+ yr-old roles to 1–2 lines. |

## 10. Quick reference — verbs that work

Use a varied bank. Never repeat a verb more than 2x across the whole resume.

**Building / shipping:** Architected, Built, Designed, Developed, Engineered, Implemented, Launched, Released, Shipped, Deployed, Created, Constructed, Established, Pioneered, Prototyped, Productionized.

**Leading / influencing:** Led, Owned, Drove, Directed, Headed, Spearheaded, Championed, Mentored, Coached, Guided, Coordinated, Orchestrated, Aligned, Partnered, Convened.

**Improving / scaling:** Optimized, Improved, Reduced, Cut, Accelerated, Increased, Boosted, Lifted, Doubled, Tripled, Streamlined, Refactored, Rebuilt, Modernized, Hardened, Stabilized, Migrated.

**Analyzing / strategizing:** Analyzed, Assessed, Audited, Diagnosed, Evaluated, Forecasted, Modeled, Researched, Investigated, Identified, Defined, Strategized, Prioritized, Planned, Roadmapped.

**Delivering outcomes:** Delivered, Achieved, Generated, Produced, Secured, Won, Closed, Captured, Acquired, Retained, Recovered, Expanded, Grew, Saved, Earned.
