"use client"

import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { NavbarItems } from "./components/Navbar";
import { JobLeetProvider } from "@/lib/Jobleetcontext";
import { ThemeProvider } from 'next-themes'
import Layout from "./components/Layout";

const navItems: NavbarItems[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Recruiters',
    href: '/recruiters',
    dropdownItems: [
      { title: 'CRM Tools', href: '/recruiters/crm-tools' },
      { title: 'Candidate Matching', href: '/recruiters/candidate-matching' },
      { title: 'Analytics', href: '/recruiters/analytics' },
    ],
  },
  {
    title: 'Employers',
    href: '/employers',
    dropdownItems: [
      { title: 'Post a Job', href: '/employers/post-job' },
      { title: 'Talent Pool', href: '/employers/talent-pool' },
      { title: 'Hiring Solutions', href: '/employers/hiring-solutions' },
    ],
  },
  {
    title: 'Job Seekers',
    href: '/job-seekers',
    dropdownItems: [
      { title: 'Browse Jobs', href: '/job-seekers/browse-jobs' },
      { title: 'Career Resources', href: '/job-seekers/career-resources' },
      { title: 'Resume Builder', href: '/job-seekers/resume-builder' },
    ],
  },
]

export default function Home() {
  return (
 
    <JobLeetProvider>
     <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
     >
     <Layout>
     <Navbar

      logo={<span className="text-2xl font-bold">JobLeet</span>}
      navItems={navItems}
      rightItems = {
        <>
        <Button variant="ghost">Login</Button>
        <Button>Register</Button>
        </>
      }

></Navbar>
     </Layout>
      
     </ThemeProvider>
    </JobLeetProvider>
    
   
  );
}
