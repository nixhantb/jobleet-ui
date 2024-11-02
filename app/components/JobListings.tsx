'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Job = {
    id: number
    title: string
    company: string
    location: string
    type: string
    description: string
}

type JobListingsProps = {
    title: string
    initialJobs: Job[]
}

export default function JobListings({ title, initialJobs }: JobListingsProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('')
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs)

    useEffect(() => {
        const updatedJobs = initialJobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())

            return matchesSearch && matchesLocation
        })

        setFilteredJobs(updatedJobs)
    }, [searchTerm, location, initialJobs])

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <Input
                            type="text"
                            placeholder="Search jobs, companies, or keywords"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-700 rounded-md h-12"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="relative w-full md:w-[200px]">
                        <Input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-700 rounded-md h-12"
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
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
                        <Card key={job.id} className="transition-all duration-300 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.company}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">{job.location} • {job.type}</p>
                                <p className="text-sm">{job.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

    )
}