export const mockCandidateProfile = {
  id: "cand-1",
  name: "Sarah Chen",
  role: "Senior Lead Frontend Engineer",
  email: "sarah.chen@example.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  experience: "6+ Years",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop",
  category: "Software Engineering",
  stage: "Interview Scheduled",
  recommendation: "Strong Hire",
  linkedinUrl: "https://linkedin.com/in/sarah-chen-demo",
  githubUrl: "https://github.com/sarah-chen-demo",
  portfolioUrl: "https://sarahchen.dev",
  summary:
    "Senior Lead Frontend Engineer with 6+ years of experience architecting high-performance React micro-frontends, design systems, and TypeScript web applications. Proven track record of reducing bundle load times by 40% and leading cross-functional teams of 6+ engineers in fast-growing SaaS environments.",

  // Overall Match & Scores Breakdown
  scores: {
    overallMatch: 94,
    atsScore: 96,
    skillScore: 92,
    experienceScore: 95,
    educationScore: 90,
    confidence: "High (95%)",
  },

  // Categorized Skills with Hover Details
  skillsGrouped: {
    Frontend: [
      { name: "React 19", level: 96, yearsUsed: 6, confidence: "98% (Expert)", projectReferences: ["Acme Cloud Micro-frontend", "HireSmart Design System"] },
      { name: "TypeScript", level: 94, yearsUsed: 5, confidence: "95% (Expert)", projectReferences: ["TechScale Enterprise Portal", "Acme Core Dashboard"] },
      { name: "Next.js", level: 90, yearsUsed: 4, confidence: "92% (Advanced)", projectReferences: ["SaaS Recruitment Engine", "Marketing Web Apps"] },
      { name: "Tailwind CSS", level: 95, yearsUsed: 4, confidence: "96% (Expert)", projectReferences: ["Acme Design System", "HireSmart UI"] },
      { name: "Redux / Zustand", level: 88, yearsUsed: 5, confidence: "90% (Advanced)", projectReferences: ["State Sync Framework"] },
    ],
    Backend: [
      { name: "Python", level: 85, yearsUsed: 3, confidence: "86% (Proficient)", projectReferences: ["FastAPI Microservices", "Data Scraping Pipelines"] },
      { name: "FastAPI", level: 82, yearsUsed: 3, confidence: "84% (Proficient)", projectReferences: ["Recruitment Analytics API"] },
      { name: "Node.js", level: 78, yearsUsed: 3, confidence: "80% (Intermediate)", projectReferences: ["BFF Gateways"] },
    ],
    Database: [
      { name: "PostgreSQL", level: 86, yearsUsed: 4, confidence: "88% (Advanced)", projectReferences: ["Acme Multi-tenant DB"] },
      { name: "Redis", level: 80, yearsUsed: 3, confidence: "82% (Proficient)", projectReferences: ["Session & Cache Layer"] },
    ],
    Cloud: [
      { name: "AWS S3 / CloudFront", level: 75, yearsUsed: 3, confidence: "78% (Intermediate)", projectReferences: ["Static Asset CDN Hosting"] },
    ],
    DevOps: [
      { name: "Docker", level: 78, yearsUsed: 3, confidence: "80% (Intermediate)", projectReferences: ["CI/CD Build Containers"] },
      { name: "GitHub Actions", level: 85, yearsUsed: 4, confidence: "88% (Advanced)", projectReferences: ["Automated Release Pipelines"] },
    ],
    "AI / ML": [
      { name: "OpenAI API", level: 75, yearsUsed: 1.5, confidence: "76% (Intermediate)", projectReferences: ["AI Candidate Summarizer"] },
      { name: "Vector Embeddings", level: 70, yearsUsed: 1, confidence: "72% (Intermediate)", projectReferences: ["Semantic Search POC"] },
    ],
    Tools: [
      { name: "Figma", level: 90, yearsUsed: 5, confidence: "92% (Advanced)", projectReferences: ["UI/UX Tokens & Mockups"] },
      { name: "Jest / Playwright", level: 86, yearsUsed: 4, confidence: "88% (Advanced)", projectReferences: ["E2E Test Suites"] },
      { name: "Git", level: 95, yearsUsed: 6, confidence: "98% (Expert)", projectReferences: ["Monorepo Workflows"] },
    ],
    "Soft Skills": [
      { name: "Engineering Leadership", level: 90, yearsUsed: 3, confidence: "92% (Advanced)", projectReferences: ["Mentored 6 Engineers"] },
      { name: "Cross-Functional Sync", level: 92, yearsUsed: 5, confidence: "94% (Expert)", projectReferences: ["Product & Design Alignment"] },
      { name: "Technical Communication", level: 95, yearsUsed: 6, confidence: "96% (Expert)", projectReferences: ["Architecture Specs"] },
    ],
  },

  // Candidate Intelligence (AI Insights with WHY explanations)
  candidateIntelligence: {
    strengths: [
      {
        title: "Strong React & Frontend Architecture",
        explanation: "Demonstrated across three production projects, including architecting a React 19 micro-frontend that improved page load latency by 40%.",
      },
      {
        title: "Design System & UI Token Mastery",
        explanation: "Spearheaded enterprise component libraries with Tailwind CSS and Accessibility (WCAG AAA) compliance.",
      },
      {
        title: "Proven Engineering Leadership",
        explanation: "Led and mentored a team of 6 engineers while maintaining direct hands-on code contribution.",
      },
    ],
    weaknesses: [
      {
        title: "Limited Kubernetes & Infra Experience",
        explanation: "While proficient with Docker containers, candidate has not managed Kubernetes operators or complex Helm deployments in production.",
      },
      {
        title: "Secondary Backend Focus",
        explanation: "Backend experience is primarily Python FastAPI for API aggregation rather than complex distributed systems.",
      },
    ],
    missingSkills: [
      {
        title: "Kubernetes / Helm",
        explanation: "Required for senior infrastructure management, though candidate shows strong Docker foundation.",
      },
      {
        title: "GraphQL Federation",
        explanation: "Job description mentions schema stitching, whereas candidate primarily uses REST and standard OpenAPI endpoints.",
      },
    ],
    careerHighlights: [
      {
        title: "40% Latency Reduction at Acme Cloud",
        explanation: "Redesigned asset delivery and code-splitting pipelines for enterprise SaaS dashboard.",
      },
      {
        title: "1st Place Winner - Stanford AI Hackathon 2021",
        explanation: "Built an intelligent document processing tool using early transformer models.",
      },
    ],
    riskFactors: [
      {
        title: "Competing Offers Potential",
        explanation: "Candidate is actively interviewing in top-tier tech hubs and holds high market demand.",
      },
      {
        title: "30-Day Notice Period",
        explanation: "Current employment contract requires 30 days notice prior to official onboarding date.",
      },
    ],
    learningAbility: [
      {
        title: "Rapid Stack Adoption",
        explanation: "Transitioned from pure React to Fullstack Python FastAPI within 4 months to support backend API initiatives.",
      },
    ],
    roleFit: [
      {
        title: "94% Alignment with Lead Frontend Role",
        explanation: "Directly matches required experience, React/TypeScript mastery, and team leadership expectations.",
      },
    ],
    cultureFit: [
      {
        title: "High Ownership & Mentorship Orientation",
        explanation: "Interview responses reflect collaborative, feedback-driven ethos with focus on mentoring junior engineers.",
      },
    ],
  },

  // Match Analysis (Resume vs Job Description Diff)
  matchAnalysis: {
    jobTitle: "Senior Lead Frontend Engineer",
    department: "Core Engineering",
    overallScore: 94,
    comparison: [
      {
        category: "Matched Skills",
        resume: "React 19, TypeScript, Next.js, Tailwind CSS, Redux, Jest",
        jobDescription: "React 18+, TypeScript, Next.js, Modern CSS, Automated Testing",
        status: "match",
        detail: "Complete overlap on primary frontend technology stack requirements.",
      },
      {
        category: "Missing / Gaps",
        resume: "Basic AWS S3, Docker containers only",
        jobDescription: "Kubernetes operators, AWS CloudNative Serverless, GraphQL",
        status: "warning",
        detail: "Candidate lacks deep Kubernetes production deployment experience.",
      },
      {
        category: "Relevant Experience",
        resume: "6+ Years (3 years Lead, 3 years Fullstack)",
        jobDescription: "5+ Years Senior Frontend Engineering experience",
        status: "match",
        detail: "Exceeds minimum experience requirement by 1.5 years.",
      },
      {
        category: "Education Match",
        resume: "B.S. in Computer Science, Stanford University (Honors 3.9)",
        jobDescription: "B.S. in Computer Science or equivalent quantitative field",
        status: "match",
        detail: "Top-tier institution degree with relevant CS specialization.",
      },
      {
        category: "Keyword Overlap",
        resume: "92% overlap (Micro-frontends, Component Library, State Mgmt)",
        jobDescription: "Target keywords present in 18 out of 20 core skill tags",
        status: "match",
        detail: "High semantic relevance across resume experience points.",
      },
      {
        category: "Semantic Match",
        resume: "High similarity score (0.94 cosine vector similarity)",
        jobDescription: "Senior Frontend Lead vector embeddings profile",
        status: "match",
        detail: "Vector embedding model confirms top 5% candidate alignment.",
      },
    ],
  },

  // Experience Timeline
  workExperience: [
    {
      period: "2023 - Present",
      role: "Senior Lead Frontend Engineer",
      company: "Acme Cloud SaaS",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      achievements: [
        "Architected modern React 19 micro-frontend applications with 40% page load latency improvement.",
        "Led and mentored a high-performing team of 6 software engineers across design system and core platform initiatives.",
        "Optimized Docker container build pipelines for automated CI/CD deployments on GitHub Actions.",
      ],
    },
    {
      period: "2020 - 2023",
      role: "Fullstack Software Engineer",
      company: "TechScale Innovations",
      location: "San Francisco, CA",
      type: "Full-time",
      achievements: [
        "Developed RESTful Python FastAPI endpoints and integrated Next.js dashboards for enterprise recruitment analytics.",
        "Created reusable TypeScript component library adopted across 4 internal product suites.",
        "Reduced web app memory leaks by 25% through virtualized table rendering and DOM optimization.",
      ],
    },
    {
      period: "2019 - 2020",
      role: "Junior Frontend Developer",
      company: "WebCraft Solutions",
      location: "Palo Alto, CA",
      type: "Full-time",
      achievements: [
        "Built interactive client dashboards using React, Redux, and REST APIs.",
        "Implemented responsive UI mockups from Figma designs with 100% pixel-perfect accuracy.",
      ],
    },
  ],

  // Projects
  projects: [
    {
      title: "Enterprise Micro-Frontend Architecture",
      link: "https://github.com/sarah-chen-demo/micro-frontend-demo",
      tech: ["React 19", "TypeScript", "Webpack Module Federation", "Tailwind CSS"],
      description: "Scalable monorepo architecture decoupling large monolithic frontend into independently deployable micro-apps.",
    },
    {
      title: "HireSmart UI Component Library",
      link: "https://sarahchen.dev/design-system",
      tech: ["React", "Tailwind CSS", "Storybook", "WCAG AAA"],
      description: "Accessible design system containing 45+ headless UI components with dark mode and high-contrast support.",
    },
    {
      title: "FastAPI Recruitment Analytics Engine",
      link: "https://github.com/sarah-chen-demo/recruitment-analytics",
      tech: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      description: "High-throughput API gateway processing candidate resume metadata and generating realtime metrics.",
    },
  ],

  // Education
  education: [
    {
      degree: "B.S. in Computer Science (Honors)",
      institution: "Stanford University",
      period: "2018 - 2022",
      grade: "GPA: 3.9 / 4.0",
      details: "Focus on Artificial Intelligence, Web Systems, and Human-Computer Interaction. Member of Tau Beta Pi Honor Society.",
    },
  ],

  // Certifications
  certifications: [
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: "Issued Nov 2024 · Expires Nov 2027",
      credentialId: "AWS-DEV-984210",
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "Issued Aug 2022",
      credentialId: "META-FE-55412",
    },
  ],

  // Languages
  languages: [
    { name: "English", level: "Native / Fluent" },
    { name: "Mandarin Chinese", level: "Professional Working Proficiency" },
    { name: "Spanish", level: "Elementary Proficiency" },
  ],

  // Full Resume Raw Text for Preview
  resumeText: `SARAH CHEN
Senior Lead Frontend Engineer
Email: sarah.chen@example.com | Phone: +1 (555) 234-5678 | San Francisco, CA
LinkedIn: linkedin.com/in/sarah-chen-demo | Portfolio: sarahchen.dev | GitHub: github.com/sarah-chen-demo

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Senior Lead Frontend Engineer with 6+ years of experience architecting high-performance React micro-frontends, design systems, and TypeScript web applications. Proven track record of reducing bundle load times by 40% and leading cross-functional teams of 6+ engineers in fast-growing SaaS environments.

================================================================================
TECHNICAL SKILLS
================================================================================
- Frontend: React 19, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, Zustand, HTML5, CSS3/SASS, Webpack, Vite
- Backend & DB: Python, FastAPI, Node.js, Express, PostgreSQL, Redis, REST APIs
- DevOps & Tools: Docker, Git, GitHub Actions, AWS S3/CloudFront, Jest, Playwright, Figma, Storybook

================================================================================
WORK EXPERIENCE
================================================================================
Senior Lead Frontend Engineer | Acme Cloud SaaS | San Francisco, CA | 2023 - Present
- Architected modern React 19 micro-frontend applications serving 500k+ monthly active users, yielding a 40% reduction in initial bundle load latency.
- Mentored a engineering squad of 6 frontend developers, establishing standardized code review pipelines, WCAG AAA accessibility rules, and TypeScript strict modes.
- Managed automated build and containerization workflows using Docker and GitHub Actions, lowering CI deploy times from 18m to 6m.

Fullstack Software Engineer | TechScale Innovations | San Francisco, CA | 2020 - 2023
- Built RESTful Python FastAPI endpoints and integrated Next.js dashboards for enterprise recruitment analytics processing 10k candidate records daily.
- Created reusable TypeScript component library adopted across 4 internal product suites, accelerating team development velocity by 30%.
- Refactored legacy React state management to Redux Toolkit and Zustand, resolving long-standing DOM memory leak bugs.

================================================================================
EDUCATION & CERTIFICATIONS
================================================================================
- B.S. in Computer Science (Honors, GPA 3.9/4.0) - Stanford University (2018 - 2022)
- AWS Certified Developer – Associate (2024 - 2027)
- Meta Front-End Developer Professional Certificate (2022)`,

  // Candidate Lifecycle Vertical Timeline (9 Stages)
  lifecycleTimeline: [
    { stage: "Resume Uploaded", date: "Jul 20, 2026", time: "09:15 AM", user: "Recruiter Portal (Upload)", status: "completed" },
    { stage: "Resume Parsed", date: "Jul 20, 2026", time: "09:16 AM", user: "AI Parsing Engine v3.2", status: "completed" },
    { stage: "Screened", date: "Jul 20, 2026", time: "11:30 AM", user: "Alex Mercer (Tech Lead)", status: "completed" },
    { stage: "Matched", date: "Jul 21, 2026", time: "02:45 PM", user: "HireSmart Vector Engine", status: "completed" },
    { stage: "Shortlisted", date: "Jul 21, 2026", time: "04:10 PM", user: "Tanya Bhadana (Sr Recruiter)", status: "completed" },
    { stage: "Interview Scheduled", date: "Jul 22, 2026", time: "10:00 AM", user: "System Scheduler", status: "current" },
    { stage: "Interview Completed", date: "Jul 24, 2026", time: "03:30 PM", user: "David Miller (Engineering Manager)", status: "pending" },
    { stage: "Offer Sent", date: "Pending", time: "--", user: "Talent Acquisition", status: "pending" },
    { stage: "Offer Accepted", date: "Pending", time: "--", user: "Candidate", status: "pending" },
  ],

  // Interviews Section
  interviews: {
    averageRating: 4.9,
    totalRounds: 2,
    upcoming: [
      {
        id: "int-101",
        round: "Culture & Leadership Fit",
        interviewer: "Sarah Jenkins (VP of People)",
        date: "Jul 28, 2026",
        time: "02:00 PM PST",
        meetingLink: "https://meet.google.com/abc-defg-hij",
        status: "Scheduled",
      },
    ],
    past: [
      {
        id: "int-100",
        round: "System Design & Architecture",
        interviewer: "David Miller (Engineering Manager)",
        date: "Jul 24, 2026",
        rating: 5,
        status: "Completed",
        recommendation: "Strong Hire",
        notes: "Outstanding explanation of micro-frontend isolation and module federation. Communicated trade-offs with great clarity.",
      },
      {
        id: "int-99",
        round: "Technical Coding Round 1",
        interviewer: "Alex Mercer (Tech Lead)",
        date: "Jul 22, 2026",
        rating: 4.8,
        status: "Completed",
        recommendation: "Strong Hire",
        notes: "Clean TypeScript code implementation, optimal DOM rendering strategy, excellent grasp of async custom hooks.",
      },
    ],
  },

  // Recruiter Notes List
  recruiterNotesList: [
    {
      id: "note-1",
      author: "Tanya Bhadana",
      role: "Senior Recruiter",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      timestamp: "Jul 24, 2026 · 04:15 PM",
      content: "Candidate passed System Design round with glowing reviews from David. Expressed high interest in leading our new design system squad. Target compensation is $155k base + equity.",
      pinned: true,
    },
    {
      id: "note-2",
      author: "Alex Mercer",
      role: "Tech Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      timestamp: "Jul 22, 2026 · 11:45 AM",
      content: "Top tier React candidate. Strong knowledge of Web Vitals and bundler internals. Recommended proceeding immediately to Culture round.",
      pinned: false,
    },
  ],

  // Salary & Admin Details
  meta: {
    salaryRange: "$145,000 - $160,000 / yr",
    noticePeriod: "30 Days",
    attritionRisk: "Low (8%)",
    authenticityScore: "98% Verified",
  },
};
