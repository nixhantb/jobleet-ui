import { FormValues } from "@/types/seekers";

export function getDefaultValues(): FormValues {
    return {
      personName: { firstName: "", middleName: "", lastName: "" },
      phone: { countryCode: 0, phoneNumber: "" },
      dateOfBirth: "",
      address: { street: "", city: "", state: "", postalCode: "", country: "" },
      skills: { title: [], description: [] },
      education: [{ degree: "", major: "", institution: "", graduationDate: "", cgpa: 0 }],
      experience: [
        {
          experienceLevel: "EntryLevel",
          company: "",
          responsibilities: [],
          experienceDateFrom: "",
          experienceDateTill: "",
        },
      ],
      qualifications: [{ qualificationType: "Education", qualificationInformation: [] }],
      profileSummary: "",
      socialMedias: [{ title: "", url: "" }],
      interests: [],
      achievements: [],
      projects: [
        {
          title: "",
          responsibilities: [],
          technologiesUsed: [],
          role: "",
          startDate: "",
          endDate: "",
          projectUrl: "",
          gitHubUrl: "",
        },
      ],
    }
  }

  export const steps = [
    { id: "personal", title: "Personal" },
    { id: "skills", title: "Skills" },
    { id: "education", title: "Education" },
    { id: "experience", title: "Experience" },
    { id: "qualifications", title: "Qualifications" },
    { id: "socials", title: "Socials" },
    { id: "projects", title: "Projects" },
    { id: "review", title: "Review & Submit" },
  ] as const
  
  export const requiredByStep: Record<string, (keyof any)[]> = {
    personal: ["personName.firstName", "personName.lastName", "phone.phoneNumber"],
    skills: [],
    education: [],
    experience: [],
    qualifications: [],
    socials: [],
    projects: [],
    review: [],
  }
  
  export function dateToISO(val?: string | null): string {
    if (!val) return ""
    const s = String(val)
    if (s.length === 10) {
      const d = new Date(`${s}T00:00:00`)
      return isNaN(d.getTime()) ? s : d.toISOString()
    }
    const d = new Date(s)
    return isNaN(d.getTime()) ? s : d.toISOString()
  }
  
  export function buildPayload(values: FormValues) {
    return {
      personName: values.personName,
      phone: values.phone,
      address: values.address,
      skills: values.skills,
      education: values.education.map((e) => ({ ...e, graduationDate: e.graduationDate ?? "" })),
      experience: values.experience.map((x) => ({
        ...x,
        experienceDateFrom: dateToISO(x.experienceDateFrom),
        experienceDateTill: dateToISO(x.experienceDateTill),
      })),
      dateOfBirth: dateToISO(values.dateOfBirth),
      qualifications: values.qualifications,
      profileSummary: values.profileSummary,
      socialMedias: values.socialMedias,
      interests: values.interests,
      achievements: values.achievements,
      projects: values.projects.map((p) => ({ ...p, startDate: p.startDate ?? "", endDate: p.endDate ?? "" })),
    }
  }

  