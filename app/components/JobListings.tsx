'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, X, Building2, BookmarkPlus, ChevronRight, Briefcase, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type Job = {
  id: number
  companyName: string
  location: string
  jobTitle: string
  jobDescription: string
  postedTime: string
  jobType: string
  image: string
  keySkills: string[]
}

type JobListingsProps = {
  initialJobs: Job[]
}

export default function JobListings({ initialJobs }: JobListingsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs)

  useEffect(() => {
    const updatedJobs = initialJobs.filter(job => {
      const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.keySkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())

      return matchesSearch && matchesLocation
    })

    setFilteredJobs(updatedJobs)
  }, [searchTerm, location, initialJobs])

  return (
    <section className="py-20">

      <div className="container mx-auto px-4">
        <div className="w-full">
          <div className="rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">Find Your Dream Job</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                  <Input
                    type="text"
                    placeholder="Search jobs, companies, or keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-6 w-full border-2 border-gray-200 rounded-lg text-lg transition-all duration-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" size={24} />
                  <Briefcase className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                </div>
                <div className="relative md:w-[300px] group">
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-12 pr-4 py-6 w-full border-2 border-gray-200 rounded-lg text-lg transition-all duration-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  />
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" size={24} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">

              </div>
            </form>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                <Briefcase size={16} className="mr-2" />
                Popular: UX Designer
              </span>
              <span className="flex items-center hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                <Briefcase size={16} className="mr-2" />
                Software Engineer
              </span>
              <span className="flex items-center hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                <Briefcase size={16} className="mr-2" />
                Data Scientist
              </span>
              <span className="flex items-center hover:text-indigo-600 cursor-pointer transition-colors duration-300">
                <ChevronDown size={16} className="mr-2" />
                More
              </span>
            </div>
          </div>
        </div>


        <div className="flex flex-wrap gap-2 mb-8">
          {searchTerm && (
            <Badge variant="secondary" className="text-sm">
              {searchTerm}
              <Button variant="ghost" size="sm" className="ml-2 h-4 w-4 p-0" onClick={() => setSearchTerm('')}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {location && (
            <Badge variant="secondary" className="text-sm">
              {location}
              <Button variant="ghost" size="sm" className="ml-2 h-4 w-4 p-0" onClick={() => setLocation('')}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="transition-all duration-300 hover:shadow-lg relative">
              <CardHeader className="flex flex-row items-center gap-4">
                {job.image ? (
                  <Image src={job.image} alt={job.companyName} width={48} height={48} className="rounded-full" />
                ) : (
                  <Building2 className="h-12 w-12 text-gray-400" />
                )}
                <div>
                  <CardTitle>{job.jobTitle}</CardTitle>
                  <CardDescription>{job.companyName}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookmarkPlus className="h-5 w-5" />
                    <span className="sr-only">Save job</span>
                  </Button>
                </div>
                <p className="text-sm  mb-2">
                  <MapPin className="inline-block mr-1 h-4 w-4" /> {job.location} • {job.jobType}
                </p>
                <p className="text-sm text-muted-foreground mb-4">{job.jobDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.keySkills.map((skill, index) => (
                    <Badge className="text-muted-foreground" key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-4">Posted {job.postedTime}</p>
                <Link
                  href={`/job/${job.id}`}
                  className="inline-flex items-center text-sm text-primary hover:underline transition-colors duration-200"
                  aria-label={`View more information about ${job.jobTitle} at ${job.companyName}`}
                >
                  Learn More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>

              </CardContent>

            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}