'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { EditDialog } from "./EditDialog";
import { useAuth } from "@/context/AuthContext";

export function ContactSection() {
  const { profile } = useProfile();
  const { user } = useAuth();

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
          <span>{profile?.experience?.companyModel?.profile?.contactEmail?.emailAddress || ''}</span>
        </div>
        <div>
          {profile.socialMedias.map((social) => (
            <div key={social.id} className="flex items-center gap-3">
              {social.title === "LinkedIn" ? (
                <Linkedin className="w-4 h-4 text-muted-foreground" />
              ) : social.title === "GitHub" ? (
                <Github className="w-4 h-4 text-muted-foreground" />
              ) : null}
              <a href={social.url} className="text-primary hover:underline">
                {social.title} Profile
              </a>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}