"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, Building2, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "pending":
      return "default"
    case "reviewing":
      return "secondary"
    case "accepted":
      return "secondary"
    case "rejected":
      return "destructive"
    default:
      return "default"
  }
}

type DashboardBodyProps = {
  user: any
  loading: boolean
  cardData: {
    appliedJobs: number
    activeJobs: number
    companies: number
    totalSearches: number
  }
  applicationData: JobApplication[]
  filter: string
  setFilter: (value: string) => void
}

export default function DashboardBody({
  user,
  loading,
  cardData,
  applicationData,
  filter,
  setFilter,
}: DashboardBodyProps) {
  
  const cardContents = [
    {
      cardTitle: "Applied Jobs",
      count: cardData.appliedJobs.toString(),
      content: "+12.5% from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trendIcon: <ArrowUpRight className="mr-1 h-4 w-4" />,
      trendColor: "text-green-500",
    },
    {
      cardTitle: "Active Jobs",
      count: cardData.activeJobs.toString(),
      content: "-2.3% from last month",
      icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
      trendIcon: <ArrowDownRight className="mr-1 h-4 w-4" />,
      trendColor: "text-red-500",
    },
    {
      cardTitle: "Companies",
      count: cardData.companies.toString(),
      content: "+8.1% from last month",
      icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
      trendIcon: <ArrowUpRight className="mr-1 h-4 w-4" />,
      trendColor: "text-green-500",
    },
    {
      cardTitle: "Total Searches",
      count: cardData.totalSearches.toString(),
      content: "+15.2% from last month",
      icon: <Eye className="h-4 w-4 text-muted-foreground" />,
      trendIcon: <ArrowUpRight className="mr-1 h-4 w-4" />,
      trendColor: "text-green-500",
    },
  ]

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-8 w-[300px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight">Welcome Back, {user?.personName?.firstName || "User"}</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardContents.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.cardTitle}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.count}</div>
              <div className={`flex items-center text-xs ${card.trendColor}`}>
                {card.trendIcon}
                {card.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            <Input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by position, company or status"
              className="mt-2 max-w-md"
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicationData.length > 0 ? (
                applicationData.map((application) => (
                  
                  <TableRow key={application.id}>
                    <TableCell>
                      <Link href={`/jobs/${application?.jobsId}`} className="text-blue-600 hover:underline">
                        {application.jobs?.jobTitle || "N/A"}
                      </Link>
                    </TableCell>
                    <TableCell>{application.jobs?.companyDescription.companyName || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(application.status?.statusName)}>
                        {application.status?.statusName || "N/A"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                    No applications found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

