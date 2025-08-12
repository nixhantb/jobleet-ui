"use client"
import { useEffect, useState } from "react"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import Sidebar from "@/app/components/dashboard/sidebar"
import Header from "../../components/dashboard/header"
import DashboardBody from "@/app/components/dashboard/DashboardBody"
import Footer from "@/app/components/Footer/Footer"

const DashboardWithAuth = () => {
  return (
    <AuthProvider>
      <DashboardPage/>
    </AuthProvider>
  )
}

const DashboardPage = () => {
  const [filter, setFilter] = useState("")
  const [applicationData, setApplicationData] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true)
  const [cardData, setCardData] = useState({
    appliedJobs: 0,
    activeJobs: 0,
    companies: 0,
    totalSearches: 0,
  })
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token || !user?.sub) {
          console.error("Authentication required")
          return
        }

        const appsResponse = await fetch(`http://localhost:5184/api/v1/applications/seekers/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!appsResponse.ok) throw new Error("Failed to fetch applications")
          const data: JobApplication[] = await appsResponse.json()

        
        const applications = Array.isArray(data) ? data : [data]
        
        setApplicationData(applications)
        setCardData({
          appliedJobs: 1,
          activeJobs: 3,
          companies: 3,
          totalSearches: 1,
        })
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.sub])

  const filteredApplications = applicationData.filter((application) => {
    const searchTerm = filter.toLowerCase()
    return (
      application.jobs?.jobTitle?.toLowerCase().includes(searchTerm) ||
      application.company?.companyName?.toLowerCase().includes(searchTerm) ||
      application.status?.statusName?.toLowerCase().includes(searchTerm)
    )
  })

  return (
    
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          <DashboardBody
            user={user}
            loading={loading}
            cardData={cardData}
            applicationData={filteredApplications}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
      <Footer />
    </div>
   
  )
}

export default DashboardWithAuth;