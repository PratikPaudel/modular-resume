// types/resume.ts

export interface PersonalInfo {
    name: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  }
  
  export interface EducationEntry {
    school: string;
    degree: string;
    dates: string;
    gpa: string;
    achievements: string;
  }
  
  export interface ExperienceEntry {
    company: string;
    position: string;
    location: string;
    dates: string;
    bullets: string[];
  }
  
  export interface ProjectEntry {
    name: string;
    dates: string;
    description: string;
  }
  
  export interface Skills {
    programming: string;
    tools: string;
    other: string;
  }
  
  export interface LeadershipEntry {
    role: string;
    items: string[];
  }
  
  export interface ResumeData {
    personalInfo: PersonalInfo;
    education: EducationEntry[];
    experience: ExperienceEntry[];
    projects: ProjectEntry[];
    skills: Skills;
    leadership: LeadershipEntry[];
  }