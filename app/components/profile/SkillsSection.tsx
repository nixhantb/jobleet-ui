'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { EditDialog } from "./EditDialog";

export function SkillsSection() {
  const { profile } = useProfile();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <EditDialog section="skills" title="Skills" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {profile.skills.title.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}