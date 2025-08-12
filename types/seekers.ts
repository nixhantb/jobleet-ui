
export type SeekerPayload = {
    personName: { firstName: string; middleName: string; lastName: string }
    phone: { countryCode: number; phoneNumber: string }
    address: { street: string; city: string; state: string; postalCode: string; country: string }
    skills: { title: string[]; description: string[] }
    education: { degree: string; major: string; institution: string; graduationDate: string; cgpa: number }[]
    experience: {
      experienceLevel: string
      company: string
      responsibilities: string[]
      experienceDateFrom: string
      experienceDateTill: string
    }[]
    dateOfBirth: string
    qualifications: { qualificationType: string; qualificationInformation: string[] }[]
    profileSummary: string
    socialMedias: { title: string; url: string }[]
    interests: string[]
    achievements: string[]
    projects: {
      title: string
      responsibilities: string[]
      technologiesUsed: string[]
      role: string
      startDate: string
      endDate: string
      projectUrl: string
      gitHubUrl: string
    }[]
  }