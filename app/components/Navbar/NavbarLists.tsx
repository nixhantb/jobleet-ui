

import React from 'react'
import { Button } from "@/components/ui/button";
import Navbar from './Navbar';
import { useRouter } from 'next/navigation';

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
            { title: 'Consulting', href: '/contact' },
        

        ],
    },
    {
        title: 'Employers',
        href: '/employers',
        dropdownItems: [
            { title: 'Post a Job', href: '/jobs' },
            { title: 'Tack applications', href: '/dashboard' },
            { title: 'Talent Pool', href: '/seekers' },
            { title: 'Hackathons', href: '/' },
        ],
    },
    {
        title: 'Job Seekers',
        href: '/job-seekers',
        dropdownItems: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Browse Jobs', href: '/jobs' },
            { title: 'Complete Profile', href: '/profile' },
            { title: 'Resume Builder', href: '/resume' },

        ],
    },
]
const NavbarLists = () => {

    const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return (
        <Navbar
          navItems={navItems}
          rightItems={
            token ? (
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/");
                }}
                variant="ghost"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button onClick={() => router.push("/login")} variant="ghost">
                  Login
                </Button>
                <Button onClick={() => router.push("/register")}>Register</Button>
              </>
            )
          }
        />
      );
    }
      

export default NavbarLists;
