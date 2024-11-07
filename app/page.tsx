
'use client'
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { NavbarItems } from "./components/Navbar";
import { JobLeetProvider } from "@/lib/Jobleetcontext";
import { ThemeProvider } from 'next-themes'
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import { UserCheck, BarChart, GitBranch,Puzzle, UserPlus, Facebook, Twitter, Linkedin, Instagram  } from "lucide-react";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Engine from "./components/Engine";
import JobListings from "./components/JobListings";

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
const initialJobListings = [
  {
    id: 1,
    companyName: 'TechCorp',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Software Engineer',
    jobDescription: 'We are seeking a talented Senior Software Engineer to join our innovative team, working on cutting-edge technology solutions.',
    postedTime: '3 days ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS'],
  },
  {
    id: 2,
    companyName: 'GrowthCo',
    location: 'New York, NY',
    jobTitle: 'Marketing Manager',
    jobDescription: 'GrowthCo is looking for an experienced Marketing Manager to lead our marketing efforts and drive growth through strategic campaigns.',
    postedTime: '1 week ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['Marketing Strategy', 'SEO', 'Content Marketing', 'Data Analysis'],
  },
  {
    id: 3,
    companyName: 'DesignHub',
    location: 'Remote',
    jobTitle: 'UX Designer',
    jobDescription: 'Join our team of creative UX Designers and help shape the future of digital experiences with a user-centered approach.',
    postedTime: '5 days ago',
    jobType: 'Contract',
    image: '',
    keySkills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'UI Design'],
  }
];

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
             <JobListings initialJobs={initialJobListings}/>
             <Engine/>
            <Features title="Our Services" features={features} />
           
          </main>
          <Footer
            companyName="JobLeet"
            companyDescription="Connecting talent, empowering recruiters, and simplifying hiring."
            quickLinks={[
              { title: "About Us", href: "/about" },
              { title: "Privacy Policy", href: "/privacy" },
              { title: "Terms of Service", href: "/terms" },
              { title: "Contact Us", href: "/contact" },
            ]}
            socialLinks={[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ]}
          />
        </Layout>

      </ThemeProvider>
    </JobLeetProvider>


  );
}
