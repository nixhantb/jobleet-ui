'use client'

import { ThemeProvider } from 'next-themes'
import Footer from '@/app/components/Footer/Footer'
import Logo from './Logo'


interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="min-h-screen flex flex-col mt-5">
                <Logo/>

                <main className="flex-1 flex items-center justify-center p-6 mb-20">
                    <div className="w-full">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    )
}