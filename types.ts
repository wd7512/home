export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  details: string;
  period: string;
  achievements: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  links?: { label: string; url: string }[];
  year: string;
}

export interface PublicationItem {
  title: string;
  authors: string;
  venue: string;
  date: string;
  link?: string;
  status?: 'Published' | 'Pending';
}

export interface SkillCategory {
  name: string;
  skills: string[];
}