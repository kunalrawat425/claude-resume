/**
 * ATS-safe resume DOCX builder.
 *
 * Usage:
 *   1. Populate the DATA object below with the user's rewritten content.
 *   2. npm install -g docx   (one-time)
 *   3. node build_ats_resume.js
 *
 * Outputs: ./<firstname>_<lastname>_resume.docx in the current working directory.
 *
 * Why this template works for ATS:
 *   - Single column layout, plain paragraphs (no tables, no text boxes).
 *   - Arial font (universally supported and standard).
 *   - Standard section headings that parsers anchor on.
 *   - True docx bullet numbering (LevelFormat.BULLET), not unicode chars.
 *   - Right-aligned dates via tab stops (parser-friendly).
 *   - Email / LinkedIn / GitHub as plain-text hyperlinks in the body (not in a header).
 *   - US Letter 8.5 x 11 in, 0.5"-0.6" margins.
 */

const fs = require('fs');

// Resolve the `docx` package whether installed locally or globally (via npm -g).
// Without this, `node build_ats_resume.js` fails with MODULE_NOT_FOUND when
// docx was installed via `npm install -g docx`.
function loadDocx() {
  try {
    return require('docx');
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
    try {
      const { execSync } = require('child_process');
      const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
      module.paths.push(globalRoot);
      return require('docx');
    } catch (inner) {
      console.error("Cannot find the 'docx' package. Install it with:");
      console.error('  npm install -g docx');
      console.error('  # or, in this directory: npm install docx');
      process.exit(1);
    }
  }
}

const {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat,
  BorderStyle, TabStopType, ExternalHyperlink,
} = loadDocx();

// ============================================================
// POPULATE THIS OBJECT WITH THE USER'S CONTENT
//
// Works for ANY role / industry — engineering, product, marketing,
// design, sales, finance, healthcare, legal, ops, HR, education,
// nonprofit, government. Adjust the skills categories and bullet
// content to fit the user's field. Section structure stays the same
// because it's the structure ATS parsers expect.
// ============================================================
const DATA = {
  skillsHeading: "SKILLS",   // or "TECHNICAL SKILLS" for tech / data / engineering roles
  header: {
    name: "FIRST LAST",
    // Target role line — pick 2-3 canonical titles you're targeting.
    // Examples: "Senior Product Manager  |  Group PM"
    //           "Marketing Director  |  VP Marketing"
    //           "Staff Software Engineer  |  Principal / Lead"
    //           "Senior UX Designer  |  Design Manager"
    //           "Director of Sales  |  VP Sales"
    targetRoleLine: "[Target Title]  |  [Alt Title]  |  [Alt Title]",
    location: "City, State",
    remote: "Open to Remote",
    phone: "+1 555 555 5555",
    email: "name@example.com",
    linkedin: "linkedin.com/in/handle",
    github: "github.com/handle",   // or portfolio URL; set to "" to omit
  },

  summary:
    "[Seniority + role] with [X+] years [core competency]. [Signature achievement or scale]. Expertise in [3-5 keywords]. [Leadership / scope signal]. [Industry / domain signal].",

  // Categorized skills — plain text under bold labels. Pick category names
  // that fit the user's field. Examples by role type:
  //
  //   Software Engineer:  Languages, Backend, Frontend, Data, Cloud & DevOps, Leadership
  //   Product Manager:    Methodologies, Tools, Domains, Leadership, Cross-Functional
  //   Marketing:          Channels, Tools, Analytics, Content, Strategy
  //   Designer:           Tools, Methods, Disciplines, Research, Leadership
  //   Sales:              Methodologies, Tools, Industries, Skills, Languages
  //   Finance / Analyst:  Tools, Modeling, Reporting, Compliance, Domain
  //   Healthcare:         Clinical Skills, EMR Systems, Certifications, Specialties
  //   Legal:              Practice Areas, Software, Languages, Bar Admissions
  //   Operations / HR:    Frameworks, Software, Domains, Compliance, Languages
  //
  // Use 5-8 categorized rows. Avoid pill UI — plain comma-separated text wins on ATS.
  skills: [
    ["Category 1",              "Skill A, Skill B, Skill C, Skill D"],
    ["Category 2",              "Skill A, Skill B, Skill C, Skill D"],
    ["Category 3",              "Skill A, Skill B, Skill C"],
    ["Category 4",              "Skill A, Skill B, Skill C"],
    ["Category 5",              "Skill A, Skill B, Skill C"],
    ["Leadership & Soft Skills", "..."],
  ],

  experience: [
    {
      title: "Canonical Job Title",
      company: "Company Name",
      location: "City, State",
      dates: "Mon YYYY – Present",    // or "Mon YYYY – Mon YYYY"
      bullets: [
        "Action verb + what you shipped / owned + quantified outcome (%, $, users, latency, etc.).",
        "Action verb + improvement + baseline-to-new-state metric.",
        "Action verb + leadership / mentoring scope + outcome.",
      ],
    },
    // ... more roles in reverse chronological order
  ],

  education: [
    {
      degree: "Bachelor of Engineering, Information Technology",
      school: "School Name",
      location: "City, State",
      dates: "Aug YYYY – Mar YYYY",
      gpa: "",   // include only if >= 3.5
    },
  ],
};

// ============================================================
// Builder — generally leave this alone
// ============================================================

const ARIAL = "Arial";
const PRIMARY = "1F3D6B";
const MUTED = "444444";

const CONTENT_WIDTH_DXA = 9360; // tab stop position for right-aligned dates

const section = (title) => new Paragraph({
  spacing: { before: 180, after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2E5C8A", space: 2 } },
  children: [new TextRun({ text: title, bold: true, size: 22, font: ARIAL, color: PRIMARY, characterSpacing: 20 })],
});

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 20, after: 20, line: 252 },
  children: [new TextRun({ text, font: ARIAL, size: 20 })],
});

const jobHeader = (title, company, location, dates) => [
  new Paragraph({
    spacing: { before: 120, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH_DXA }],
    children: [
      new TextRun({ text: title, bold: true, font: ARIAL, size: 21 }),
      new TextRun({ text: "\t" + dates, font: ARIAL, size: 20 }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 40 },
    children: [
      new TextRun({ text: `${company} | ${location}`, italics: true, font: ARIAL, size: 20, color: MUTED }),
    ],
  }),
];

const labeledLine = (label, value) => new Paragraph({
  spacing: { before: 10, after: 10, line: 252 },
  children: [
    new TextRun({ text: label + ": ", bold: true, font: ARIAL, size: 20 }),
    new TextRun({ text: value, font: ARIAL, size: 20 }),
  ],
});

function buildContactParagraphs(h) {
  const line1 = [
    new TextRun({ text: `${h.location}  |  ${h.remote}  |  ${h.phone}  |  `, font: ARIAL, size: 18 }),
    new ExternalHyperlink({
      link: `mailto:${h.email}`,
      children: [new TextRun({ text: h.email, font: ARIAL, size: 18, color: "1155CC", underline: {} })],
    }),
  ];
  const line2Children = [
    new ExternalHyperlink({
      link: `https://${h.linkedin}`,
      children: [new TextRun({ text: h.linkedin, font: ARIAL, size: 18, color: "1155CC", underline: {} })],
    }),
  ];
  if (h.github) {
    line2Children.push(new TextRun({ text: "  |  ", font: ARIAL, size: 18 }));
    line2Children.push(new ExternalHyperlink({
      link: `https://${h.github}`,
      children: [new TextRun({ text: h.github, font: ARIAL, size: 18, color: "1155CC", underline: {} })],
    }));
  }
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: line1 }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: line2Children }),
  ];
}

function buildDoc(d) {
  const children = [];
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: d.header.name.toUpperCase(), bold: true, font: ARIAL, size: 36, color: PRIMARY })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: d.header.targetRoleLine, font: ARIAL, size: 22, bold: true, color: MUTED })],
  }));
  buildContactParagraphs(d.header).forEach(p => children.push(p));

  children.push(section("PROFESSIONAL SUMMARY"));
  children.push(new Paragraph({
    spacing: { before: 40, after: 60, line: 264 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text: d.summary, font: ARIAL, size: 20 })],
  }));

  // Use "TECHNICAL SKILLS" for engineering / IT / data roles.
  // Use "SKILLS" for everything else (PM, marketing, design, sales, finance,
  // healthcare, legal, ops, HR, etc.). Either is ATS-standard.
  children.push(section(d.skillsHeading || "SKILLS"));
  d.skills.forEach(([l, v]) => children.push(labeledLine(l, v)));

  children.push(section("PROFESSIONAL EXPERIENCE"));
  d.experience.forEach((job) => {
    jobHeader(job.title, job.company, job.location, job.dates).forEach(p => children.push(p));
    job.bullets.forEach(b => children.push(bullet(b)));
  });

  children.push(section("EDUCATION"));
  d.education.forEach((e) => {
    children.push(new Paragraph({
      spacing: { before: 40, after: 20 },
      tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH_DXA }],
      children: [
        new TextRun({ text: e.degree, bold: true, font: ARIAL, size: 21 }),
        new TextRun({ text: "\t" + e.dates, font: ARIAL, size: 20 }),
      ],
    }));
    children.push(new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: `${e.school} | ${e.location}${e.gpa ? "  |  GPA: " + e.gpa : ""}`, italics: true, font: ARIAL, size: 20, color: MUTED })],
    }));
  });

  return new Document({
    creator: d.header.name,
    title: `${d.header.name} - Resume`,
    styles: { default: { document: { run: { font: ARIAL, size: 20 } } } },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 220 } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },   // US Letter
          margin: { top: 720, right: 864, bottom: 720, left: 864 }, // 0.5"/0.6"
        },
      },
      children,
    }],
  });
}

// ------------------------------------------------------------
const doc = buildDoc(DATA);
Packer.toBuffer(doc).then((buf) => {
  const slug = DATA.header.name.trim().toLowerCase().replace(/\s+/g, "_");
  const outPath = `./${slug}_resume.docx`;
  fs.writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath} (${buf.length} bytes)`);
});
