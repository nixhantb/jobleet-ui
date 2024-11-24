"use client"
import React, { Suspense } from 'react'
import Jobs from '../../components/Jobs/jobs';
import NavbarLists from '@/app/components/Navbar/NavbarLists';

import Layout from '@/app/components/Layout';
import { JobLeetProvider } from '@/lib/Jobleetcontext';

import { ThemeProvider } from 'next-themes'
import JobSearch from '@/app/components/Jobs/jobsearch';
import Footer from '@/app/components/Footer';
import {Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
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
            

            <JobSearch/>
            
            <Jobs initialJobs={initialJobListings} />
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
