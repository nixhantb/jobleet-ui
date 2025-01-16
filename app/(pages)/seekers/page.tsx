'use client';

import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";
import Footer from "@/app/components/Footer/Footer";
import { ContactSection } from "@/app/components/profile/ContactSection";
import { EducationSection } from "@/app/components/profile/EducationSection";
import { ProfileHeader } from "@/app/components/profile/ProfileHeader";
import { SkillsSection } from "@/app/components/profile/SkillsSection";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";

const profileData = {

    "phone": {
        "countryCode": 1,
        "phoneNumber": "398-930-0123"
    },
    "address": {

        "street": "123 Tech Street",
        "city": "San Francisco",
        "state": "CA",
        "postalCode": "94629",
        "country": "USA"
    },
    "skills": {

        "title": [
            "React",
            "TypeScript",
            "Node.js",
            "Next.js",
            "Tailwind CSS",
            "GraphQL"
        ],
        "description": [
            "Frontend Development",
            "Backend Development",
            "UI/UX Design"
        ]
    },
    "education": {

        "degree": "Bachelor of Science",
        "major": "Computer Science",
        "institution": "Stanford University",
        "graduationDate": "2024-05-15",
        "cgpa": 3.8
    },
    "experience": {

        "experienceLevel": "Mid-Level"
    },
    "dateOfBirth": "1995-06-15T09:08:58.747Z",
    "qualifications": {

        "qualificationType": "Education",
        "qualificationInformation": [
            "AWS Certified Developer",
            "Google Cloud Professional"
        ]
    },
    "profileSummary": "Passionate software developer with expertise in modern web technologies and cloud computing. Committed to creating efficient, scalable, and user-friendly applications.",
    "linkedInProfile": "https://linkedin.com/in/johndoe",
    "portfolio": "https://github.com/johndoe",
    "interests": [
        "Open Source",
        "AI/ML",
        "Cloud Computing"
    ],
    "achievements": [
        "Best Developer Award 2023",
        "100+ Open Source Contributions"
    ]
};


export default function Seejers() {
    return (
        <AuthProvider>
            <ProfileProvider profile={profileData}>
                <Header />
                <div className="flex h-screen">

                    <Sidebar />
                    <main className="container mx-auto px-4 py-8">
                        <div className="max-w-4xl mx-auto space-y-6">

                            <ProfileHeader />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    <SkillsSection />
                                    <EducationSection />
                                </div>
                                <div>
                                    <ContactSection />
                                </div>
                            </div>
                        </div>
                    </main>

                </div>
                <Footer />
            </ProfileProvider>
        </AuthProvider>

    );
}