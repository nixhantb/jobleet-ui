import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface FooterLink {

    title: string
    href: string
}

interface SocialLink {
    icon: LucideIcon
    href: string
}

interface FooterProps {

    companyName: string
    companyDescription: string
    quickLinks: FooterLink[]
    socialLinks: SocialLink[]

}

export default function Footer({ companyName, companyDescription, quickLinks, socialLinks }: FooterProps) {
    return (

        <footer className="bg-muted py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{companyName}</h3>
                        <p className="text-sm text-muted-foreground">{companyDescription}</p>
                    </div>

                    <div>
                        <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-sm hover:underline">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <Link key={index} href={link.href} className="text-muted-foreground hover:text-foreground">
                                    <link.icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold mb-4">Newsletter</h4>
                        <p className="text-sm text-muted-foreground mb-2">Stay updated with our latest features and job opportunities.</p>
                        <form className="flex space-x-2">
                            <Input type="email" placeholder="Enter your email" className="flex-grow" />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {companyName}. All rights reserved.
                </div>
            </div>
        </footer>
    )

}