"use client"

import React, { Suspense } from 'react'
import Jobs from '../../components/Jobs/jobs';
import NavbarLists from '@/app/components/Navbar/NavbarLists';

import Layout from '@/app/components/Layout';
import { JobLeetProvider } from '@/lib/Jobleetcontext';

import { ThemeProvider } from 'next-themes'
import JobSearch from '@/app/components/Jobs/jobsearch';
import Footer from '@/app/components/Footer';
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import CareerSection from '../careers/page';
import { JobApplicationWorkflow } from '@/app/components/Jobs/trackApplication';

const initialJobListings = [
  {
    id: 1,
    companyName: 'TechFusion',
    location: 'San Jose, CA',
    jobTitle: 'Full Stack Developer',
    jobDescription: 'We are seeking a Full Stack Developer to create dynamic, user-friendly web applications.',
    postedTime: '1 week ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'CSS'],
  },
  {
    id: 2,
    companyName: 'InnovateAI',
    location: 'Austin, TX',
    jobTitle: 'Machine Learning Engineer',
    jobDescription: 'Join our AI team to build and deploy machine learning models in real-world applications.',
    postedTime: '5 days ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'AI Algorithms'],
  },
  {
    id: 3,
    companyName: 'CyberShield',
    location: 'Dallas, TX',
    jobTitle: 'Security Engineer',
    jobDescription: 'We are looking for a Security Engineer to secure networks and mitigate cybersecurity risks.',
    postedTime: '3 days ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['Firewalls', 'Penetration Testing', 'SIEM Tools', 'Encryption', 'Network Security'],
  },
  {
    id: 4,
    companyName: 'CloudSphere',
    location: 'Seattle, WA',
    jobTitle: 'DevOps Engineer',
    jobDescription: 'Help automate and streamline operations processes, including CI/CD pipelines and monitoring.',
    postedTime: '1 week ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
  },
  {
    id: 5,
    companyName: 'HealthBridge',
    location: 'New York, NY',
    jobTitle: 'Data Analyst',
    jobDescription: 'Analyze healthcare data and create actionable insights to improve patient outcomes.',
    postedTime: '2 weeks ago',
    jobType: 'Contract',
    image: '',
    keySkills: ['SQL', 'Excel', 'Power BI', 'Data Visualization', 'Python'],
  },
  {
    id: 6,
    companyName: 'FinTechGlobal',
    location: 'San Francisco, CA',
    jobTitle: 'Backend Developer',
    jobDescription: 'Build robust backend systems to support financial transaction platforms.',
    postedTime: '4 days ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'MySQL'],
  },
  {
    id: 7,
    companyName: 'GreenEnergy Solutions',
    location: 'Denver, CO',
    jobTitle: 'Software Tester',
    jobDescription: 'Perform quality assurance testing to ensure clean and efficient software delivery.',
    postedTime: '3 days ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['Manual Testing', 'Automation Testing', 'Selenium', 'JIRA', 'API Testing'],
  },
  {
    id: 8,
    companyName: 'NextGenDesigns',
    location: 'Remote',
    jobTitle: 'Graphic Designer',
    jobDescription: 'Create visually appealing designs for web and print media using modern tools.',
    postedTime: '1 week ago',
    jobType: 'Part-time',
    image: '',
    keySkills: ['Photoshop', 'Illustrator', 'Canva', 'UI/UX Design', 'Typography'],
  },
  {
    id: 9,
    companyName: 'SmartBuilds',
    location: 'Chicago, IL',
    jobTitle: 'Project Manager',
    jobDescription: 'Oversee construction software projects, ensuring timely delivery and budget alignment.',
    postedTime: '2 weeks ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['Agile Methodologies', 'Scrum', 'Budget Management', 'Team Leadership', 'Trello'],
  },
  {
    id: 10,
    companyName: 'RetailTech',
    location: 'Los Angeles, CA',
    jobTitle: 'Business Analyst',
    jobDescription: 'Collaborate with clients to identify business needs and recommend technology solutions.',
    postedTime: '1 week ago',
    jobType: 'Full-time',
    image: '',
    keySkills: ['Requirements Gathering', 'UML', 'Stakeholder Management', 'SQL', 'Process Improvement'],
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

              <div className="flex items-center justify-center min-h-[20vh]">
                <div className="text-center">
                  <h2 className="text-2xl md:text-4xl font-semibold mb-1">Find Your Dream Job Today!</h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Explore thousands of opportunities to start your next career journey.
                  </p>
                </div>
              </div>

              <JobSearch />

              <Jobs initialJobs={initialJobListings} />

              <CareerSection />

              <JobApplicationWorkflow />

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

            </div>
          </Layout>
        </ThemeProvider>
      </JobLeetProvider>
    </Suspense>


  )
}

export default JobsPage;
