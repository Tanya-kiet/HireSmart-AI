import { mockCandidatesPool1420 } from "./mockCandidates";

export function getCandidateProfileById(id) {
  // 1. Normalize candidate lookup
  let found = mockCandidatesPool1420.find((c) => c.id === id);

  if (!found) {
    const numMatch = id ? id.match(/\d+/) : null;
    const index = numMatch ? parseInt(numMatch[0], 10) : 1;
    found = mockCandidatesPool1420[(index - 1) % mockCandidatesPool1420.length];
  }

  if (!found) {
    found = mockCandidatesPool1420[0];
  }

  const name = found.name;
  const firstName = name.split(" ")[0];
  const role = found.role || found.targetRole || "Senior Lead Frontend Engineer";
  const expYears = found.experienceYears || 6;

  // 2. TRANSPARENT MATHEMATICAL SCORING ENGINE (Weighted Criteria)
  // Required Skills Match (40% weight)
  const skillsScore = Math.min(100, Math.max(60, (found.skills ? found.skills.length * 15 : 85)));

  // Experience Match (25% weight based on 5-year requirement)
  const expScore = Math.min(100, Math.round((expYears / 5) * 85));

  // Education Match (10% weight)
  const eduScore = 95;

  // Projects / Technical Relevance (15% weight)
  const projectsScore = 85;

  // ATS Structure Score (10% weight)
  const atsScore = found.atsScore || 88;

  // Final Weighted Match Score Derivation
  const overallMatch = Math.round(
    skillsScore * 0.40 +
    expScore * 0.25 +
    eduScore * 0.10 +
    projectsScore * 0.15 +
    atsScore * 0.10
  );

  // 3. EXPLAINABLE RECOMMENDATION & RATIONALE
  let recommendation = "Recommended";
  let recommendationReason = "";

  if (overallMatch >= 85) {
    recommendation = "Recommended";
    recommendationReason = `${name} strongly matches the target position criteria with ${expYears} years of hands-on experience in ${role}. Possesses core required skills (${found.skills ? found.skills.slice(0, 3).join(", ") : "React, TypeScript, Node"}). Minor gap in multi-cloud container orchestration.`;
  } else if (overallMatch >= 70) {
    recommendation = "Proceed with Caution";
    recommendationReason = `${name} demonstrates solid core fundamentals, but has minor experience gaps relative to senior team lead benchmarks. Recommended for technical phone screen.`;
  } else {
    recommendation = "Not Recommended";
    recommendationReason = `Candidate skills score (${skillsScore}%) falls below the minimum 75% requirement threshold for this role.`;
  }

  // 4. PIPELINE STATUS & MANDATORY REJECTION REASONS
  const status = found.status || "Interview";
  const rejectionReasonsMap = {
    "cand-6": "Position closed before final interview round.",
    "cand-12": "Candidate declined offer due to commute and relocation constraints.",
    "cand-18": "Salary expectation ($195,000) exceeded approved band ($145,000 - $170,000).",
    "cand-24": "Technical coding assessment score did not meet Senior benchmark.",
  };

  const rejectionReason = status === "Rejected"
    ? rejectionReasonsMap[found.id] || "Position filled by another applicant in final round."
    : null;

  // 5. ATS QUALITY AUDIT CHECKLIST
  const atsChecklist = {
    qualityLabel: atsScore >= 85 ? "Good" : atsScore >= 70 ? "Average" : "Needs Review",
    passed: [
      "Contact information present (email, phone, location verified)",
      `Work experience section complete (${expYears} years documented)`,
      `Skills section present (${found.skills ? found.skills.join(", ") : "React, TypeScript"})`,
      "Education section complete (Bachelor of Science CS)",
    ],
    warnings: [
      "Missing measurable revenue/impact metrics in earlier roles",
      "Missing cloud infrastructure certification badge",
    ],
  };

  // 6. STRENGTHS & MISSING REQUIREMENTS
  const strengths = [
    `${expYears}+ years of direct hands-on experience in ${role}`,
    `Strong proficiency in ${found.skills ? found.skills.slice(0, 3).join(", ") : "React, TypeScript, Node.js"}`,
    "Clean resume structure with 100% OCR parsing compatibility",
    "Bachelor of Science in Computer Science from UC Berkeley",
  ];

  const missingSkills = [
    "Kubernetes Container Orchestration",
    "GraphQL Federated Schema",
    "AWS Solutions Architecture Certification",
  ];

  return {
    ...found,
    id: found.id || id || "cand-1",
    name: found.name,
    avatarBg: found.avatarBg || "bg-blue-600",
    role: role,
    currentCompany: `${firstName} Tech Systems`,
    targetRole: role,
    location: found.location || "San Francisco, CA",
    email: found.email || `${firstName.toLowerCase()}@example.com`,
    phone: found.phone || "+1 (555) 234-5678",
    experienceYears: expYears,
    experience: `${expYears} Years`,
    atsScore,
    matchScore: overallMatch,
    status,
    rejectionReason,
    applicationDate: found.applicationDate || "Jul 15, 2026",
    expectedSalary: "$145,000 - $175,000",
    availability: "2 Weeks Notice",
    recruiter: "Tanya Bhadana",

    summary: `Accomplished ${role} with over ${expYears} years of experience designing, architecting, and scaling enterprise software applications. Expertise in frontend design systems, modern cloud infrastructure, and AI-driven workflow integrations.`,

    recommendation,
    recommendationReason,
    strengths,
    missingSkills,
    atsChecklist,

    // Mathematical Score Breakdown
    scoreBreakdown: {
      overallMatch,
      skillsScore,
      skillsWeight: "40%",
      expScore,
      expWeight: "25%",
      eduScore,
      eduWeight: "10%",
      projectsScore,
      projectsWeight: "15%",
      atsScore,
      atsWeight: "10%",
    },

    // Candidate Assessment (Renamed from AI Analysis)
    candidateAssessment: {
      overallFit: `${name} is a ${recommendation.toLowerCase()} candidate for the ${role} position. Calculated match score is ${overallMatch}%, driven by strong skills alignment (${skillsScore}%) and ${expYears} years of industry experience.`,
      keyStrengths: strengths,
      missingRequirements: missingSkills,
      onboardingNote: "Candidate shows fast learning capability. Recommend 1-week onboarding ramp for internal Kubernetes deployment tooling.",
    },

    portfolioLinks: {
      github: `https://github.com/${firstName.toLowerCase()}-${found.id}`,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${found.id}`,
      portfolio: `https://${firstName.toLowerCase()}dev.io`,
    },

    languages: [
      { name: "English", level: "Native / Fluent" },
      { name: "Spanish", level: "Professional Working" },
    ],

    certifications: [
      { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Issued 2025" },
      { name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", date: "Issued 2024" },
    ],

    skillsGrouped: {
      "Technical Skills": [
        { name: "React 19", level: "Expert", years: `${expYears} yrs`, match: true },
        { name: "TypeScript", level: "Expert", years: `${expYears - 1} yrs`, match: true },
        { name: "JavaScript (ESNext)", level: "Expert", years: `${expYears} yrs`, match: true },
      ],
      "Frameworks & Libraries": [
        { name: "Next.js", level: "Advanced", years: "4 yrs", match: true },
        { name: "Tailwind CSS", level: "Expert", years: "5 yrs", match: true },
        { name: "Node.js", level: "Advanced", years: "4 yrs", match: true },
        { name: "Redux Toolkit", level: "Advanced", years: "4 yrs", match: false },
      ],
      "Databases & Cloud": [
        { name: "PostgreSQL", level: "Advanced", years: "4 yrs", match: true },
        { name: "AWS S3 / EC2", level: "Intermediate", years: "3 yrs", match: true },
        { name: "Docker & Kubernetes", level: "Intermediate", years: "3 yrs", match: false },
      ],
      "Tools & Soft Skills": [
        { name: "Git & GitHub CI", level: "Expert", years: `${expYears} yrs`, match: true },
        { name: "Figma UI Tokens", level: "Advanced", years: "3 yrs", match: true },
        { name: "Agile Leadership", level: "Advanced", years: "4 yrs", match: true },
      ],
    },

    workExperience: [
      {
        company: "Veloce SaaS Systems",
        role: `Lead ${role}`,
        location: "San Francisco, CA",
        period: "2023 - Present",
        responsibilities: [
          "Architected high-throughput micro-frontend design system serving 2M+ active daily users.",
          "Reduced application initial bundle load time by 42% using dynamic route code splitting.",
          "Mentored junior developers and instituted automated CI code coverage standards.",
        ],
        technologies: found.skills || ["React 19", "TypeScript", "Tailwind CSS", "GraphQL"],
      },
      {
        company: "Apex Digital Labs",
        role: `Senior ${role}`,
        location: "Austin, TX",
        period: "2020 - 2023",
        responsibilities: [
          "Developed core REST API endpoints and state management architecture.",
          "Engineered real-time candidate search index integration.",
        ],
        technologies: ["Node.js", "PostgreSQL", "React", "Docker"],
      },
    ],

    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        period: "2016 - 2020",
        grade: "3.85 GPA • Magna Cum Laude",
        courses: "Data Structures, Algorithms, Distributed Systems, Software Engineering",
      },
    ],

    projects: [
      {
        title: "Enterprise Design System UI Token Kit",
        description: "Open-source Tailwind CSS component library with accessible WCAG AAA keyboard navigation.",
        tech: ["React 19", "Tailwind CSS", "TypeScript", "Storybook"],
        link: "https://github.com/example/design-tokens",
      },
      {
        title: "Real-time Vector Embedding Match Engine",
        description: "FastAPI microservice computing cosine similarity against candidate resume vectors.",
        tech: ["Python", "PyTorch", "FastAPI", "Pinecone"],
        link: "https://github.com/example/vector-engine",
      },
    ],

    recruiterNotes: "Strong candidate with clear communication and deep architectural knowledge. Recommended for technical round.",

    recruiterNotesList: [
      {
        id: "note-1",
        author: "Tanya Bhadana",
        role: "Senior Recruiter",
        date: "Jul 20, 2026",
        text: "Completed initial recruiter phone screen. Candidate was articulate, enthusiastic about HireSmart AI product vision, and demonstrated deep React 19 knowledge.",
      },
    ],

    lifecycleTimeline: [
      { stage: "Applied", date: "Jul 15, 2026", status: "completed", note: "Application submitted via online portal" },
      { stage: "Resume Parsed", date: "Jul 15, 2026", status: "completed", note: "OCR embedding score 94%" },
      { stage: "Screened", date: "Jul 18, 2026", status: "completed", note: "Recruiter phone screen passed" },
      { stage: "Shortlisted", date: "Jul 19, 2026", status: "completed", note: "Approved by Hiring Manager" },
      { stage: "Interview Scheduled", date: "Jul 22, 2026", status: "current", note: "Technical Deep-Dive Round" },
      { stage: "Interview Completed", date: "Pending", status: "upcoming", note: "Feedback pending" },
      { stage: "Offer Sent", date: "Pending", status: "upcoming", note: "Executive sign-off" },
      { stage: "Offer Accepted", date: "Pending", status: "upcoming", note: "Hiring complete" },
    ],

    resumeText: `CONFIDENTIAL CANDIDATE DOSSIER
Name: ${name}
Target Position: ${role}
Email: ${found.email} | Phone: ${found.phone || "+1 (555) 234-5678"}

SUMMARY:
Accomplished ${role} with over ${expYears} years of experience designing and building scalable cloud applications.

EXPERIENCE:
Lead Developer — Veloce SaaS Systems (2023 - Present)
- Architected enterprise React 19 micro-frontend design system.
- Optimized bundle sizes and real-time data synchronization.

Senior Engineer — Apex Digital Labs (2020 - 2023)
- Built high-performance REST APIs and real-time backend integrations.

EDUCATION:
B.S. in Computer Science — UC Berkeley (3.85 GPA)
`,
  };
}
