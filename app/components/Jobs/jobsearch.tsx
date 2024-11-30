"use client";

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <section className="py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <form 
          onSubmit={handleSearch} 
          className="flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto"
        >
          <div className="relative flex-grow w-full">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={18} 
            />
            <Input
              type="text"
              placeholder="Job title or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-16 text-sm sm:text-base w-full"
            />
          </div>

          <div className="relative flex-grow w-full">
            <MapPin 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={18} 
            />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-16 text-sm sm:text-base w-full"
            />
          </div>
  
          <Button 
            type="submit" 
            className="h-14 px-6 w-full sm:w-auto"
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  )
}

