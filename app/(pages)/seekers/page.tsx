'use client';

import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";
import Footer from "@/app/components/Footer/Footer";
import { Achievements } from "@/app/components/profile/Achievement";
import { ContactSection } from "@/app/components/profile/ContactSection";
import { EducationSection } from "@/app/components/profile/EducationSection";
import { ExperienceSection } from "@/app/components/profile/ExperienceSection";
import { Interests } from "@/app/components/profile/Interests";
import { ProfileHeader } from "@/app/components/profile/ProfileHeader";
import { SkillsSection } from "@/app/components/profile/SkillsSection";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";

const profileData = {
    "personNameModel": {
        "firstName": "Nishant",
        "middleName": "Banjade",
        "lastName": "Banjade",
        "id": "9396c4ab-0d44-41a2-8415-efa6c4accfd1"
    },
    "phone": {
        "countryCode": 1,
        "phoneNumber": "1234567890",
        "id": "7861ad26-28d2-48fd-abf2-7735555c15a5"
    },
    "address": {
        "street": "123 Main Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10001",
        "country": "USA",
        "id": "75d5c900-d545-4b4d-8f25-98be6c501818"
    },
    "skills": {
        "title": [
            "C#",
            "ASP.NET Core",
            "SQL",
            "JavaScript",
            "React",
            "Docker",
            "Kubernetes",
            "Python",
            "Azure DevOps"
        ]
        ,
        "description": [
            "Proficient in C# programming",
            "Experienced with building APIs using ASP.NET Core",
            "Skilled in database design and query optimization"
        ],
        "id": "621465c5-a538-40c4-872b-0c009ab2c5a7"
    },
    "education": {
        "degree": "Bachelor's",
        "major": "Computer Science",
        "institution": "XYZ University",
        "graduationDate": "2023-05-15",
        "cgpa": 3.8,
        "id": "6eabf34e-b307-4a2a-91ad-570a5168e935"
    },
    "experience": {
        "experienceLevel": "EntryLevel",
        "companyModel": {
            "companyName": "TechCorp",
            "profile": {
                "profileInfo": "A leading tech company specializing in software solutions.",
                "companyAddress": {
                    "street": "456 Innovation Drive",
                    "city": "San Francisco",
                    "state": "CA",
                    "postalCode": "94103",
                    "country": "USA",
                    "id": "fe3f5e93-c899-4170-bb66-73222d1a84ce"
                },
                "contactPhone": {
                    "countryCode": 1,
                    "phoneNumber": "9876543210",
                    "id": "d862c7d9-f0d8-45fc-ac1c-d22a01729da3"
                },
                "contactEmail": {
                    "emailType": "Work",
                    "emailAddress": "contact@techcorp.com",
                    "id": "62a7479d-4c4d-48ee-9c62-5c766ebd3453"
                },
                "website": "https://www.techcorp.com",
                "industryType": {
                    "industryType": "Technology",
                    "id": "a257fa48-905b-4310-89bc-db970f840fd6"
                },
                "id": "2de51ae0-31b2-4c7c-9b5d-1a741d3e4550"
            },
            "id": "818c5b04-81b9-44bd-9c82-41bff557bdbf"
        },
        "id": "e6c7b035-4b22-49f1-a033-a243d2e257ca"
    },
    "dateOfBirth": "1995-08-15T00:00:00Z",
    "qualifications": {
        "qualificationType": "Education",
        "qualificationInformation": [
            "Certified in Full Stack Development",
            "AWS Certified Solutions Architect"
        ],
        "id": "0f4e3d8a-9c96-47eb-b3f0-d40f5e2d5432"
    },
    "profileSummary": "A highly motivated software developer with experience in building scalable web applications.",
    "socialMedias": [
        {
            "title": "LinkedIn",
            "url": "www.linkedin.com/nb",
            "id": "5c3a9004-bd3e-4650-88d8-f911309cedb7"
        },
        {
            "title": "GitHub",
            "url": "www.github.com/nb",
            "id": "48ca9444-c683-4a8c-9736-3ac924682ca0"
        },
        {
            "title": "X",
            "url": "www.x.com/nb",
            "id": "48ca9444-c683-4a8c-9736-3ac924682ca0"
        },
        {
            "title": "Website",
            "url": "www.bn.com/nb",
            "id": "48ca9489-c683-4a8c-4fsg-3ac924682ca0"
        }
    ],
    "interests": [
        "Coding",
        "Reading technology blogs",
        "Hiking"
    ],
    "achievements": [
        "Developed a job portal application used by 10,000+ users",
        "Won first prize in a university-level hackathon"
    ],
    "id": "a1970362-ed5b-4d0a-9f0a-ca74443a23de"
}


export default function Seejers() {
    return (
        <AuthProvider>
            <ProfileProvider profile={profileData}>
                <Header />
                <div className="flex">

                    <Sidebar />
                    <main className="container mx-auto px-4 py-8">
                        <div className="max-w-4xl mx-auto space-y-6">

                            <ProfileHeader />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    <ExperienceSection />
                                    <EducationSection />
                                    <Interests/>

                                </div>
                                <div>
                                    <SkillsSection />
                                    <div className="my-4 flex justify-center">

                                    </div>
                                    <Achievements />

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