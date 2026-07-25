// Helper function to generate a realistic enterprise ATS candidate pool of 1,420 candidates
const firstNames = [
  "Sarah", "Marcus", "Elena", "David", "Aisha", "Jonathan", "Rachel", "Michael",
  "Sophia", "Liam", "Chloe", "Vikram", "Hannah", "Ethan", "Isabella", "Alex",
  "Benjamin", "Camila", "Daniel", "Emily", "Gabriel", "Hailey", "Isaac", "Jessica",
  "Kevin", "Laura", "Matthew", "Natalie", "Oliver", "Penelope", "Quinn", "Ryan"
];

const lastNames = [
  "Chen", "Vance", "Rostova", "Kim", "Patel", "Hayes", "Zhang", "Brown",
  "Martinez", "O'Connor", "Dubois", "Malhotra", "Abbot", "Wright", "Rossi", "Mercer",
  "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Clark",
  "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott"
];

const roles = [
  "Senior Lead Frontend Engineer",
  "Staff Frontend Architect",
  "ML & AI Research Scientist",
  "Senior DevOps Cloud Engineer",
  "Fullstack React & Node Specialist",
  "Senior Product Manager",
  "Staff Data Engineer",
  "Principal UI/UX Designer",
  "Backend Python/FastAPI Engineer",
  "Cybersecurity Infrastructure Architect"
];

const locationsList = [
  "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA",
  "Chicago, IL", "Boston, MA", "Los Angeles, CA", "Denver, CO",
  "Miami, FL", "San Diego, CA", "Remote (US)", "Toronto, ON"
];

const skillsPool = [
  ["React 19", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "GraphQL"],
  ["Python", "PyTorch", "LLMs", "LangChain", "Vector DBs", "FastAPI"],
  ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "HCI"],
  ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Prometheus"],
  ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Microservices"],
  ["Node.js", "Express", "React", "MongoDB", "JavaScript", "REST APIs"],
  ["Python", "SQL", "Pandas", "Scikit-Learn", "Tableau", "PowerBI"],
  ["Product Strategy", "Agile/Scrum", "Jira", "Data Analytics", "Roadmapping"]
];

const avatarBgs = [
  "bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-amber-600",
  "bg-teal-600", "bg-indigo-600", "bg-rose-600", "bg-cyan-600"
];

const statusesList = ["Interview", "Screened", "Shortlisted", "New", "Hired", "Rejected"];

export function generateCandidatePool(count = 1420) {
  const pool = [];

  for (let i = 1; i <= count; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const name = `${fn} ${ln}`;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`;
    const role = roles[i % roles.length];
    const location = locationsList[i % locationsList.length];
    const skills = skillsPool[i % skillsPool.length];
    const avatarBg = avatarBgs[i % avatarBgs.length];
    const status = statusesList[i % statusesList.length];

    // Calculated scores
    const atsScore = 65 + ((i * 17) % 33); // 65 to 97
    const matchScore = 60 + ((i * 13) % 38); // 60 to 97
    const expYears = 2 + ((i * 5) % 11); // 2 to 12 years

    // Application date
    const day = (i % 28) + 1;
    const dateStr = `Jul ${day < 10 ? "0" + day : day}, 2026`;

    pool.push({
      id: `cand-${i}`,
      name,
      email,
      phone: `+1 (555) ${100 + (i % 899)}-${1000 + (i % 8999)}`,
      location,
      role,
      targetRole: role,
      experienceYears: expYears,
      experience: `${expYears} Years`,
      atsScore,
      matchScore,
      status,
      applicationDate: dateStr,
      uploadedDate: dateStr,
      skills,
      avatarBg,
      recommendation: matchScore >= 88 ? "Strong Hire" : matchScore >= 75 ? "Good Fit" : "Needs Review",
    });
  }

  return pool;
}

export const mockCandidatesPool1420 = generateCandidatePool(1420);
