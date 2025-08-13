
export type Education = {
  degree: string
  major: string
  institution: string
  graduationDate: string
  cgpa: number
}

export type Experience = {
  experienceLevel: string
  company: string
  responsibilities: string[]
  experienceDateFrom: string
  experienceDateTill: string
}

export type Qualification = {
  qualificationType: string
  qualificationInformation: string[]
}

export type Social = {
  title: string
  url: string
}

export type Project = {
  title: string
  responsibilities: string[]
  technologiesUsed: string[]
  role: string
  startDate: string
  endDate: string
  projectUrl: string
  gitHubUrl: string
}

export type FormValues = {
  personName: { firstName: string; middleName: string; lastName: string }
  phone: { countryCode: number; phoneNumber: string }
  dateOfBirth: string
  address: { street: string; city: string; state: string; postalCode: string; country: string }
  skills: { title: string[]; description: string[] }
  education: Education[]
  experience: Experience[]
  qualifications: Qualification[]
  profileSummary: string
  socialMedias: Social[]
  interests: string[]
  achievements: string[]
  projects: Project[]
};