interface PersonName {
    firstName: string;
    middleName?: string;
    lastName: string;
  }
  
  interface Phone {
    countryCode: number;
    phoneNumber: string;
  }
  
  interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  interface Skills {
    title: string[];
    description: string[];
  }
  
  interface Education {
    degree: string;
    major: string;
    institution: string;
    graduationDate: string;
    cgpa: number;
  }
  
  interface Qualification {
    qualificationType: string;
    qualificationInformation: string[];
  }
  
  interface Experience {
    experienceLevel: string;
    company: Company;
    experienceDateFrom: string;
    experienceDateTill: string;
  }
  
  interface SocialMedia {
    title: string;
    url: string;
  }
  
  interface Project {
    title: string;
    responsibilities: string[];
    technologiesUsed: string[];
    role: string;
    startDate: string;
    endDate: string;
    projectUrl: string;
    gitHubUrl: string;
  }
  
  interface IndustryType {
    industryType: string;
  }
  
  interface Profile {
    profileInfo: string;
    companyAddress: Address;
    contactPhone: Phone;
    contactEmail: {
      emailType: string;
      emailAddress: string;
    };
    website: string;
    industryTypes: IndustryType[];
  }
  
  interface Company {
    companyName: string;
    profile: Profile;
  }
  
  interface Job {
    companyDescription: Company;
    jobTitle: string;
    jobDescription: string;
    jobType: string;
    jobAddress: Address;
    vacancies: number;
    basicPay: {
      minimumPay: number;
      maximumPay: number;
      currency: string;
    };
    functionalArea: string;
    skillsRequired: Skills;
    requiredQualification: Qualification[];
    requiredExperience: Experience[];
    preferredQualifications: string[];
    jobResponsibilities: string[];
    benefits: string[];
    tags: string[];
    workEnvironment: string;
    postingDate: string;
    applicationDeadline: string;
  }
  
  interface Seeker {
    personName: PersonName;
    phone: Phone;
    address: Address;
    skills: Skills;
    education: Education[];
    experience: Experience[];
    dateOfBirth: string;
    qualifications: Qualification[];
    profileSummary: string;
    socialMedias: SocialMedia[];
    interests: string[];
    achievements: string[];
    projects: Project[];
  }
  
  interface ApplicationDate {
    submitDate: string;
    reviewDate: string;
    decisionDate: string;
    comments: string;
  }
  
  interface Status {
    statusName: string;
  }
  
  interface JobApplication {
    id: string,
    seekerId: string;
    seekers: Seeker;
    companyId: string;
    company: Company;
    jobsId: string;
    jobs: Job;
    applicationDate: ApplicationDate;
    status: Status;
  }
  