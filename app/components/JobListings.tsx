import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { useState } from "react"


interface Job {

    id: number 
    title : string 
    company: string 
    location: string
    type: string
    description: string
}


interface JobListingProps {
    title : string 
    initialJobs: Job[]
}


export default function JobListings({title, initialJobs} : JobListingProps) {

    const [filteredJobs, setFilteredJobs] = useState(initialJobs)

    const handleSearch =  (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase()

        setFilteredJobs(
            
            initialJobs.filter(
                (job) => 
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) || 
                job.location.toLowerCase().includes(searchTerm)

            )
        )
    }

    return (
        <section className="py-20">
            
            <div className="container mx-auto px-4">

                <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-8">

                    <Input placeholder="Search Jobs... " onChange={handleSearch} className="flex-grow h-12 md:h-14 border-2 border-gray-700 rounded-lg" />
                    
                    <Select>
                    <SelectTrigger className="w-full md:w-[180px] h-12 md:h-14 border-2 border-gray-700 rounded-lg">
                        <SelectValue placeholder="Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                            </SelectContent>
                    </Select>
                    <Select>
                    <SelectTrigger className="w-full md:w-[180px] h-12 md:h-14 border-2 border-gray-700 rounded-lg">
                            <SelectValue placeholder="Location"/>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="on-site">On-site</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map((job) => (
                        <Card key={job.id} className="transition-all duration-300 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
                                <p className="text-sm">{job.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>


        </section>
    )

}