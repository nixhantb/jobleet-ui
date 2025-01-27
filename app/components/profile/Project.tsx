'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { GraduationCap } from "lucide-react";
import { EditDialog } from "./EditDialog";

export function ProjectsSection() {
    const { profile } = useProfile();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Projects
                </CardTitle>

                <div className="flex items-center gap-4"> {/* Add gap for spacing between links */}
                    {profile.projects.projectUrl && (
                        <a
                            href={profile.projects.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Project Website
                        </a>
                    )}

                    {profile.projects.gitHubUrl && (
                        <a
                            href={profile.projects.gitHubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            GitHub Repository
                        </a>
                    )}
                </div>

                <EditDialog section="education" title="Projects" />
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold">{profile.projects.title}</h3>
                        <p className="text-muted-foreground">{profile.projects.role}</p>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-muted-foreground">
                                Duration: {new Date(profile.projects.startDate).toLocaleDateString()} - {new Date(profile.projects.endDate).toLocaleDateString()}
                            </span>
                            {profile.projects.isOngoing && <span className="text-sm font-medium">Ongoing</span>}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold">Responsibilities</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {profile.projects.responsibilities.map((responsibility, index) => (
                                <li key={index}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold">Technologies Used</h4>
                        <ul className="list-inside text-sm text-muted-foreground">
                            <li className="list-disc">
                                {profile.projects.technologiesUsed.join(", ")}
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
