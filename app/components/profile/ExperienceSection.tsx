'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { BriefcaseBusiness } from "lucide-react";
import { EditDialog } from "./EditDialog";

export function ExperienceSection() {
  const { profile } = useProfile();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <BriefcaseBusiness className="w-5 h-5" />
          Experience
        </CardTitle>
        <EditDialog section="education" title="Education" />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-semibold">{profile.experience.companyModel.companyName}</h3>
              <p className="text-sm text-muted-foreground">
                {`${profile.experience.companyModel.profile.companyAddress.city}, ${profile.experience.companyModel.profile.companyAddress.state}, ${profile.experience.companyModel.profile.companyAddress.country}`}
              </p>
            </div>
            <p className="text-muted-foreground mt-2">
              {profile.experience.companyModel.profile.profileInfo}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mt-4">Achievements</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {profile.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
