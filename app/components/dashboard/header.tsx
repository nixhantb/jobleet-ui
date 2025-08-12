
"use client";
import React from 'react'
import Navbar from '../Navbar/Navbar';
import { ThemeProvider } from 'next-themes';
import HelpMenu from './HelpMenu';
import NotificationsMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';


const Header = () => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <Navbar
            navItems={[]}
            rightItems={
                <>
                    <HelpMenu />
                    <NotificationsMenu />
                    <ProfileMenu />
                </>
            }

        ></Navbar>
        </ThemeProvider>

    )
}

export default Header;
