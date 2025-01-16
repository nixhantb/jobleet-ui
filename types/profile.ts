
  
  export interface Phone {
    countryCode: number;
    phoneNumber: string;
  }
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  export interface Skills {
  
    title: string[];
    description: string[];
  }
  
  export interface Education {
    degree: string;
    major: string;
    institution: string;
    graduationDate: string;
    cgpa: number;
  }
  
  export interface Experience {
    experienceLevel: string;
  }
  
  export interface Qualifications {
    qualificationType: string;
    qualificationInformation: string[];
  }
  
  export interface UserProfile {
    phone: Phone;
    address: Address;
    skills: Skills;
    education: Education;
    experience: Experience;
    dateOfBirth: string;
    qualifications: Qualifications;
    profileSummary: string;
    linkedInProfile: string;
    portfolio: string;
    interests: string[];
    achievements: string[];
  }