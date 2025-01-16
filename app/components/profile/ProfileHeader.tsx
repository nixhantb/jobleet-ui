'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { EditDialog } from "./EditDialog";
import { useAuth } from "@/context/AuthContext";

export function ProfileHeader() {
  const { profile } = useProfile();
const { user} = useAuth();

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt="Profile" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-between mb-2">
              <h1 className="text-2xl font-bold">User Profile</h1>
             

              <EditDialog section="basic" title="Basic Information" />
            </div>
            <h2 className="text-2xl font-bold">{user?.personName?.firstName || ''} {user?.personName?.lastName || ''}</h2>
            <p className="text-muted-foreground mb-4">{profile.profileSummary}</p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.experience.experienceLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.address.city}, {profile.address.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}