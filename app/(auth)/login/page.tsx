'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github } from 'lucide-react'
import AuthLayout from '@/components/auth/AuthLayout'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const [formData, setFormData] = useState({
    emailAddress: '',
    password: ''
  })

  const router = useRouter();
  const { setUser } = useAuth();

  // Add useEffect to handle mounting state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
   
    const payload = {
      emailAddress: formData.emailAddress,
      password: formData.password
    }

    try {
      const response = await axios.post('http://localhost:5184/api/v1/logins', payload);
      
      if (response.status === 200) {
        const { token } = response.data;

        // Only access localStorage after component is mounted and in browser environment
        if (isMounted) {
          localStorage.setItem("token", token);
        }
        
        setUser(response.data);
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  
  if (!isMounted) {
    return null; 
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] mx-auto"
      >
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your Jobleet account</p>
        </div>

        <Button variant="outline" className="w-full mb-6">
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="emailAddress"
              type="email"
              placeholder="john.doe@example.com"
              required
              className="w-full"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder='••••••••'
              required
              className="w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          {`Don't have an account?`}{' '}
          <Link
            href="/register"
            className="text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  )
}