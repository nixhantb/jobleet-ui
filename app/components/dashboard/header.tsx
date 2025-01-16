
"use client";
import React from 'react'
import Navbar from '../Navbar/Navbar';

import HelpMenu from './HelpMenu';
import NotificationsMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';


const Header = () => {


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
