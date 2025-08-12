"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MapPin, Building2, Briefcase, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"
import { Separator } from "@radix-ui/react-dropdown-menu"

import { motion } from "framer-motion"
import { fadeInUp, staggerChildren } from "../../(pages)/jobs/[id]/animations"
import { Job } from "@/types/jobs"



type JobListingsProps = {
  initialJobs: Job[];
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"]
// area to improve 
const locations = ["San Francisco, CA", "New York, NY", "Remote", "London, UK", "Others"]

const Jobs = ({ initialJobs }: JobListingsProps) => {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs)
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState([0, 200000])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "")
    setLocation(searchParams.get("location") || "")
  }, [searchParams])

  useEffect(() => {
    const updatedJobs = initialJobs.filter((job) => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyDescription.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyDescription.profile.companyAddress.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLocation = location
        ? job.companyDescription.profile.companyAddress.country.toLowerCase().includes(location.toLowerCase())
        : true

      const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType)
      const matchesSelectedLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.companyDescription.profile.companyAddress.country)

      return matchesSearch && matchesLocation && matchesJobType && matchesSelectedLocation
    })

    setFilteredJobs(updatedJobs)
  }, [searchTerm, location, initialJobs, selectedJobTypes, selectedLocations, salaryRange])

  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
                setSelectedJobTypes(checked ? [...selectedJobTypes, type] : selectedJobTypes.filter((t) => t !== type))
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
                setSelectedLocations(checked ? [...selectedLocations, loc] : selectedLocations.filter((l) => l !== loc))
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
          <div className="md:hidden"></div>
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

                  <CardContent>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Building2 className="h-12 w-12 text-primary" />
                          <div>
                            <CardTitle className="text-2xl">{job.jobTitle}</CardTitle>
                            <p className="text-muted-foreground">{job.companyDescription.companyName}</p>
                          </div>
                        </div>
                        <Button variant="outline">Apply Now</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <Badge variant="secondary" className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {job.jobAddress.city}, {job.jobAddress.state}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center">
                          <Briefcase className="mr-1 h-3 w-3" />
                          {job.jobType}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center">
                          <DollarSign className="mr-1 h-3 w-3" />
                          {job.basicPay.currency} {job.basicPay.minmumPay} - {job.basicPay.maximumPay}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Apply by {job.applicationDeadline}
                        </Badge>
                      </div>
                      <Separator className="my-4" />
                      <motion.div variants={fadeInUp}>
                        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                        <p className="text-muted-foreground">{job.jobDescription}</p>
                      </motion.div>
                    </CardContent>
                    <Link href={`/jobs/${job.id}`} passHref>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </Link>
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
                      <PaginationLink isActive={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
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

export default Jobs;

