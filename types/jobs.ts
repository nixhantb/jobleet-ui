export type Job = {
  companyDescription: {
    companyName: string
    profile: {
      profileInfo: string
      companyAddress: {
        street: string
        city: string
        state: string
        postalCode: string
        country: string
        id: string
      }
      contactPhone: {
        countryCode: number
        phoneNumber: string
        id: string
      }
      contactEmail: {
        emailType: string
        emailAddress: string
        id: string
      }
      website: string
      industryType: string | null
      id: string
    }
    id: string
  }
  jobTitle: string
  jobDescription: string
  jobType: string
  jobAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
    id: string
  }
  vacancies: number
  basicPay: {
    minmumPay: number | null
    maximumPay: number
    currency: string
  }
  functionalArea: string
  skillsRequired: {
    title: string[]
    description: string[]
    id: string
  }
  requiredQualification: {
    qualificationType: string
    qualificationInformation: string[]
    id: string | null
  }
  requiredExperience: {
    experienceLevel: string
    companyModel: string | null
    experienceDateFrom: string
    experienceDateTill: string
    id: string | null
  }
  preferredQualifications: string[]
  jobResponsibilities: string[]
  benefits: string[]
  tags: string[]
  workEnvironment: string
  postingDate: string
  applicationDeadline: string
  id: string
};

export type JobListing = {
  Image: string;
  keySkills: string[];
  companyDescription: {
    companyName: string;
    profile: {
      profileInfo: string;
      companyAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        id: string;
      };
      contactPhone: {
        countryCode: number;
        phoneNumber: string;
        id: string;
      };
      contactEmail: {
        emailType: string;
        emailAddress: string;
        id: string;
      };
      website: string;
      industryType: string | null;
      id: string;
    };
    id: string;
  };
  jobTitle: string;
  jobDescription: string;
  jobType: string;
  jobAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    id: string;
  };
  vacancies: number;
  basicPay: {
    minmumPay: number | null;
    maximumPay: number;
    currency: string;
  };
  functionalArea: string;
  skillsRequired: {
    title: string[];
    description: string[];
    id: string;
  };
  requiredQualification: {
    qualificationType: string;
    qualificationInformation: string[];
    id: string;
  };
  requiredExperience: {
    experienceLevel: string;
    companyModel: null;
    experienceDateFrom: string;
    experienceDateTill: string;
    id: string;
  };
  preferredQualifications: string[];
  jobResponsibilities: string[];
  benefits: string[];
  tags: string[];
  workEnvironment: string;
  postingDate: string;
  applicationDeadline: string;
  id: string;
};
