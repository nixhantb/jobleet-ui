"use client"

import ResumeBuilder from "@/app/components/Resume/ResumeBuilder";
import { AuthProvider } from "@/context/AuthContext"

const ResumeBuild = () => {
  return (
    <AuthProvider>
     
      <ResumeBuilder/>
     
    </AuthProvider>
  )
}
export default ResumeBuild;