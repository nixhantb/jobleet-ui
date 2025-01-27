export interface PersonNameModel {
  firstName: string, 
  middleName: string, 
  lastName: string, 
  id: string
}
export interface Phone {
  countryCode: number;
  phoneNumber: string;
  id: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  id: string;
}

export interface Skills {
  title: string[];
  description: string[];
  id: string;
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  graduationDate: string;
  cgpa: number;
  id: string;
}

export interface Experience {
  experienceLevel: string;
  companyModel: CompanyModel;
  id: string;
}

export interface CompanyModel {
  companyName: string;
  profile: CompanyProfile;
  id: string;
}

export interface CompanyProfile {
  profileInfo: string;
  companyAddress: Address;
  contactPhone: Phone;
  contactEmail: ContactEmail;
  website: string;
  industryType: IndustryType;
  id: string;
}

export interface ContactEmail {
  emailType: string;
  emailAddress: string;
  id: string;
}

export interface IndustryType {
  industryType: string;
  id: string;
}

export interface Qualifications {
  qualificationType: string;
  qualificationInformation: string[];
  id: string;
}

export interface SocialMedia {
  title: string;
  url: string;
  id: string;
}

export interface Projects {
  id: string;
  title: string;
  role: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  responsibilities: string[];
  technologiesUsed: string[];
  projectUrl: string;
  gitHubUrl: string;
}


export interface UserProfile {
  personNameModel: PersonNameModel,
  phone: Phone;
  address: Address;
  skills: Skills;
  education: Education;
  experience: Experience;
  dateOfBirth: string;
  qualifications: Qualifications;
  profileSummary: string;
  projects: Projects;
  interests: string[];
  achievements: string[];
  socialMedias: SocialMedia[];
  id: string;
}
