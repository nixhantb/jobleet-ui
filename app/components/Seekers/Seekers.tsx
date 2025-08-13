
import axios from "axios"
import { useMemo, useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2 } from 'lucide-react'
import { ArrayInput } from "@/app/components/Seekers/array-input"
import { Stepper } from "@/app/components/Seekers/stepper"
import { Review } from "@/app/components/Seekers/review"

import { ThemeProvider } from "next-themes"
import NavbarLists from "@/app/components/Navbar/NavbarLists"
import { FormValues } from "@/types/seekers"
import { buildPayload, getDefaultValues, requiredByStep, steps } from "@/app/components/Seekers/utilities/Helpers"

export default function SeekersProfile() {
    const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })
    const [submitting, setSubmitting] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    const {
        control,
        register,
        formState: { errors },
        reset,
        trigger,
        watch,
        handleSubmit,
    } = useForm<FormValues>({
        mode: "onBlur",
        defaultValues: getDefaultValues(),
    })

    const eduFA = useFieldArray({ control, name: "education" })
    const expFA = useFieldArray({ control, name: "experience" })
    const qualFA = useFieldArray({ control, name: "qualifications" })
    const socFA = useFieldArray({ control, name: "socialMedias" })
    const projFA = useFieldArray({ control, name: "projects" })


    const values = watch()
    const reviewData = useMemo(() => buildPayload(values), [values])

    const isFirst = currentStep === 0
    const isLast = currentStep === steps.length - 1
    const percent = Math.round((currentStep / (steps.length - 1)) * 100)

    async function navigateTo(stepIndex: number) {
        setStatus({ type: null, message: "" })
        const stepId = steps[currentStep].id
        const required = requiredByStep[stepId] || []
        if (required.length) {
            const ok = await trigger(required as any, { shouldFocus: true })
            if (!ok) return
        }
        setCurrentStep(stepIndex)
    }

    async function goNext() {
        if (isLast) {
            handleSubmit(onSubmit)()
            return
        }
        await navigateTo(currentStep + 1)
    }

    function goBack() {
        setStatus({ type: null, message: "" })
        setCurrentStep((s) => Math.max(s - 1, 0))
    }

    async function onSubmit(vals: FormValues) {
        setSubmitting(true);
        try {
            const payload = buildPayload(vals);

            // Assuming you have the JWT token stored somewhere (e.g., localStorage or context)
            const token = localStorage.getItem('token');

            await axios.post(
                "http://localhost:5184/api/v1/Seekers",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStatus({ type: "success", message: "Your profile has been submitted successfully." });
            reset(getDefaultValues());
            setCurrentStep(0);
        } catch (err: any) {
            console.error(err);
            setStatus({ type: "error", message: String(err?.message || "Something went wrong") });
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NavbarLists />
            <main className="mx-auto max-w-[88rem] px-4 py-8">


                <header className="mb-6 space-y-4">
                    <div className="flex items-end justify-between">

                        <div>
                            <h1 className="text-2xl font-semibold">Let's Complete your Profile</h1>

                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">{`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].title}`}</div>
                            <div className="text-sm font-medium">{`${percent}% complete`}</div>
                        </div>
                    </div>
                    <Stepper
                        steps={steps as any}
                        current={currentStep}
                        onStepClick={(i) => navigateTo(i)}
                    />
                    <Progress value={percent} />
                </header>

                {status.type && (
                    <div className="mb-4">
                        <Alert variant={status.type === "error" ? "destructive" : "default"}>
                            <AlertTitle>{status.type === "error" ? "Submission failed" : "Submitted"}</AlertTitle>
                            <AlertDescription>{status.message}</AlertDescription>
                        </Alert>
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <Tabs value={steps[currentStep].id} className="w-full">
                        <TabsContent value="personal" className="space-y-6 pt-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="personName.firstName">First name</Label>
                                        <Input
                                            id="personName.firstName"
                                            placeholder="Ada"
                                            {...register("personName.firstName", { required: "First name is required" })}
                                        />
                                        {errors.personName?.firstName && <p className="text-sm text-red-600">{errors.personName.firstName.message as string}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="personName.middleName">Middle name</Label>
                                        <Input id="personName.middleName" placeholder="Lovelace" {...register("personName.middleName")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="personName.lastName">Last name</Label>
                                        <Input
                                            id="personName.lastName"
                                            placeholder="Byron"
                                            {...register("personName.lastName", { required: "Last name is required" })}
                                        />
                                        {errors.personName?.lastName && <p className="text-sm text-red-600">{errors.personName.lastName.message as string}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone.countryCode">Country code</Label>
                                        <Input
                                            id="phone.countryCode"
                                            type="number"
                                            placeholder="1"
                                            {...register("phone.countryCode", { valueAsNumber: true })}
                                        />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="phone.phoneNumber">Phone number</Label>
                                        <Input
                                            id="phone.phoneNumber"
                                            placeholder="5551234567"
                                            {...register("phone.phoneNumber", { required: "Phone number is required", minLength: { value: 5, message: "Phone number too short" } })}
                                        />
                                        {errors.phone?.phoneNumber && <p className="text-sm text-red-600">{errors.phone.phoneNumber.message as string}</p>}
                                    </div>
                                    <div className="space-y-2 sm:col-span-3">
                                        <Label htmlFor="dateOfBirth">Date of birth</Label>
                                        <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Address</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="address.street">Street</Label>
                                        <Input id="address.street" placeholder="123 Main St Apt 4B" {...register("address.street")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address.city">City</Label>
                                        <Input id="address.city" placeholder="City" {...register("address.city")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address.state">State</Label>
                                        <Input id="address.state" placeholder="State/Province" {...register("address.state")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address.postalCode">Postal code</Label>
                                        <Input id="address.postalCode" placeholder="12345" {...register("address.postalCode")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address.country">Country</Label>
                                        <Input id="address.country" placeholder="Country" {...register("address.country")} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="skills" className="space-y-6 pt-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile & Skills</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="profileSummary">Profile summary</Label>
                                        <Textarea id="profileSummary" placeholder="Short professional summary" className="min-h-[100px]" {...register("profileSummary")} />
                                    </div>
                                    <ArrayInput control={control} name="skills.title" label="Skill titles" placeholder="e.g., React" addText="Add skill" />
                                    <ArrayInput control={control} name="skills.description" label="Skill descriptions" placeholder="e.g., Frontend" addText="Add description" />
                                    <ArrayInput control={control} name="interests" label="Interests" placeholder="e.g., Hiking" addText="Add interest" />
                                    <ArrayInput control={control} name="achievements" label="Achievements" placeholder="e.g., Hackathon winner" addText="Add achievement" />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="education" className="space-y-6 pt-2">
                            <Card>
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Education</CardTitle>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => eduFA.append({ degree: "", major: "", institution: "", graduationDate: "", cgpa: 0 })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add education
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {eduFA.fields.map((field, i) => (
                                        <div key={field.id} className="grid gap-4 sm:grid-cols-2 rounded-lg border p-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`education.${i}.degree`}>Degree</Label>
                                                <Input id={`education.${i}.degree`} placeholder="B.Sc." {...register(`education.${i}.degree` as const)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`education.${i}.major`}>Major</Label>
                                                <Input id={`education.${i}.major`} placeholder="Computer Science" {...register(`education.${i}.major` as const)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`education.${i}.institution`}>Institution</Label>
                                                <Input id={`education.${i}.institution`} placeholder="University" {...register(`education.${i}.institution` as const)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`education.${i}.graduationDate`}>Graduation date</Label>
                                                <Input id={`education.${i}.graduationDate`} type="date" {...register(`education.${i}.graduationDate` as const)} />
                                            </div>
                                            <div className="space-y-2 sm:col-span-2">
                                                <Label htmlFor={`education.${i}.cgpa`}>CGPA</Label>
                                                <Input id={`education.${i}.cgpa`} type="number" step="0.01" placeholder="0.00" {...register(`education.${i}.cgpa` as const, { valueAsNumber: true })} />
                                            </div>
                                            <div className="sm:col-span-2 flex justify-end">
                                                <Button type="button" variant="ghost" onClick={() => eduFA.remove(i)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="experience" className="space-y-6 pt-2">
                            <Card>
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Experience</CardTitle>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            expFA.append({
                                                experienceLevel: "EntryLevel",
                                                company: "",
                                                responsibilities: [],
                                                experienceDateFrom: "",
                                                experienceDateTill: "",
                                            })
                                        }
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add experience
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {expFA.fields.map((field, i) => (
                                        <div key={field.id} className="grid gap-4 rounded-lg border p-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`experience.${i}.experienceLevel`}>Experience level</Label>
                                                    <Controller
                                                        control={control}
                                                        name={`experience.${i}.experienceLevel` as const}
                                                        render={({ field }) => (
                                                            <select
                                                                {...field}
                                                                id={`experience.${i}.experienceLevel`}
                                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                            >
                                                                <option value="EntryLevel">EntryLevel</option>
                                                                <option value="MidLevel">MidLevel</option>
                                                                <option value="Senior">Senior</option>
                                                                <option value="Lead">Lead</option>
                                                            </select>
                                                        )}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`experience.${i}.company`}>Company</Label>
                                                    <Input id={`experience.${i}.company`} placeholder="Company name" {...register(`experience.${i}.company` as const)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`experience.${i}.experienceDateFrom`}>From</Label>
                                                    <Input id={`experience.${i}.experienceDateFrom`} type="datetime-local" {...register(`experience.${i}.experienceDateFrom` as const)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`experience.${i}.experienceDateTill`}>Till</Label>
                                                    <Input id={`experience.${i}.experienceDateTill`} type="datetime-local" {...register(`experience.${i}.experienceDateTill` as const)} />
                                                </div>
                                            </div>
                                            <ArrayInput control={control} name={`experience.${i}.responsibilities`} label="Responsibilities" placeholder="e.g., Built X" addText="Add responsibility" />
                                            <div className="flex justify-end">
                                                <Button type="button" variant="ghost" onClick={() => expFA.remove(i)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="qualifications" className="space-y-6 pt-2">
                            <Card>
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Qualifications</CardTitle>
                                    <Button type="button" variant="outline" onClick={() => qualFA.append({ qualificationType: "Education", qualificationInformation: [] })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add qualification
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {qualFA.fields.map((field, i) => (
                                        <div key={field.id} className="grid gap-4 rounded-lg border p-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`qualifications.${i}.qualificationType`}>Qualification type</Label>
                                                <Input id={`qualifications.${i}.qualificationType`} placeholder="Education, Certification, etc." {...register(`qualifications.${i}.qualificationType` as const)} />
                                            </div>
                                            <ArrayInput control={control} name={`qualifications.${i}.qualificationInformation`} label="Information" placeholder="e.g., B.Sc." addText="Add info" />
                                            <div className="flex justify-end">
                                                <Button type="button" variant="ghost" onClick={() => qualFA.remove(i)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="socials" className="space-y-6 pt-2">
                            <Card>
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Social Media</CardTitle>
                                    <Button type="button" variant="outline" onClick={() => socFA.append({ title: "", url: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add social
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {socFA.fields.map((field, i) => (
                                        <div key={field.id} className="grid gap-4 sm:grid-cols-2 rounded-lg border p-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`socialMedias.${i}.title`}>Title</Label>
                                                <Input id={`socialMedias.${i}.title`} placeholder="LinkedIn" {...register(`socialMedias.${i}.title` as const)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`socialMedias.${i}.url`}>URL</Label>
                                                <Input id={`socialMedias.${i}.url`} placeholder="https://..." {...register(`socialMedias.${i}.url` as const)} />
                                            </div>
                                            <div className="sm:col-span-2 flex justify-end">
                                                <Button type="button" variant="ghost" onClick={() => socFA.remove(i)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="projects" className="space-y-6 pt-2">
                            <Card>
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Projects</CardTitle>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            projFA.append({
                                                title: "",
                                                responsibilities: [],
                                                technologiesUsed: [],
                                                role: "",
                                                startDate: "",
                                                endDate: "",
                                                projectUrl: "",
                                                gitHubUrl: "",
                                            })
                                        }
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add project
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {projFA.fields.map((field, i) => (
                                        <div key={field.id} className="grid gap-4 rounded-lg border p-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`projects.${i}.title`}>Title</Label>
                                                <Input id={`projects.${i}.title`} placeholder="Project name" {...register(`projects.${i}.title` as const)} />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`projects.${i}.role`}>Role</Label>
                                                    <Input id={`projects.${i}.role`} placeholder="Developer" {...register(`projects.${i}.role` as const)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`projects.${i}.startDate`}>Start date</Label>
                                                    <Input id={`projects.${i}.startDate`} type="date" {...register(`projects.${i}.startDate` as const)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`projects.${i}.endDate`}>End date</Label>
                                                    <Input id={`projects.${i}.endDate`} type="date" {...register(`projects.${i}.endDate` as const)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`projects.${i}.projectUrl`}>Project URL</Label>
                                                    <Input id={`projects.${i}.projectUrl`} placeholder="https://project..." {...register(`projects.${i}.projectUrl` as const)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`projects.${i}.gitHubUrl`}>GitHub URL</Label>
                                                    <Input id={`projects.${i}.gitHubUrl`} placeholder="https://github.com/..." {...register(`projects.${i}.gitHubUrl` as const)} />
                                                </div>
                                            </div>
                                            <ArrayInput control={control} name={`projects.${i}.technologiesUsed`} label="Technologies" placeholder="e.g., Next.js" addText="Add tech" />
                                            <ArrayInput control={control} name={`projects.${i}.responsibilities`} label="Responsibilities" placeholder="e.g., Built UI" addText="Add res." />
                                            <div className="flex justify-end">
                                                <Button type="button" variant="ghost" onClick={() => projFA.remove(i)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="review" className="space-y-6 pt-2">
                            <Review data={reviewData as any} />
                        </TabsContent>
                    </Tabs>

                    <nav className="sticky bottom-0 z-10 -mx-4 border-t bg-background px-4 py-4">
                        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
                            <div className="text-sm text-muted-foreground">{`${percent}% complete`}</div>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        reset(getDefaultValues())
                                        setCurrentStep(0)
                                        setStatus({ type: null, message: "" })
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button type="button" variant="outline" onClick={goBack} disabled={isFirst || submitting}>
                                    Back
                                </Button>
                                <Button type="button" onClick={goNext} disabled={submitting}>
                                    {isLast ? (submitting ? "Submitting..." : "Submit") : "Next"}
                                </Button>
                            </div>
                        </div>
                    </nav>
                </form>
            </main>
        </ThemeProvider>

    )
}
