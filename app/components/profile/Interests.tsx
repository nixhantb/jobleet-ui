
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { Star } from "lucide-react";


export function Interests() {
  const { profile } = useProfile();

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
        
        <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Interests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {profile.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
  );
}
