
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { Award } from "lucide-react";
import { EditDialog } from "./EditDialog";

export function Achievements() {
  const { profile } = useProfile();

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
        
          <CardTitle className="flex items-center gap-2">
          
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
          <EditDialog section="education" title="Education" />
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {profile.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
  );
}
