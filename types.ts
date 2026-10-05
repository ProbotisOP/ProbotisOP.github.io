export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  url?: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  note?: string;
}
