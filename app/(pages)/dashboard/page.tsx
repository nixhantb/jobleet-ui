'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from "@/app/components/dashboard/sidebar"
import Header from "../../components/dashboard/header"
import DashboardBody from "@/app/components/dashboard/DashboardBody"
import Footer from "@/app/components/Footer/Footer"
import { AuthProvider, useAuth } from "@/context/AuthContext"

function DashboardContent() {
  const { user, isInitialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/login')
    }
  }, [isInitialized, user, router])

  if (!isInitialized || !user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          <DashboardBody />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  )
}