"use client";

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapPin, Building2} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

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
  salary?: string
}

type JobListingsProps = {
  initialJobs: Job[]
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"]
const locations = ["San Francisco, CA", "New York, NY", "Remote", "London, UK"]

const Jobs = ({ initialJobs }: JobListingsProps) => {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs)
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
    setLocation(searchParams.get('location') || '')
  }, [searchParams])

  useEffect(() => {
    const updatedJobs = initialJobs.filter(job => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.keySkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true

      const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType)
      const matchesSelectedLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location)

      const matchesSalaryRange = job.salary
        ? (() => {
          const [min, max] = job.salary.replace(/[$,]/g, '').split('-').map(Number)
          return min >= salaryRange[0] && max <= salaryRange[1]
        })()
        : true

      return matchesSearch && matchesLocation && matchesJobType && matchesSelectedLocation && matchesSalaryRange
    })

    setFilteredJobs(updatedJobs)
  }, [searchTerm, location, initialJobs, selectedJobTypes, selectedLocations, salaryRange])

  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Job Type</h2>
        {jobTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={`job-type-${type}`}
              checked={selectedJobTypes.includes(type)}
              onCheckedChange={(checked) => {
                setSelectedJobTypes(
                  checked
                    ? [...selectedJobTypes, type]
                    : selectedJobTypes.filter((t) => t !== type)
                )
              }}
            />
            <label
              htmlFor={`job-type-${type}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {type}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Location</h2>
        {locations.map((loc) => (
          <div key={loc} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={`location-${loc}`}
              checked={selectedLocations.includes(loc)}
              onCheckedChange={(checked) => {
                setSelectedLocations(
                  checked
                    ? [...selectedLocations, loc]
                    : selectedLocations.filter((l) => l !== loc)
                )
              }}
            />
            <label
              htmlFor={`location-${loc}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {loc}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Salary Range</h2>
        <Slider
          defaultValue={[0, 200000]}
          max={200000}
          step={10000}
          value={salaryRange}
          onValueChange={setSalaryRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${salaryRange[0].toLocaleString()}</span>
          <span>${salaryRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <div className="w-full">

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full mb-4">Filters</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="hidden md:block w-full md:w-1/4 border-2 border-gray-300 rounded-lg p-4 shadow-lg">
            <div className="sticky top-4">
              <FilterContent />
            </div>
          </aside>
          <main className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedJobs.map((job) => (
                <Card key={job.id} className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {job.image ? (
                      <Image src={job.image} alt={job.companyName} width={48} height={48} className="rounded-full" />
                    ) : (
                      <Building2 className="h-12 w-12 text-primary" />
                    )}
                    <div>
                      <CardTitle>{job.jobTitle}</CardTitle>
                      <CardDescription>{job.companyName}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">
                      <MapPin className="inline-block mr-1 h-4 w-4" /> {job.location} • {job.jobType}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">{job.jobDescription.slice(0, 100)}...</p>
                    <p className="text-xs text-muted-foreground mb-4">Posted {job.postedTime}</p>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedJob(job)}
                        >
                          Learn More
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>{selectedJob?.jobTitle}</SheetTitle>
                          <SheetDescription>{selectedJob?.companyName} • {selectedJob?.location}</SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                          <p className="text-sm mb-4">{selectedJob?.jobDescription}</p>
                          <h3 className="text-lg font-semibold mb-2">Key Skills</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedJob?.keySkills.map((skill, index) => (
                              <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <Button className="w-full">Apply Now</Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    aria-disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Jobs

