# ATS Scoring Rubric

This is the heuristic used to estimate an ATS score before sending a resume through a real scanner. It mirrors how Jobscan, Resume Worded, Enhancv, and TopResume weight the major categories. Exact numbers vary per scanner — this rubric is directional.

## Overall weighting

| Category | Weight |
|---|---|
| Parsability / format | 15% |
| Section headings (standard names) | 8% |
| Job titles (canonical) | 8% |
| Quantified impact (bullets with metrics) | 15% |
| Action-verb variety | 8% |
| Active voice | 7% |
| Keyword density & coverage | 14% |
| Target-role signaling | 8% |
| Length (1–2 pages) | 6% |
| Graphics / visual complexity (inverse weight) | 6% |
| File format (DOCX for portals) | 5% |

Total = 100.

## Per-category scoring

### Parsability / format (0–100)
- 95–100: Single column, no tables, no images, no text boxes, plain bullets, standard fonts.
- 80–94: One minor issue (thin border, decorative bullet char).
- 60–79: 2-column layout with sidebar, or decorative pills.
- <60: Multi-column with photo, embedded tables used for layout.

### Section headings
- 100: All four standard headings present and spelled standardly.
- 85–95: One non-standard heading ("Career Journey," "Notable Achievements").
- 60–84: Two or more non-standard headings.
- <60: Missing major section (e.g., no Experience heading).

### Job titles
- 95–100: Every title is canonical.
- 80–94: One compound or non-standard title.
- 60–79: Multiple compound titles.
- <60: Most titles are made-up or company-specific (e.g., "Wizard of Code").

### Quantified impact
- 95–100: ≥90% of bullets have at least one number.
- 80–94: 70–89% quantified.
- 60–79: 50–69% quantified.
- <60: <50% of bullets have numbers.

### Action-verb variety
- 95–100: No verb used more than 2x.
- 80–94: One verb used 3x.
- 60–79: One verb used 4x, or multiple verbs at 3x.
- <60: Major verb repetition (same verb 5+ times).

### Active voice
- 95–100: No passive constructions detected.
- 80–94: 1–2 passive constructions.
- 60–79: 3–5 passive constructions.
- <60: >5 passive constructions.

### Keyword density & coverage
- 95–100: Skills section comprehensive (categorized, 40+ distinct keywords), each major skill appears at least once in experience bullets too.
- 80–94: Skills list complete but experience bullets under-use keywords.
- 60–79: Missing common keywords for the target role.
- <60: Skills section is sparse or uses phrase-breaking pill UI.

### Target-role signaling
- 95–100: Target band in subtitle AND summary first sentence.
- 80–94: Target role in summary but not subtitle.
- 60–79: Target implied but not stated.
- <60: No clear positioning.

### Length
- 100: 2 pages exactly for 5+ years experience, 1 page for <5 years.
- 90: 1.5 pages or 2 pages with some whitespace.
- 70: 3 pages.
- 50: 4+ pages or under-filled 1 page with gaps.

### Graphics / visual complexity (inverse — simpler is better)
- 100: Plain text, no images, no colored blocks.
- 85: Thin section-divider lines only.
- 70: Colored header or sidebar.
- 50: Multiple colors, icons, photo.

### File format
- 100: DOCX.
- 90: PDF exported from a text-based source.
- 70: PDF that's been re-scanned or OCRd.
- 40: Image-based PDF (scanned), or JPEG.

## Worked example

Say a resume scores:
- Parsability 96, Sections 98, Titles 95, Quantified 95, Verbs 92, Voice 94, Keywords 94, Target 95, Length 95, Graphics 95, Format 100.

Weighted:
0.15×96 + 0.08×98 + 0.08×95 + 0.15×95 + 0.08×92 + 0.07×94 + 0.14×94 + 0.08×95 + 0.06×95 + 0.06×95 + 0.05×100
= 14.4 + 7.84 + 7.6 + 14.25 + 7.36 + 6.58 + 13.16 + 7.6 + 5.7 + 5.7 + 5.0
= **~95.2**

That's a realistic ceiling for a generic (non-JD-tuned) resume. Per-JD tuning of the Skills section and summary keywords typically adds 2–4 points.

## Honesty note

No resume realistically scores a flat 100 across every scanner because tools weight things differently and some cap their top tier behind paid features. Always tell users the score is an estimate and suggest they run it through the actual scanner they'll be evaluated by (Jobscan if applying through LinkedIn / a job board, Resume Worded for general, Enhancv if using Enhancv's builder).
