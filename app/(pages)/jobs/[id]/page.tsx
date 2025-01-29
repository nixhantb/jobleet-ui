"use client"

import React, { useState, useEffect } from "react"
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

type Job = {
    jobTitle: string
    companyDescription: {
        companyName: string
        profile: {
            profileInfo: string
            companyAddress: {
                street: string
                city: string
                state: string
                postalCode: string
                country: string
            }
            website: string
            industryType: string
        }
    }
    jobDescription: string
    jobType: string
    jobAddress: {
        city: string
        state: string
    }
    vacancies: number
    basicPay: {
        currency: string
        minmumPay: number
        maximumPay: number
    }
    functionalArea: string
    skillsRequired: {
        title: string[]
    }
    requiredQualification: {
        qualificationType: string
        qualificationInformation: string[]
    }
    requiredExperience: {
        experienceLevel: string
        experienceDateFrom: string
        experienceDateTill: string
    }
    jobResponsibilities: string[]
    benefits: string[]
    applicationDeadline: string
}

async function getJob(id: string): Promise<Job> {
    return {
        jobTitle: "Software Developer",
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
                },
                website: "https://www.techinnovators.com",
                industryType: "Technology",
            },
        },
        jobDescription: "Design, develop, and maintain software applications for clients in various industries.",
        jobType: "Full-time",
        jobAddress: {
            city: "Innovator City",
            state: "TechState",
        },
        vacancies: 5,
        basicPay: {
            currency: "USD",
            minmumPay: 70000,
            maximumPay: 90000,
        },
        functionalArea: "Software Development",
        skillsRequired: {
            title: ["C#", "ASP.NET Core", "SQL"],
        },
        requiredQualification: {
            qualificationType: "Education",
            qualificationInformation: ["Bachelor's degree in Computer Science or related field."],
        },
        requiredExperience: {
            experienceLevel: "Entry Level",
            experienceDateFrom: "0-2 years",
            experienceDateTill: "3-5 years",
        },
        jobResponsibilities: [
            "Develop and maintain software applications.",
            "Collaborate with cross-functional teams to deliver features.",
            "Ensure code quality through testing and code reviews.",
        ],
        benefits: ["Health Insurance", "401(k) Plan", "Paid Time Off"],
        applicationDeadline: "2025-02-16",
    }
}

const JobPage = () => {
    const params = useParams()
    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobData = await getJob(params.id as string)
                setJob(jobData)
            } catch (err) {
                setError("Failed to fetch job data")
            } finally {
                setLoading(false)
            }
        }
        fetchJob()
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
                                        <Button variant="outline"> Apply Now</Button>
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

export default JobPage

