export interface Student {
  id: string;
  basicInfo: {
    name: string;
    email: string;
    graduationYear: number;
    branch: string;
    university: string;
    currentSemester: number;
    points: number;
  };
  technicalSkills: {
    programmingLanguages: string[];
    frameworks: string[];
    tools: string[];
  };
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  description: string;
  links: {
    github?: string;
    live?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}