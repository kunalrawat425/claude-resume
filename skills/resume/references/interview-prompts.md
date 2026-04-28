# Interview Prompts

Use the `mcp__conductor__AskUserQuestion` tool to ask questions **one at a time** with numbered options. The tool automatically adds an "Other" free-text option, so don't include one. **Hard limit: ≤4 options per question** — chunk wider question spaces via branching (ask category first, then specifics).

## How to phrase the interview

Open with one short paragraph explaining what's about to happen:

> "Walk you through few questions to build your resume. Pick from options or type your own. Start."

Then work through the questions below, one per tool call.

## Required (must have answers before drafting)

### 1a. Target field (branching question — 4 options max)

```json
{
  "question": "What field are you targeting?",
  "options": [
    "Engineering / Data / ML",
    "Product / Design",
    "Marketing / Sales",
    "Finance / Ops / Healthcare / Legal / Other"
  ]
}
```

### 1b. Target role within field

If field = "Engineering / Data / ML":
```json
{
  "question": "Which engineering role?",
  "options": [
    "Software Engineer (Junior/Mid)",
    "Senior Software Engineer",
    "Staff / Principal Engineer",
    "Engineering Manager / Director"
  ]
}
```

If field = "Product / Design":
```json
{
  "question": "Which product/design role?",
  "options": [
    "Product Manager",
    "Senior / Group PM",
    "Designer (UX/UI/Product)",
    "Design Lead / Manager"
  ]
}
```

If field = "Marketing / Sales":
```json
{
  "question": "Which marketing/sales role?",
  "options": [
    "Marketing Manager / Director",
    "Growth / Performance Marketer",
    "Account Executive / SDR",
    "Sales Manager / Director"
  ]
}
```

If field = "Finance / Ops / Healthcare / Legal / Other":
```json
{
  "question": "Which role?",
  "options": [
    "Finance / Analytics / Data Analyst",
    "Operations / HR / People",
    "Healthcare / Clinical",
    "Legal / Education / Nonprofit / Government"
  ]
}
```

### 2. Target company type

```json
{
  "question": "What type of company are you targeting?",
  "options": [
    "Big Tech / FAANG",
    "Startup (seed–Series C)",
    "Enterprise / Fortune 500",
    "Public sector / Agency / Other"
  ]
}
```

### 3. Years of experience

```json
{
  "question": "How many years of relevant experience?",
  "options": [
    "0–2 years (entry)",
    "3–5 years",
    "6–9 years",
    "10+ years"
  ]
}
```

### 4. Current title and employer

```json
{
  "question": "Current (or most recent) job title and company?",
  "options": []
}
```
_No options — pure free-text via auto "Other"._

### 5. Job description available?

```json
{
  "question": "Job description for your target role? (Roughly doubles keyword match.)",
  "options": [
    "Yes, paste it now",
    "No, don't have one",
    "General idea only"
  ]
}
```
_If "Yes," wait for paste before continuing._

### 6. Top achievements with metrics

```json
{
  "question": "Top 3–5 career achievements WITH numbers (revenue, users, savings, speed, team size). One per line.",
  "options": []
}
```
_Free-text. If they don't have numbers, ask to estimate — never invent._

### 7. Core skills / tools / stack

```json
{
  "question": "Core hard skills, tools, or technologies? Comma-separated.",
  "options": []
}
```

### 8. Prior ATS scan results

```json
{
  "question": "Run resume through any ATS scanner before?",
  "options": [
    "Yes, have results",
    "No, first time",
    "Not sure what ATS is"
  ]
}
```

### 9. Page count

```json
{
  "question": "How many pages?",
  "options": [
    "1 page",
    "2 pages",
    "Pick for me based on experience"
  ]
}
```

## Context / tuning (after required block)

### 10. Work preference

```json
{
  "question": "Work location preference?",
  "options": [
    "Remote only",
    "Hybrid",
    "On-site",
    "Open / will relocate"
  ]
}
```

### 11. Work authorization

```json
{
  "question": "Work authorization?",
  "options": [
    "No constraints (citizen/PR)",
    "Need visa sponsorship",
    "Have OPT/EAD/etc.",
    "Don't disclose"
  ]
}
```

### 12. Career gaps or pivots

```json
{
  "question": "Employment gaps or pivots?",
  "options": [
    "None",
    "Gap to explain",
    "Pivot to new field",
    "Both gap and pivot"
  ]
}
```

### 13. Education

```json
{
  "question": "Education — degree(s), institution(s), year(s). Include GPA if ≥3.5.",
  "options": []
}
```

### 14. Certifications / extras

```json
{
  "question": "Certifications, publications, patents, OSS, speaking?",
  "options": [
    "Yes, list them",
    "None to include"
  ]
}
```

### 15. Leadership scope

```json
{
  "question": "Managed people or budgets?",
  "options": [
    "No direct reports",
    "1–5 reports",
    "6–15 reports",
    "15+ / cross-functional"
  ]
}
```

### 16. Tone

```json
{
  "question": "Resume tone?",
  "options": [
    "Conservative / traditional",
    "Modern / bold",
    "Balanced"
  ]
}
```

### 17. Exclusions

```json
{
  "question": "Anything to exclude? (Old employer, NDA project, role)",
  "options": [
    "Include everything",
    "Yes, will specify"
  ]
}
```

### 18. Links

```json
{
  "question": "Links to include? (LinkedIn, GitHub, portfolio)",
  "options": [
    "Will paste them",
    "No links"
  ]
}
```

## Per-role loop (every job to be listed)

Open: "Now go through each role, most recent first."

### Role title, employer, dates

```json
{
  "question": "Role [N]: title, company, dates (start–end), location?",
  "options": []
}
```

### What shipped?

```json
{
  "question": "Role [N] at [Company]: What did you ship/deliver? Include metrics.",
  "options": []
}
```

### What improved?

```json
{
  "question": "Role [N] at [Company]: What did you improve? (Before → after with %)",
  "options": []
}
```

### Leadership / influence

```json
{
  "question": "Role [N] at [Company]: Lead, mentor, or influence beyond direct work?",
  "options": [
    "Yes, will describe",
    "No significant leadership"
  ]
}
```

### Business outcome

```json
{
  "question": "Role [N] at [Company]: Key business outcome? (Revenue, cost, retention)",
  "options": []
}
```

### More roles?

```json
{
  "question": "More roles to add?",
  "options": [
    "Yes, add another",
    "No, start building"
  ]
}
```

## Post-draft

```json
{
  "question": "Resume built! What next?",
  "options": [
    "Tune to a JD",
    "Run ATS score check",
    "Make changes",
    "Done, thanks"
  ]
}
```

## When user already uploaded a resume

1. Parse and extract everything — header, summary, all roles, dates, all bullets, skills, education.
2. Show brief recap: "Read your resume. Here's what I have for each role: [summary]. Anything missing or wrong?"
3. Then ask only the gaps from the **required** list using AskUserQuestion — skip anything already extracted (but confirm).

## Tool-call constraint

`mcp__conductor__AskUserQuestion` enforces ≤4 options per question. If a question has more candidates, split into a branching pair (category → specific). Never include "Other" — it's auto-added.
