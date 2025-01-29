"use client"

import React, { Suspense } from 'react'
import Jobs from '../../components/Jobs/jobs'
import NavbarLists from '@/app/components/Navbar/NavbarLists'
import Layout from '@/app/components/Layout'
import { JobLeetProvider } from '@/lib/Jobleetcontext'
import { ThemeProvider } from 'next-themes'
import JobSearch from '@/app/components/Jobs/jobsearch'
import Footer from '@/app/components/Footer/Footer'
import CareerSection from '../careers/page'
import { JobApplicationWorkflow } from '@/app/components/Jobs/trackApplication'
import { motion } from 'framer-motion'

type JobListing = {
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
}

const initialJobListings: JobListing[] = [
  {
    Image: "",
    keySkills: ["Java", "python"],
    companyDescription: {
      companyName: "Tech Innovators Inc.",
      profile: {
        profileInfo: "A leading tech company focused on software development and IT solutions.",
        companyAddress: {
          street: "123 Tech Lane",
          city: "Innovator City",
          state: "TechState",
          postalCode: "75335",
          country: "Techland",
          id: "bbb70044-175d-4ce0-8cfc-07d0a14d2fae"
        },
        contactPhone: {
          countryCode: 1,
          phoneNumber: "555-1234",
          id: "30876058-081d-47ae-b179-079ebe09c113"
        },
        contactEmail: {
          emailType: "Personal",
          emailAddress: "contacttechinnovators.com",
          id: "f753b75f-5792-4ac7-8830-57e47e252d43"
        },
        website: "https://www.techinnovators.com",
        industryType: null,
        id: "70793af0-f024-424b-b848-fa1da8eb3cbb"
      },
      id: "6c77b9cc-b330-4ceb-bd71-e1deefa46c94"
    },
    jobTitle: "Software Developer",
    jobDescription: "Design, develop, and maintain software applications for clients in various industries.",
    jobType: "Full-time",
    jobAddress: {
      street: "123 Tech Lane",
      city: "Innovator City",
      state: "TechState",
      postalCode: "42524",
      country: "Techland",
      id: "d4033ab3-f143-495a-8a34-971b1541fe45"
    },
    vacancies: 5,
    basicPay: {
      minmumPay: null,
      maximumPay: 90000,
      currency: "USD"
    },
    functionalArea: "Software Development",
    skillsRequired: {
      title: [
        "C#",
        "ASP.NET Core",
        "SQL"
      ],
      description: [
        "Develop scalable web applications using C# and ASP.NET Core.",
        "Write efficient SQL queries and design databases.",
        "Collaborate in agile teams for continuous delivery."
      ],
      id: "d170dcf5-1477-4b3d-bd1b-9d20fce75cc9"
    },
    requiredQualification: {
      qualificationType: "Education",
      qualificationInformation: [
        "Bachelor's degree in Computer Science or related field."
      ],
      id: "dsdsdsdsds"
    },
    requiredExperience: {
      experienceLevel: "EntryLevel",
      companyModel: null,
      experienceDateFrom: "0001-01-01T00:00:00",
      experienceDateTill: "0001-01-01T00:00:00",
      id: "dggsfgsgsgs",
    },
    preferredQualifications: [
      "Master's degree in Computer Science",
      "Certified ScrumMaster (CSM)"
    ],
    jobResponsibilities: [
      "Develop and maintain software applications.",
      "Collaborate with cross-functional teams to deliver features.",
      "Ensure code quality through testing and code reviews."
    ],
    benefits: [
      "Health Insurance",
      "401(k) Plan",
      "Paid Time Off"
    ],
    tags: [
      "Software Development",
      "Technology",
      "C#"
    ],
    workEnvironment: "Collaborative, dynamic, and fast-paced.",
    postingDate: "2025-01-16T17:56:39.766Z",
    applicationDeadline: "2025-02-16",
    id: "cee7aba7-9aef-4020-b64b-31a8bc2b0c25"
  }
];

const JobsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobLeetProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>
            <div>
              <NavbarLists />

              <div className="text-center mt-10 max-w-2xl mx-auto mb-8 md:mb-12">
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Find Your Dream Job
                </motion.h1>
                <motion.p
                  className="text-muted-foreground text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Search through millions of jobs and find the right fit for you
                </motion.p>
              </div>
              <JobSearch />

              <Jobs initialJobs={initialJobListings} />

              <CareerSection />

              <JobApplicationWorkflow />

              <Footer />
            </div>
          </Layout>
        </ThemeProvider>
      </JobLeetProvider>
    </Suspense>
  )
}

export default JobsPage