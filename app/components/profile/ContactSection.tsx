'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { EditDialog } from "./EditDialog";
import { useAuth } from "@/context/AuthContext";

export function ContactSection() {
  const { profile } = useProfile();
  const { user, logout } = useAuth();

  return (
    
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Contact Information</CardTitle>
        <EditDialog section="contact" title="Contact Information" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>+{profile.phone.countryCode} {profile.phone.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>{user?.emailAddress || ''}</span>
        </div>
        <div className="flex items-center gap-3">
          <Linkedin className="w-4 h-4 text-muted-foreground" />
          <a href={profile.linkedInProfile} className="text-primary hover:underline">
            LinkedIn Profile
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Github className="w-4 h-4 text-muted-foreground" />
          <a href={profile.portfolio} className="text-primary hover:underline">
            Portfolio
          </a>
        </div>
      </CardContent>
    </Card>
  );
}