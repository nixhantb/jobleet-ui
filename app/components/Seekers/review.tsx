"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ReviewProps = {
  data: {
    personName: { firstName: string; middleName?: string; lastName: string }
    phone: { countryCode: number; phoneNumber: string }
    dateOfBirth?: string
    address: { street?: string; city?: string; state?: string; postalCode?: string; country?: string }
    profileSummary?: string
    skills: { title: string[]; description: string[] }
    interests: string[]
    achievements: string[]
    education: Array<{ degree?: string; major?: string; institution?: string; graduationDate?: string; cgpa?: number }>
    experience: Array<{
      experienceLevel: string
      company?: string
      responsibilities: string[]
      experienceDateFrom?: string
      experienceDateTill?: string
    }>
    qualifications: Array<{ qualificationType: string; qualificationInformation: string[] }>
    socialMedias: Array<{ title?: string; url?: string }>
    projects: Array<{
      title?: string
      role?: string
      startDate?: string
      endDate?: string
      projectUrl?: string
      gitHubUrl?: string
      technologiesUsed: string[]
      responsibilities: string[]
    }>
  }
}

export function Review({ data }: ReviewProps) {
  const fullName = [data.personName.firstName, data.personName.middleName, data.personName.lastName].filter(Boolean).join(" ")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field label="Name" value={fullName || "—"} />
          <Field label="Phone" value={`+${data.phone.countryCode || 0} ${data.phone.phoneNumber || ""}`.trim()} />
          <Field label="Date of birth" value={data.dateOfBirth || "—"} className="sm:col-span-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field label="Street" value={data.address.street || "—"} className="sm:col-span-2" />
          <Field label="City" value={data.address.city || "—"} />
          <Field label="State" value={data.address.state || "—"} />
          <Field label="Postal code" value={data.address.postalCode || "—"} />
          <Field label="Country" value={data.address.country || "—"} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile & Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Profile summary" value={data.profileSummary || "—"} />
          <Pills label="Skills" items={data.skills.title} />
          <Pills label="Skill descriptions" items={data.skills.description} />
          <Pills label="Interests" items={data.interests} />
          <Pills label="Achievements" items={data.achievements} />
        </CardContent>
      </Card>

      {data.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.education.map((e, i) => (
              <div key={i} className="grid gap-2 rounded-md border p-3 sm:grid-cols-2">
                <Field label="Degree" value={e.degree || "—"} />
                <Field label="Major" value={e.major || "—"} />
                <Field label="Institution" value={e.institution || "—"} />
                <Field label="Graduation" value={e.graduationDate || "—"} />
                <Field label="CGPA" value={e.cgpa?.toString() || "—"} className="sm:col-span-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.experience.map((x, i) => (
              <div key={i} className="space-y-2 rounded-md border p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Level" value={x.experienceLevel || "—"} />
                  <Field label="Company" value={x.company || "—"} />
                  <Field label="From" value={x.experienceDateFrom || "—"} />
                  <Field label="Till" value={x.experienceDateTill || "—"} />
                </div>
                <Pills label="Responsibilities" items={x.responsibilities} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.qualifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Qualifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.qualifications.map((q, i) => (
              <div key={i} className="space-y-2 rounded-md border p-3">
                <Field label="Type" value={q.qualificationType || "—"} />
                <Pills label="Information" items={q.qualificationInformation} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.socialMedias.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Socials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.socialMedias.map((s, i) => (
              <div key={i} className="grid gap-2 rounded-md border p-3 sm:grid-cols-2">
                <Field label="Title" value={s.title || "—"} />
                <Field label="URL" value={s.url || "—"} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.projects.map((p, i) => (
              <div key={i} className="space-y-2 rounded-md border p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Field label="Title" value={p.title || "—"} />
                  <Field label="Role" value={p.role || "—"} />
                  <Field label="Start" value={p.startDate || "—"} />
                  <Field label="End" value={p.endDate || "—"} />
                  <Field label="Project URL" value={p.projectUrl || "—"} />
                  <Field label="GitHub URL" value={p.gitHubUrl || "—"} />
                </div>
                <Pills label="Technologies" items={p.technologiesUsed} />
                <Pills label="Responsibilities" items={p.responsibilities} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm">{value || "—"}</div>
    </div>
  )
}

function Pills({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      {items.length ? (
        <div className="flex flex-wrap gap-2">
          {items.map((it, idx) => (
            <Badge key={`${it}-${idx}`} variant="secondary">
              {it}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="text-sm">{'—'}</div>
      )}
    </div>
  )
}
