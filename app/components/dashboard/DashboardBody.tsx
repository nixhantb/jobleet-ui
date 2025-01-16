"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, Building2, Eye } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const cardContents = [
  {
    cardTitle: "Applied Jobs",
    count: "26",
    content: "+12.5% from last month",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    trendIcon: <ArrowUpRight className="mr-1 h-4 w-4" />,
    trendColor: "text-green-500",
  },
  {
    cardTitle: "Active Jobs",
    count: "14",
    content: "-2.3% from last month",
    icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
    trendIcon: <ArrowDownRight className="mr-1 h-4 w-4" />,
    trendColor: "text-red-500",
  },
  {
    cardTitle: "Companies",
    count: "43",
    content: "+8.1% from last month",
    icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
    trendIcon: <ArrowUpRight className="mr-1 h-4 w-4" />,
    trendColor: "text-green-500",
  },
  {
    cardTitle: "Total Searches",
    count: "1,234",
    content: "+15.2% from last month",
    icon: <Eye className="h-4 w-4 text-muted-foreground" />,
    trendIcon: <ArrowUpRight className="mr-1 h-4 w-4" />,
    trendColor: "text-green-500",
  },
];

const recentApplications = [
  {
    id: 1,
    position: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "pending",
  },
  {
    id: 2,
    position: "Product Manager",
    company: "Innovation Labs",
    status: "reviewing",
  },
  {
    id: 3,
    position: "UX Designer",
    company: "Creative Solutions",
    status: "accepted",
  },
  {
    id: 4,
    position: "Backend Engineer",
    company: "DataTech Systems",
    status: "rejected",
  },
  {
    id: 5,
    position: "Software Engineer",
    company: "AlphaCode Inc.",
    status: "pending",
  },
];

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "pending":
      return "default";
    case "reviewing":
      return "secondary";
    case "accepted":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "default";
  }
}

export default function DashboardBody() {
  const [filter, setFilter] = useState("");

  const filteredApplications = recentApplications.filter(
    (application) =>
      application.position.toLowerCase().includes(filter.toLowerCase()) ||
      application.company.toLowerCase().includes(filter.toLowerCase()) ||
      application.status.toLowerCase().includes(filter.toLowerCase())
  );


  const {user} = useAuth();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight">Welcome Back, {user?.personName?.firstName || ''}</h2>
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
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
        <Input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="filter by positions, company or status"
          className="border rounded-md px-3 py-1 text-sm"
        />
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(application.status)}>
                      {application.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
