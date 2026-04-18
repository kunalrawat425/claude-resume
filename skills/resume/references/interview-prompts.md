# Interview Prompts

Use the `mcp__conductor__AskUserQuestion` tool to ask questions **one at a time** with numbered options. The tool automatically adds an "Other" free-text option, so don't include one. Adapt follow-up questions based on previous answers — skip questions already answered.

## How to phrase the interview

Open with one short paragraph explaining what's about to happen:

> "I'll walk you through a few questions to build your resume. Pick from the options or type your own answer. Let's start."

Then work through the questions below, one per tool call.

## Required (must have answers before drafting)

### 1. Target role title and seniority

```json
{
  "question": "What role are you targeting?",
  "options": [
    "Software Engineer (Junior/Mid)",
    "Senior Software Engineer",
    "Staff / Principal Engineer",
    "Engineering Manager / Director",
    "Product Manager",
    "Data Scientist / ML Engineer",
    "Designer (UX/UI/Product)",
    "Marketing Manager / Director",
    "Sales / Account Executive",
    "Finance / Analytics"
  ]
}
```

### 2. Target industry or company type

```json
{
  "question": "What type of company are you targeting?",
  "options": [
    "FAANG / Big Tech",
    "Startup (seed–Series B)",
    "Growth-stage startup (Series C+)",
    "Enterprise / Fortune 500",
    "Agency / Consultancy",
    "Public sector / Government",
    "Healthcare",
    "Fintech / Finance",
    "E-commerce / Retail"
  ]
}
```

### 3. Years of experience

```json
{
  "question": "How many years of relevant experience do you have?",
  "options": [
    "0–2 years (entry level)",
    "3–5 years",
    "6–9 years",
    "10–15 years",
    "15+ years"
  ]
}
```

### 4. Current or most recent title and employer

```json
{
  "question": "What's your current (or most recent) job title and company?",
  "options": []
}
```
_No options — purely free-text. User types via the auto-provided "Other" input._

### 5. Job description available?

```json
{
  "question": "Do you have the job description for your target role? Paste it if yes — it roughly doubles the keyword match score.",
  "options": [
    "Yes, I'll paste it now",
    "No, I don't have one yet",
    "I have a general idea of what I'm targeting"
  ]
}
```
_If "Yes," wait for them to paste and acknowledge before continuing._

### 6. Top achievements with metrics

```json
{
  "question": "Share your top 3–5 career achievements WITH numbers (revenue, users, cost savings, speed improvements, team size, etc.). One per line.",
  "options": []
}
```
_Free-text. If they don't have numbers, ask them to estimate — but never invent._

### 7. Core skills / tools / stack

```json
{
  "question": "What are your core hard skills, tools, or technologies? List them separated by commas.",
  "options": []
}
```

### 8. Prior ATS scan results

```json
{
  "question": "Have you run your resume through any ATS scanner before (Jobscan, Resume Worded, Enhancv, TopResume)?",
  "options": [
    "Yes, I have results to share",
    "No, this is my first time",
    "Not sure what ATS scanning is"
  ]
}
```

### 9. Desired page count

```json
{
  "question": "How many pages should your resume be?",
  "options": [
    "1 page",
    "2 pages",
    "Not sure — pick for me based on experience"
  ]
}
```

## Context / tuning (ask after required block)

### 10. Work preference

```json
{
  "question": "What's your work location preference?",
  "options": [
    "Remote only",
    "Hybrid",
    "On-site",
    "Open to any",
    "Willing to relocate"
  ]
}
```

### 11. Work authorization

```json
{
  "question": "Any work authorization constraints to note?",
  "options": [
    "No constraints (citizen/PR)",
    "Need visa sponsorship (H-1B, etc.)",
    "Have existing work authorization (OPT, EAD, etc.)",
    "Prefer not to disclose on resume"
  ]
}
```

### 12. Career gaps or pivots

```json
{
  "question": "Any employment gaps, career pivots, or non-linear moves to address?",
  "options": [
    "No gaps or pivots",
    "Yes, I have a gap to explain",
    "Yes, I'm pivoting to a new field",
    "Yes, both gaps and a pivot"
  ]
}
```

### 13. Education

```json
{
  "question": "Tell me about your education — degree(s), institution(s), graduation year(s). Include GPA if ≥3.5.",
  "options": []
}
```

### 14. Certifications / extras

```json
{
  "question": "Any certifications, publications, patents, open-source work, or speaking engagements?",
  "options": [
    "Yes, I'll list them",
    "None to include"
  ]
}
```

### 15. Leadership scope

```json
{
  "question": "Have you managed people or budgets? If yes, what's the scope?",
  "options": [
    "No direct reports",
    "1–5 direct reports",
    "6–15 direct reports",
    "15+ / org-level leadership",
    "Cross-functional influence (no direct reports)"
  ]
}
```

### 16. Tone preference

```json
{
  "question": "What tone do you prefer for your resume?",
  "options": [
    "Conservative / traditional",
    "Modern / bold",
    "Balanced — professional but not stiff"
  ]
}
```

### 17. Anything to exclude?

```json
{
  "question": "Anything you want excluded from the resume? (Old employer, NDA project, specific role, etc.)",
  "options": [
    "No, include everything",
    "Yes, I'll specify"
  ]
}
```

### 18. Links to include

```json
{
  "question": "Any links to include? (LinkedIn, GitHub, portfolio, personal site)",
  "options": [
    "Yes, I'll paste them",
    "No links needed"
  ]
}
```

## For each role (loop through every job they want listed)

Ask: "Now let's go through each role you want on the resume, starting with the most recent."

For each role, ask these as separate questions:

### Role title, employer, dates

```json
{
  "question": "Role [N]: What was your title, company, dates (start–end), and location?",
  "options": []
}
```

### What did you ship?

```json
{
  "question": "Role [N] at [Company]: What did you ship or deliver? Include specific metrics.",
  "options": []
}
```

### What did you improve?

```json
{
  "question": "Role [N] at [Company]: What did you improve? (Before → after with %).",
  "options": []
}
```

### Leadership / influence

```json
{
  "question": "Role [N] at [Company]: Did you lead, mentor, or influence beyond your direct work?",
  "options": [
    "Yes, I'll describe",
    "No significant leadership in this role"
  ]
}
```

### Key business outcome

```json
{
  "question": "Role [N] at [Company]: What was the key business outcome? (Revenue, cost, retention, etc.)",
  "options": []
}
```

After finishing all roles, ask:

```json
{
  "question": "Any more roles to add?",
  "options": [
    "Yes, add another role",
    "No, that's all — start building"
  ]
}
```

## Post-draft

After producing the DOCX:

```json
{
  "question": "Resume built! What next?",
  "options": [
    "Tune it to a specific job description",
    "Run an ATS score check",
    "Generate a LinkedIn headline",
    "Make changes to the resume",
    "I'm done, thanks!"
  ]
}
```

## When the user already uploaded a resume

If the user shared a resume file:
1. Parse and extract everything you can — header, summary, all roles, dates, all bullets, skills, education.
2. Show them a brief recap: "I read your resume. Here's what I have for each role: [summary table]. Anything missing or wrong?"
3. Then ask only the gaps from the **required** list using AskUserQuestion — skip anything already extracted from the document.
