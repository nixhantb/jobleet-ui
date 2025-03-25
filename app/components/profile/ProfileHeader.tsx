'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { Briefcase, Calendar, Github, Globe, Linkedin, MapPin, Phone, PhoneCall, Twitter } from "lucide-react";
import { EditDialog } from "./EditDialog";
import { useAuth } from "@/context/AuthContext";

export function ProfileHeader() {
  const { profile } = useProfile();
  const { user } = useAuth();

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Profile"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          
          <div className="flex-1 text-center md:text-left">
           
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 mb-4">
              <h1 className="text-2xl font-bold">User Profile</h1>
              <EditDialog section="basic" title="Basic Information" />
            </div>

           
            <h2 className="text-xl sm:text-2xl font-bold">
              {profile?.personNameModel?.firstName || "First Name"}{" "}
              {profile?.personNameModel?.lastName || "Last Name"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {profile?.profileSummary || "No profile summary available."}
            </p>

            <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 items-center sm:items-start">
              {profile?.phone && (
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    + {profile.phone.countryCode} {profile.phone.phoneNumber}
                  </span>
                </div>
              )}

              {profile?.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {profile.address.city || "City"},{" "}
                    {profile.address.country || "Country"}
                  </span>
                </div>
              )}
              {profile?.dateOfBirth && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(profile.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            {Array.isArray(profile?.socialMedias) && profile.socialMedias.length > 0 ? (
              <div className="flex flex-row gap-2 mb-4">
                {profile.socialMedias.map((social) => (
                  <div key={social.id} className="flex items-center gap-3">
                    {
                  social.title === "LinkedIn" ? (
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                    ) : social.title === "GitHub" ? (
                      <Github className="w-4 h-4 text-muted-foreground" />
                    ) :
                      social.title === "X" ? (
                        <Twitter className="w-4 h-4 text-muted-foreground" ></Twitter>
                      ) :
                        social.title === "Website" ?
                          (
                            <Globe className="w-4 h-4 text-muted-foreground" ></Globe>
                          ) :
                        
                          null}
                    <a
                      href={social.url}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.title}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No social media links available.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
