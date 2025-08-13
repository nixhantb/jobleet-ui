"use client"

import SeekersProfile from "@/app/components/Seekers/Seekers"
import { AuthProvider } from "@/context/AuthContext"

const ProfileWithAuth = () => {
  return (
    <AuthProvider>
     
      <SeekersProfile/>
     
    </AuthProvider>
  )
}
export default ProfileWithAuth;