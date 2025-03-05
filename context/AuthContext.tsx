"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

interface AuthContextType {
  user: any
  setUser: (user: any) => void
  logout: () => void
  isInitialized: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      
      const token = localStorage.getItem("token")

      if (token) {
        // Decode the JWT token to get user information
        const decoded = jwtDecode(token)
        setUser(decoded)
      }
    } catch (error) {
      console.error("Error decoding token:", error)
      // Clear invalid token
      localStorage.removeItem("token")
    }
    setIsInitialized(true)
  }, [])

  // This effect handles storing the token when user is updated
  useEffect(() => {
    if (!isInitialized) return

    // We don't store the user object directly, only the token
    // The token is set elsewhere in your login flow
  }, [isInitialized]) // Removed unnecessary dependency: user

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  if (!isInitialized) {
    return null
  }

  return <AuthContext.Provider value={{ user, setUser, logout, isInitialized }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

