

import React from 'react'
import { Button } from "@/components/ui/button";
import Navbar from './Navbar';
export interface NavbarItems {
    title: string
    href: string
    dropdownItems?: { title: string; href: string }[]
}
const navItems: NavbarItems[] = [
    { title: 'Home', href: '/' },
    {
        title: 'Companies',
        href: '/companies',
        dropdownItems: [
            { title: 'Candidates Matching', href: '/companies/candidates-matching' },
            { title: 'CRM Tools', href: '/companies/crm-tools' },
            { title: 'Events', href: '/companies/events' },
            { title: 'Job Fairs', href: '/companies/fairs' },
            { title: 'Trainings', href: '/companies/trainings' },

        ],
    },
    {
        title: 'Employers',
        href: '/employers',
        dropdownItems: [
            { title: 'Post a Job', href: '/employers/post-job' },
            { title: 'Tack applications', href: '/employers/applications' },
            { title: 'Schedule Interview', href: '/job-seekers/interviews' },
            { title: 'Talent Pool', href: '/employers/talent-pool' },
            { title: 'Hiring Solutions', href: '/employers/hiring-solutions' },
        ],
    },
    {
        title: 'Job Seekers',
        href: '/job-seekers',
        dropdownItems: [
            { title: 'Tack applications', href: '/job-seekers/applications' },
            { title: 'Saved Jobs', href: '/job-seekers/saved-jobs' },
            { title: 'Recommendations', href: '/job-seekers/recommedations' },
            { title: 'Browse Jobs', href: '/job-seekers/browse-jobs' },
            { title: 'Career Resources', href: '/seekers/career-resources' },
            { title: 'Resume Builder', href: '/seekers/resume-builder' },

        ],
    },
]
const NavbarLists = () => {


    return (
        <div>
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
        </div>
    )
}

export default NavbarLists
