'use client'

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ChevronDown, Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export interface NavbarItems {
  title: string
  href: string
  dropdownItems?: { title: string; href: string }[]
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
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  const NavLink = ({ item }: { item: NavbarItems }) => {
    if (item.dropdownItems && item.dropdownItems.length > 0) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto px-4 py-2">
              {item.title} <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {item.dropdownItems.map((dropdownItem) => (
              <DropdownMenuItem key={dropdownItem.title} asChild>
                <Link
                  href={dropdownItem.href}
                  className="flex w-full items-center px-4 py-2 text-sm"
                >
                  {dropdownItem.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    return (
      <Link href={item.href} passHref legacyBehavior>
        <Button variant="ghost" className="h-auto px-4 py-2" asChild>
          <a>{item.title}</a>
        </Button>
      </Link>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">{logo}</div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-4 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.title} item={item} />
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {rightItems}
            {showThemeToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-10 w-10"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) => (
              <NavLink key={item.title} item={item} />
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}