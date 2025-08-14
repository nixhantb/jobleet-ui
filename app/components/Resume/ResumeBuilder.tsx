import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Download } from 'lucide-react';
import NavbarLists from '../Navbar/NavbarLists';

interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

interface Skills {
  languages: string;
  crmTools: string;
  databases: string;
  webServices: string;
  cloudDevops: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  achievements: string[];
}

interface Project {
  title: string;
  duration: string;
  description: string[];
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  objective: string;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
}

type ActiveView = 'form' | 'preview';

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    
        "personalInfo": {
          "name": "Aarav Menon",
          "location": "Toronto, Canada",
          "phone": "(+1)647-832-9451",
          "email": "aarav.menon.dev@gmail.com",
          "linkedin": "linkedin.com/in/aaravmenon",
          "github": "github.com/aaravdev"
        },
        "objective": "Backend Engineer with 4+ years of experience architecting and delivering high-performance systems using Node.js, AWS, and microservices.",
        "skills": {
          "languages": "JavaScript, TypeScript, Node.js, Go, Python, SQL",
          "crmTools": "Salesforce, HubSpot, Zoho CRM, Jira, Jenkins, GitHub Actions",
          "databases": "PostgreSQL, MongoDB, MySQL, Redis, GraphQL",
          "webServices": "REST APIs, gRPC, WebSockets",
          "cloudDevops": "AWS, Docker, Kubernetes, Terraform, CI/CD pipelines"
        },
        "experience": [
          {
            "company": "NimbusTech, Remote",
            "position": "Backend Engineer",
            "duration": "May 2022 - Present",
            "achievements": [
              "Designed and deployed a distributed microservices architecture handling 1M+ API requests per day.",
              "Implemented GraphQL federation across 6 services, improving query performance by 68%.",
              "Built a serverless job scheduler on AWS Lambda, reducing infrastructure costs by 40%.",
              "Automated deployment workflows with GitHub Actions and Terraform, cutting release cycles by 50%."
            ]
          },
          {
            "company": "CloudStrata, Toronto, Canada",
            "position": "Software Developer",
            "duration": "Jan 2020 - Apr 2022",
            "achievements": [
              "Developed and maintained a customer analytics dashboard in Node.js and React, serving 300+ B2B clients.",
              "Optimized PostgreSQL queries and indexes, reducing page load times from 4s to under 800ms.",
              "Implemented Redis caching for high-traffic endpoints, decreasing API latency by 72%.",
              "Collaborated with the DevOps team to migrate on-premise infrastructure to AWS."
            ]
          }
        ],
        "projects": [
          {
            "title": "SkillMatch AI",
            "duration": "Aug 2021 - Present",
            "description": [
              "Built an AI-powered talent matching platform using Python, FastAPI, and Hugging Face Transformers.",
              "Integrated real-time job scraping and NLP-based resume parsing with Elasticsearch indexing.",
              "Deployed a recommendation engine leveraging AWS SageMaker for skill-based candidate ranking."
            ]
          }
        ],
        "education": [
          {
            "institution": "University of Toronto",
            "degree": "MSc in Computer Science",
            "duration": "Sep 2024 - Present"
          },
          {
            "institution": "University of Waterloo",
            "degree": "BSc in Computer Science",
            "duration": "Sep 2016 - Jun 2020"
          }
        ],
        "certifications": [
          "AWS Certified Solutions Architect – Associate",
          "Google Cloud Professional Cloud Developer"
        ]
      
      
  });

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSkills = (field: keyof Skills, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [field]: value }
    }));
  };

  const addExperience = (): void => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', achievements: [''] }]
    }));
  };

  const updateExperience = (index: number, field: keyof Omit<Experience, 'achievements'>, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addAchievement = (expIndex: number): void => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
      )
    }));
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          achievements: exp.achievements.map((ach, j) => j === achIndex ? value : ach)
        } : exp
      )
    }));
  };

  const removeExperience = (index: number): void => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addProject = (): void => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', duration: '', description: [''] }]
    }));
  };

  const updateProject = (index: number, field: keyof Omit<Project, 'description'>, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const addProjectDescription = (projIndex: number): void => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? { ...proj, description: [...proj.description, ''] } : proj
      )
    }));
  };

  const updateProjectDescription = (projIndex: number, descIndex: number, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? {
          ...proj,
          description: proj.description.map((desc, j) => j === descIndex ? value : desc)
        } : proj
      )
    }));
  };

  const removeProject = (index: number): void => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addEducation = (): void => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', duration: '' }]
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number): void => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addCertification = (): void => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const updateCertification = (index: number, value: string): void => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => i === index ? value : cert)
    }));
  };

  const removeCertification = (index: number): void => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const downloadPDF = (): void => {
    const resumeElement = document.getElementById('resume-preview');
    if (resumeElement) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        
        const styles = Array.from(document.styleSheets)
          .map((sheet) => {
            try {
              return Array.from(sheet.cssRules)
                .map(rule => rule.cssText)
                .join('\n');
            } catch {
              return ''; 
            }
          })
          .join('\n');
  
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume</title>
              <style>
                ${styles}
                body {
                  margin: 0;
                  padding: 0.5in;
                  font-family: inherit;
                  -webkit-print-color-adjust: exact;
                }
                .resume-content {
                  width: 100%;
                  max-width: 100%;
                }
                @media print {
                  body { margin: 0; padding: 0.5in; }
                  .resume-content { page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <div class="resume-content">
                ${resumeElement.innerHTML}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
  
        
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };
  
  
  const ResumePreview: React.FC = () => (
    <div id="resume-preview" className="w-full max-w-2xl mx-auto bg-white p-8 shadow-lg h-screen overflow-y-auto" style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Header */}
      <div className="text-center border-b border-black pb-2 mb-4">
        <h1 className="text-xl font-bold mb-1">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="text-sm">
          {resumeData.personalInfo.location && `${resumeData.personalInfo.location}, `}
          {resumeData.personalInfo.phone && `${resumeData.personalInfo.phone}, `}
          {resumeData.personalInfo.email}
        </p>
        <p className="text-sm">
          {resumeData.personalInfo.linkedin && `LinkedIn: ${resumeData.personalInfo.linkedin}`}
          {resumeData.personalInfo.github && `, GitHub: ${resumeData.personalInfo.github}`}
        </p>
      </div>

      {/* Objective */}
      {resumeData.objective && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">OBJECTIVE</h2>
          <p className="text-sm leading-relaxed">{resumeData.objective}</p>
        </div>
      )}

      {/* Skills */}
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">SKILLS</h2>
        <div className="text-sm space-y-1">
          {resumeData.skills.languages && (
            <p><span className="font-bold">Languages/Frameworks:</span> {resumeData.skills.languages}</p>
          )}
          {resumeData.skills.crmTools && (
            <p><span className="font-bold">CRM & Tools:</span> {resumeData.skills.crmTools}</p>
          )}
          {resumeData.skills.databases && (
            <p><span className="font-bold">Databases & Integration:</span> {resumeData.skills.databases}</p>
          )}
          {resumeData.skills.webServices && (
            <p><span className="font-bold">Web Services:</span> {resumeData.skills.webServices}</p>
          )}
          {resumeData.skills.cloudDevops && (
            <p><span className="font-bold">Cloud & DevOps:</span> {resumeData.skills.cloudDevops}</p>
          )}
        </div>
      </div>

      {/* Experience */}
      {resumeData.experience.some(exp => exp.company || exp.position) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              {exp.company && (
                <>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold">{exp.company}</p>
                    <p className="text-sm">{exp.duration}</p>
                  </div>
                  {exp.position && <p className="text-sm italic">{exp.position}</p>}
                  {exp.achievements.some(ach => ach) && (
                    <ul className="list-disc ml-4 mt-1">
                      {exp.achievements.filter(ach => ach).map((achievement, achIndex) => (
                        <li key={achIndex} className="text-sm leading-relaxed">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.some(proj => proj.title) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">PROJECTS</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-3">
              {project.title && (
                <>
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold">{project.title}</p>
                    <p className="text-sm">{project.duration}</p>
                  </div>
                  {project.description.some(desc => desc) && (
                    <ul className="list-disc ml-4 mt-1">
                      {project.description.filter(desc => desc).map((desc, descIndex) => (
                        <li key={descIndex} className="text-sm leading-relaxed">{desc}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">EDUCATION</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              {edu.institution && (
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-sm font-bold">{edu.institution}</p>
                    {edu.degree && <p className="text-sm">{edu.degree}</p>}
                  </div>
                  <p className="text-sm">{edu.duration}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications.some(cert => cert) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-black mb-2">CERTIFICATIONS</h2>
          {resumeData.certifications.filter(cert => cert).map((cert, index) => (
            <p key={index} className="text-sm mb-1">{cert}</p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarLists/>
      <Button onClick={downloadPDF} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
              <Download size={16} />
              <span>Download CV</span>
            </Button>

      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 h-screen">
      
        <div className="flex-1 h-full overflow-y-auto p-6 bg-white shadow rounded">
          {/* Form Column */}
          <div className="space-y-6">
                                  {/* Preview Column - Always Visible */}
          
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo('name', e.target.value)}
                      placeholder="Nishant Rajjade"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        placeholder="London, UK"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        placeholder="(+44)7775-343-573"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="nishant07@gmail.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        placeholder="linkedin.com/in/nishant"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                        placeholder="github.com/nishant"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
      
              {/* Objective */}
              <Card>
                <CardHeader>
                  <CardTitle>Objective</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={resumeData.objective}
                    onChange={(e) => setResumeData(prev => ({ ...prev, objective: e.target.value }))}
                    placeholder="Backend Engineer with 3+ years of experience designing and building scalable systems using .NET Core, Azure, and Dynamics 365"
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Languages/Frameworks</Label>
                    <Input
                      value={resumeData.skills.languages}
                      onChange={(e) => updateSkills('languages', e.target.value)}
                      placeholder="C#, .NET Core, Python, JavaScript, TypeScript, React, LINQ"
                    />
                  </div>
                  <div>
                    <Label>CRM & Tools</Label>
                    <Input
                      value={resumeData.skills.crmTools}
                      onChange={(e) => updateSkills('crmTools', e.target.value)}
                      placeholder="Dynamics 365, PowerApps, PowerBI, Azure DevOps, Jenkins, CICD"
                    />
                  </div>
                  <div>
                    <Label>Databases & Integration</Label>
                    <Input
                      value={resumeData.skills.databases}
                      onChange={(e) => updateSkills('databases', e.target.value)}
                      placeholder="Dynamics 365, SQL Server, SharePoint, Dataverse, REST API, Custom Connectors"
                    />
                  </div>
                  <div>
                    <Label>Web Services</Label>
                    <Input
                      value={resumeData.skills.webServices}
                      onChange={(e) => updateSkills('webServices', e.target.value)}
                      placeholder="SQL Server, PostgreSQL, Power BI"
                    />
                  </div>
                  <div>
                    <Label>Cloud & DevOps</Label>
                    <Input
                      value={resumeData.skills.cloudDevops}
                      onChange={(e) => updateSkills('cloudDevops', e.target.value)}
                      placeholder="Azure, Docker, Git, REST APIs, Swagger"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Experience</CardTitle>
                    <Button onClick={addExperience} size="sm" variant="outline">
                      <Plus size={16} className="mr-1" />
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              placeholder="Ethicon, Remote"
                            />
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input
                              value={exp.duration}
                              onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                              placeholder="Jun 2023 - Jan 2025"
                            />
                          </div>
                        </div>
                        <Button onClick={() => removeExperience(index)} variant="ghost" size="sm" className="text-red-500">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(index, 'position', e.target.value)}
                          placeholder="Software Engineer I"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <Label>Achievements</Label>
                          <Button onClick={() => addAchievement(index)} size="sm" variant="outline">
                            <Plus size={14} className="mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2 mt-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <Textarea
                              key={achIndex}
                              value={achievement}
                              onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                              placeholder="Developed D365 solutions across two product teams..."
                              rows={2}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Second Column */}
            <div className="space-y-6">
              {/* Projects */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Projects</CardTitle>
                    <Button onClick={addProject} size="sm" variant="outline">
                      <Plus size={16} className="mr-1" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Project Title</Label>
                            <Input
                              value={project.title}
                              onChange={(e) => updateProject(index, 'title', e.target.value)}
                              placeholder="JobLeet Recruitment CRM"
                            />
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input
                              value={project.duration}
                              onChange={(e) => updateProject(index, 'duration', e.target.value)}
                              placeholder="Jan 2023 - Present"
                            />
                          </div>
                        </div>
                        <Button onClick={() => removeProject(index)} variant="ghost" size="sm" className="text-red-500">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <Label>Description</Label>
                          <Button onClick={() => addProjectDescription(index)} size="sm" variant="outline">
                            <Plus size={14} className="mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="space-y-2 mt-2">
                          {project.description.map((desc, descIndex) => (
                            <Textarea
                              key={descIndex}
                              value={desc}
                              onChange={(e) => updateProjectDescription(index, descIndex, e.target.value)}
                              placeholder="Integrated LLM-powered job recommendation features..."
                              rows={2}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Education</CardTitle>
                    <Button onClick={addEducation} size="sm" variant="outline">
                      <Plus size={16} className="mr-1" />
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-4">
                          <div>
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                              placeholder="York St. John University, London"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                placeholder="MSc Research in Management Studies"
                              />
                            </div>
                            <div>
                              <Label>Duration</Label>
                              <Input
                                value={edu.duration}
                                onChange={(e) => updateEducation(index, 'duration', e.target.value)}
                                placeholder="Feb 2025 - Present"
                              />
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => removeEducation(index)} variant="ghost" size="sm" className="text-red-500">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Certifications</CardTitle>
                    <Button onClick={addCertification} size="sm" variant="outline">
                      <Plus size={16} className="mr-1" />
                      Add Certification
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={cert}
                        onChange={(e) => updateCertification(index, e.target.value)}
                        placeholder="PL-400 (Microsoft Power Platform Developer) - In Progress (Training at Microsoft Learn)"
                      />
                      <Button onClick={() => removeCertification(index)} variant="ghost" size="sm" className="text-red-500">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </CardContent>

              </Card>
       
            </div>
         
          </div>
          <div className="flex-1 h-full overflow-y-auto p-6 bg-white shadow rounded">
            <ResumePreview />
            
          </div>
        
        </div>
      </div>
    
  );
};

export default ResumeBuilder;