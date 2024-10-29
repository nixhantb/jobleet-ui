import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Sun, Moon , Menu} from "lucide-react"
import { useTheme } from "next-themes"

export interface NavbarItems {

    title: string
    href: string
    dropdownItems?: { title: string, href: string }[]

}

export interface NavbarProps {

    logo: React.ReactNode
    navItems: NavbarItems[]
    rightItems?: React.ReactNode
    showThemeToggle?: boolean

}
export default function Navbar({

    logo,
    navItems,
    rightItems,
    showThemeToggle = true
}: NavbarProps
) {
    const [isOpen, setIsOpen] = useState(false)
    const { setTheme, theme } = useTheme()

    const NavLink = ({ item }: { item: NavbarItems }) => {

        if (item.dropdownItems && item.dropdownItems.length > 0) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            {item.title} <ChevronDown size={16} />
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {item.dropdownItems.map((dropdownItem) => (
                            <DropdownMenuItem key={dropdownItem.title}>
                                <Link href={dropdownItem.href}>{dropdownItem.title}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
        return (
            <Link href={item.title} passHref>
                <Button variant="ghost">{item.title}</Button>
            </Link>
        )
    }


    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

            <div className="container flex items-center justify-between h-16 mx-auto px-4">

                <div className="flex items-center space-x-4">

                    {logo}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <Menu />
                    </Button>

                </div>

                <div className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-background md:bg-transparent p-4 md:p-0`}>
                    {navItems.map((item) => (
                        <NavLink key={item.title} item={item} />
                    ))}
                </div>

                <div className="flex item-center space-x-4">
                    {rightItems}
                    {showThemeToggle && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>

                        </Button>
                    )}

                </div>

            </div>
        </nav>
    );
}
