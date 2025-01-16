
'use client'

import { JobLeetProvider } from "@/lib/Jobleetcontext";
import { ThemeProvider } from 'next-themes'
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import { UserCheck, BarChart, GitBranch, Puzzle, UserPlus} from "lucide-react";
import Features from "./components/Features";
import Footer from "./components/Footer/Footer"

import AboutUs from "./components/AboutUs";
import NavbarLists from "./components/Navbar/NavbarLists";
import CareerSection from "./(pages)/careers/page";
import { JobApplicationWorkflow } from "./components/Jobs/trackApplication";
import { Suspense } from "react";


const features = [
  {
    title: 'Efficient Talent Acquisition',
    description: 'Automate and optimize your recruitment process with our smart CRM, reducing the time spent on manual tasks.',
    icon: UserCheck,
  },
  {
    title: 'Recruiter Tools and Analytics',
    description: 'Gain insights into your hiring process with comprehensive analytics.',
    icon: BarChart,
  },
  {
    title: 'Personalized Job Matching',
    description: 'Advanced algorithms match job seekers with relevant roles based on their skills, preferences, and career goals',
    icon: Puzzle,
  },
  {
    title: 'Candidate Relationship Management',
    description: 'Build and maintain strong relationships with your talent pool.',
    icon: UserPlus,
  },
  {
    title: 'Automated Hiring Workflows',
    description: 'Streamline your hiring process with customizable automated workflows.',
    icon: GitBranch,
  },
]

export default function Home() {

  return (
    <Suspense>
         <JobLeetProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Layout>
          <main>
            <NavbarLists/>
            <Hero
              title="Connecting Talent, Boosting Recruitment"
              description="JobLeet makes hiring easy and simple by connecting top talent with the right recruiters."
            
            />
             <JobApplicationWorkflow/>
              <AboutUs/>
              <CareerSection/>
            <Features title="Our Services" features={features} />
         
           
          </main>
          <Footer/>
        </Layout>

      </ThemeProvider>
    </JobLeetProvider>
    </Suspense>
  );
}
