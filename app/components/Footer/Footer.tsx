
import React from 'react'
import FooterList from './FooterList'
import {Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
const Footer = () => {
  return (
    <div>
      <FooterList
            companyName="JobLeet"
            companyDescription="Connecting talent, empowering recruiters, and simplifying hiring."
            quickLinks={[
              { title: "About Us", href: "/about" },
              { title: "Privacy Policy", href: "/privacy" },
              { title: "Terms of Service", href: "/terms" },
              { title: "Contact Us", href: "/contact" },
            ]}
            socialLinks={[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ]}
          />
    </div>
  )
}

export default Footer;
