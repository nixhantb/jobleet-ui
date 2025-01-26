'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { GraduationCap } from "lucide-react";
import { EditDialog } from "./EditDialog";

export function EducationSection() {
  const { profile } = useProfile();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Education
        </CardTitle>
        <EditDialog section="education" title="Education" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{profile.education.degree} in {profile.education.major}</h3>
            <p className="text-muted-foreground">{profile.education.institution}</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-muted-foreground">
                Graduated: {new Date(profile.education.graduationDate).toLocaleDateString()}
              </span>
              <span className="text-sm font-medium">CGPA: {profile.education.cgpa}</span>
            </div>
          </div>

          
          <div>
          
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {profile.qualifications.qualificationInformation.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
