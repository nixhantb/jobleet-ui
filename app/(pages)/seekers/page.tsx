'use client';

import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";
import Footer from "@/app/components/Footer/Footer";
import { Achievements } from "@/app/components/profile/Achievement";
import { EducationSection } from "@/app/components/profile/EducationSection";
import { ExperienceSection } from "@/app/components/profile/ExperienceSection";
import { Interests } from "@/app/components/profile/Interests";
import { ProfileHeader } from "@/app/components/profile/ProfileHeader";
import { ProjectsSection } from "@/app/components/profile/Project";
import { SkillsSection } from "@/app/components/profile/SkillsSection";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const profileData = {
    personNameModel: {
        firstName: "Steve",
        middleName: "KL",
        lastName: "JR",
        id: "97cb471a-f802-4976-a411-e307a309300d",
    },
    phone: {
        countryCode: 1,
        phoneNumber: "1234567890",
        id: "dba4dc6f-540b-40d0-9991-dd88329260bc",
    },
    address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
        id: "1515d6c0-12f9-4977-be65-b777e53c30c1",
    },
    skills: {
        title: ["C#", "ASP.NET Core", "SQL"],
        description: [
            "Proficient in C# programming",
            "Experienced with building APIs using ASP.NET Core",
            "Skilled in database design and query optimization",
        ],
        id: "f67762ba-b07f-4654-9336-fa34fe0abcc1",
    },
    education: {
        degree: "Bachelor's",
        major: "Computer Science",
        institution: "XYZ University",
        graduationDate: "2023-05-15",
        cgpa: 3.8,
        id: "faf1b34d-b388-48e1-878a-a4504548cabf",
    },
    experience: {
        experienceLevel: "EntryLevel",
        companyModel: {
            companyName: "TechCorp",
            profile: {
                profileInfo: "A leading tech company specializing in software solutions.",
                companyAddress: {
                    street: "456 Innovation Drive",
                    city: "San Francisco",
                    state: "CA",
                    postalCode: "94103",
                    country: "USA",
                    id: "9f6a6d2a-0aaf-4c2d-bf75-63d766091596",
                },
                contactPhone: {
                    countryCode: 1,
                    phoneNumber: "9876543210",
                    id: "52c71db3-a1ad-44c3-a410-f0b1d92f9ca0",
                },
                contactEmail: {
                    emailType: "Work",
                    emailAddress: "contact@techcorp.com",
                    id: "d308fe6e-974f-4336-8b43-69c1c44d5a40",
                },
                website: "https://www.techcorp.com",
                industryType: {
                    industryType: "Technology",
                    id: "2fac1f6c-decb-49f5-9167-b08e5c8f579a",
                },
                id: "08a6aec9-67dc-4038-ad20-963e047d7ea0",
            },
            id: "da0e5e2e-78af-491a-b5ca-0a446f36e62f",
        },
        experienceDateFrom: "0001-01-01T00:00:00",
        experienceDateTill: "0001-01-01T00:00:00",
        id: "7ee7219d-1252-4dfa-81c6-49cea30f2482",
    },
    dateOfBirth: "1995-08-15T00:00:00Z",
    qualifications: {
        qualificationType: "Education",
        qualificationInformation: [
            "Certified in Full Stack Development",
            "AWS Certified Solutions Architect",
        ],
        id: "77dba1cd-eb1f-456f-a282-4deb1aaf0193",
    },
    profileSummary: "A highly motivated software developer with experience in building scalable web applications.",
    socialMedias: [
        {
            title: "LinkedIn",
            url: "www.linkedin.com/nb",
            id: "98768ebc-0b4e-47ed-a361-39f01f4aac7d",
        },
        {
            title: "GitHub",
            url: "www.github.com/nb",
            id: "1dceb4bf-9da5-41ae-9143-3ff1dd618277",
        },
    ],
    interests: ["Coding", "Reading technology blogs", "Hiking"],
    achievements: [
        "Developed a job portal application used by 10,000+ users",
        "Won first prize in a university-level hackathon",
    ],
    projects: {
        title: "Job Portal Application",
        responsibilities: [
            "Designed and implemented the back-end APIs using ASP.NET Core.",
            "Integrated RabbitMQ for message queuing and pub-sub messaging.",
        ],
        technologiesUsed: ["C#", "ASP.NET Core", "RabbitMQ", "SQL", "JWT"],
        role: "Full Stack Developer",
        startDate: "2022-06-01",
        endDate: "2023-05-15",
        isOngoing: false,
        projectUrl: "https://jobportal.example.com",
        gitHubUrl: "https://jobportal.example.com",
        id: "1ce4d197-ed5d-4596-b87c-3c15dc3dcdf3",
    },
    id: "b4dc5b8a-a78b-4a8c-8308-20c7e5ad73a4",
};

export default function Seekers() {
    const handleDownloadPDF = async () => {
        const element = document.getElementById("profile-content")
        if (!element) return

        const canvas = await html2canvas(element, { scale: 2 })
        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF("p", "mm", "a4")
        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        pdf.save("profile.pdf")
    }

    return (
        <AuthProvider>
            <ProfileProvider profile={profileData}>
                <div className="flex h-screen overflow-hidden bg-gray-100">
                    <Sidebar />
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-y-auto">
                            <div className="container mx-auto px-4 py-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                                    <Button onClick={handleDownloadPDF} variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Generate Resume
                                    </Button>
                                </div>
                                <div id="profile-content" className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                                    <ProfileHeader />
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2 space-y-6">
                                            <ExperienceSection />
                                            <EducationSection />
                                            <ProjectsSection />
                                        </div>
                                        <div className="space-y-6">
                                            <SkillsSection />
                                            <Achievements />
                                            <Interests />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                    </div>

                </div>
                <Footer />
            </ProfileProvider>
        </AuthProvider>
    )
}