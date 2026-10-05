import {
  Experience,
  SkillCategory,
  Achievement,
  Certification,
  Education,
} from './types';

// All site content lives here. Edit this file to update the portfolio.
export const RESUME_DATA = {
  lastUpdated: 'October 2026',
  personal: {
    name: 'Satnam Singh',
    email: 'probotisop@gmail.com',
    role: 'Applied Data Analytics Student · Backend & Security Engineer',
    location: 'Mississauga, Ontario, Canada',
    summary:
      "I'm currently studying Applied Data Analytics at Sheridan College (Mississauga). Before that I spent 3+ years as a backend developer working on Java, Spring Boot, Python, Adobe AEM and DevOps, plus security work such as pentesting and vulnerability research. These days I'm combining that engineering background with data analytics, cloud and AI-driven workflows.",
    links: {
      linkedin: 'https://www.linkedin.com/in/satnams/',
      github: 'https://github.com/ProbotisOP',
    },
    // File lives in /public. Replace public/RESUME_SATNAM.pdf to update it.
    resume: 'RESUME_SATNAM.pdf',
  },
  education: [
    {
      degree: 'Applied Data Analytics',
      school: 'Sheridan College, Mississauga, ON',
      year: 'Currently enrolled',
    },
    {
      degree: 'Bachelor of Computer Applications',
      school: 'Sant Baba Bhag Singh University',
      year: 'Sep 2021',
      note: 'GPA 8.7',
    },
  ] as Education[],
  experience: [
    {
      company: 'Adobe (Client Side)',
      role: 'Software Developer',
      period: 'Jan 2023 – Dec 2025',
      highlights: [
        'Led cross-platform delivery of AEM Screens Player for 5+ major customers.',
        'Shipped builds for SG Pools & WMATA, securing deals worth >$3M.',
        'Deployed AI agentic workflow with MCP servers: reduced security triage from 2–3 days to <10 mins (95% reduction).',
        'Achieved 2x scaling for existing customers & reduced blank screen events.',
        'Engineered functionalities for Tizen, Windows, ChromeOS, and Android.',
      ],
    },
    {
      company: 'Hughes Systique Corp (HSC)',
      role: 'Engineer – Java Developer',
      period: 'Jun 2022 – Dec 2022',
      highlights: [
        'Architected CRUD APIs using Spring Boot.',
        'Optimized server configs for High Availability (HA) & Fault Tolerance.',
        'Designed CI/CD pipeline reducing deployment times by 60%.',
        'Enhanced UI responsiveness with ReactJS.',
      ],
    },
    {
      company: 'Genpact',
      role: 'Senior Associate',
      period: 'Nov 2021 – Jun 2022',
      highlights: [
        'Developed RESTful microservices for enterprise projects.',
        'Collaborated on API design and testing under agile workflows.',
        'Gained exposure to Cloud platforms and CI/CD pipelines.',
      ],
    },
  ] as Experience[],
  certifications: [
    {
      name: 'CompTIA Security+ ce',
      issuer: 'CompTIA',
      url: 'https://www.credly.com/badges/593de3cc-8f61-44ea-a753-a63bacb92892/public_url',
    },
    {
      name: 'AWS Academy Graduate – Cloud Foundations',
      issuer: 'Amazon Web Services',
      url: 'https://www.credly.com/badges/f47ec0c9-90bc-4cd6-8ad4-f7aa74f2d76f/public_url',
    },
    {
      name: 'Cyber Attack Countermeasures',
      issuer: 'NYU',
    },
  ] as Certification[],
  skills: [
    {
      category: 'Data & Analytics',
      items: ['Power BI', 'Excel', 'SQL', 'Python'],
    },
    {
      category: 'Languages',
      items: ['Java', 'JavaScript', 'Python', 'React', 'Node.js', 'HTML5'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS (S3, EC2, Lambda)', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD'],
    },
    {
      category: 'Security Tools',
      items: ['Burp Suite', 'OWASP ZAP', 'Metasploit', 'Nessus', 'Ghidra'],
    },
    {
      category: 'Databases',
      items: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
  ] as SkillCategory[],
  security: {
    hallOfFame: [
      'Cisco Vulnerability Disclosure Program',
      'Lacework Vulnerability Disclosure Program',
    ],
    achievements: [
      {
        title: 'Vulnerability Disclosure',
        description:
          'Identified a critical payment bypass vulnerability at CaratLane (Tanishq Partnership).',
      },
      {
        title: 'Published Author',
        description: "Published book: 'Approach to Real World Hacking' (2020).",
      },
      {
        title: 'Competitive Coding',
        description: 'College-level medalist in C programming & coding challenges.',
      },
    ] as Achievement[],
  },
};