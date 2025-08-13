"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MapPin, Building2, ArrowLeft, Briefcase, Calendar, DollarSign, GraduationCap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import NavbarLists from "@/app/components/Navbar/NavbarLists"
import Layout from "@/app/components/Layout"
import { JobLeetProvider } from "@/lib/Jobleetcontext"
import { ThemeProvider } from "next-themes"
import Footer from "@/app/components/Footer/Footer"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren } from "./animations"
import { AuthProvider } from "@/context/AuthContext"
import { useAuth } from "@/context/AuthContext"
import { useApplications } from "@/hooks/useApplication"
import ApplyButton from "@/app/components/Dashboard/ApplyButton"
import { Job } from "@/types/jobs"

const JobPageWithAuth = () => {
  return (
    <AuthProvider>
      <JobPageContent />
    </AuthProvider>
  )
}

const JobPageContent = () => {
  const params = useParams()
  const { user } = useAuth()

  const { addApplication } = useApplications(user?.id || "")

  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJob = async () => {

      setLoading(true)
      try {
        // use session storage in prod...
        const token = localStorage.getItem("token")

        if (!token) throw new Error("Unauthorized: No token found")
        // use deployed api in prod
        const response = await fetch(`http://localhost:5184/api/v1/jobs/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch job data")
        }
        const jobData: Job = await response.json()
        setJob(jobData)
      } catch (err) {
        setError("Failed to fetch job data")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchJob()
    }
  }, [params.id])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!job) {
    return <div className="flex justify-center items-center h-screen">No job found</div>
  }

  return (
    <JobLeetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Layout>
          <NavbarLists />
          <div className="container mx-auto px-4 py-8">
            <Link href="/jobs" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>

            <motion.div
              className="space-y-6"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Building2 className="h-12 w-12 text-primary" />
                      <div>
                        <CardTitle className="text-2xl">{job.jobTitle}</CardTitle>
                        <p className="text-muted-foreground">{job.companyDescription.companyName}</p>
                      </div>
                    </div>
                    <ApplyButton
                      jobId={job.id}
                      seekerId={user?.sub || ""}
                      companyId={job.companyDescription.id}
                      onApplicationSuccess={addApplication}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <Badge variant="secondary" className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {job.jobAddress.city}, {job.jobAddress.state}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <Briefcase className="mr-1 h-3 w-3" />
                      {job.jobType}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {job.basicPay.currency} {job.basicPay.minmumPay} - {job.basicPay.maximumPay}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Apply by {job.applicationDeadline}
                    </Badge>
                  </div>
                  <Separator className="my-4" />
                  <motion.div variants={fadeInUp}>
                    <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                    <p className="text-muted-foreground">{job.jobDescription}</p>
                  </motion.div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp}>
                      <h3 className="font-semibold flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Qualifications
                      </h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {job.requiredQualification.qualificationInformation.map((qual, index) => (
                          <li key={index}>{qual}</li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <h3 className="font-semibold flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Experience
                      </h3>
                      <p className="text-muted-foreground">
                        {job.requiredExperience.experienceLevel}: {job.requiredExperience.experienceDateFrom} -{" "}
                        {job.requiredExperience.experienceDateTill}
                      </p>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <h3 className="font-semibold">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsRequired.title.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={fadeInUp}>
                      <h3 className="font-semibold">Responsibilities</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {job.jobResponsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <h3 className="font-semibold">Benefits</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {job.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">About the Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div variants={fadeInUp}>
                    <p className="mb-4 text-muted-foreground">{job.companyDescription.profile.profileInfo}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Industry</h3>
                        <p className="text-muted-foreground">{job.companyDescription.profile.industryType}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Website</h3>
                        <a
                          href={job.companyDescription.profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {job.companyDescription.profile.website}
                        </a>
                      </div>
                      <div className="sm:col-span-2">
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">
                          {job.companyDescription.profile.companyAddress.street},{" "}
                          {job.companyDescription.profile.companyAddress.city},{" "}
                          {job.companyDescription.profile.companyAddress.state},{" "}
                          {job.companyDescription.profile.companyAddress.postalCode},{" "}
                          {job.companyDescription.profile.companyAddress.country}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button size="lg">Apply for this position</Button>
              </div>
            </motion.div>
          </div>
          <Footer />
        </Layout>
      </ThemeProvider>
    </JobLeetProvider>
  )
}

export default JobPageWithAuth;

