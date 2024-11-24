'use client'

import {Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function JobSearch() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('search', searchTerm);
    if (location) queryParams.append('location', location);
  
    router.push(`/jobs?${queryParams.toString()}`);
  };
  

  return (
    
    <section className="py-5 md:py-10">
      <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto px-4">
      <div className="w-full max-w-6xl mx-auto mb-8">
        <form 
          onSubmit={handleSearch} 
         className="flex flex-col sm:flex-row items-center gap-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4 "
        >
         
          <div className="relative flex-grow w-full sm:w-auto">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={22} 
            />
            <Input
              type="text"
              placeholder="Job title, keywords or companies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-14 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
  
         
          <Separator 
            orientation="vertical" 
            className="hidden sm:block h-12" 
            style={{ backgroundColor: 'darkgray' }}
          />

          <div className="relative flex-grow w-full sm:w-auto">
            <MapPin 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={22} 
            />
            <Input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-14 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
  
          <Button 
            type="submit" 
            className="h-14 px-12 rounded-md  text-md w-full sm:w-auto"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
      </Suspense>
 
  </section>
  
 
  
  )
}
