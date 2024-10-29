"use client"

import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { NavbarItems } from "./components/Navbar";
import { JobLeetProvider } from "@/lib/Jobleetcontext";
import { ThemeProvider } from 'next-themes'
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import { Brain, BarChart, Link as LinkIcon, Users, Workflow } from "lucide-react";
import Features from "./components/Features";
const navItems: NavbarItems[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Recruiters',
    href: '/recruiters',
    dropdownItems: [
      { title: 'CRM Tools', href: '/recruiters/crm-tools' },
      { title: 'Candidates', href: '/recruiters/candidate-matching' },
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
      { title: 'Career Resources', href: '/seekers/career-resources' },
      { title: 'Resume Builder', href: '/seekers/resume-builder' },
      {title: 'Trainings', href: '/seekers/training'}
    ],
  },
]

const features = [
  {
    title: 'Smart Candidate Matching',
    description: 'AI-powered matching to connect the right candidates with the right jobs.',
    icon: Brain,
  },
  {
    title: 'Recruitment Analytics',
    description: 'Gain insights into your hiring process with comprehensive analytics.',
    icon: BarChart,
  },
  {
    title: 'CRM powered',
    description: 'Seamlessly provides smart  CRM features  for efficient entity management.',
    icon: LinkIcon,
  },
  {
    title: 'Candidate Relationship Management',
    description: 'Build and maintain strong relationships with your talent pool.',
    icon: Users,
  },
  {
    title: 'Automated Hiring Workflows',
    description: 'Streamline your hiring process with customizable automated workflows.',
    icon: Workflow,
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
            rightItems={
              <>
                <Button variant="ghost">Login</Button>
                <Button>Register</Button>
              </>
            }

          ></Navbar>

          <main>
            <Hero
              title="Connecting Talent, Empowering Recruiters"
              description="JobLeet's smart CRM platform simplifies hiring, connecting top talent with recruiters effortlessly."
              primaryCTA={{ text: "Get Started", href: "/signup" }}
              secondaryCTA={{ text: "Learn More", href: "/about" }}
            />
            <Features title="key Features" features={features} />
          </main>
        </Layout>

      </ThemeProvider>
    </JobLeetProvider>


  );
}
