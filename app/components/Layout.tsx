import { useJobLeet } from '@/lib/Jobleetcontext'
import React, { ReactNode } from 'react'


interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useJobLeet()

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme}`}>
      {children}
    </div>
  )
}