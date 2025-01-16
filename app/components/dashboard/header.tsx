
"use client";
import React from 'react'
import Navbar from '../Navbar/Navbar';
import { useRouter } from 'next/navigation';

import HelpMenu from './HelpMenu';
import NotificationsMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';


const Header = () => {

    const router = useRouter();

    return (

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

    )
}

export default Header;
