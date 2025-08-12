"use client"

import React, { Suspense, useEffect, useState } from 'react'
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
import { JobListing } from '@/types/jobs'

const API_URL = `http://localhost:5184/api/v1/jobs/`;

const JobsPage = () => {

  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const response = await fetch(API_URL, {
    
        });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
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

              <Jobs initialJobs={jobs} />

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