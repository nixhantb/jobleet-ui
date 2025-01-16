'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/context/ProfileContext";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface EditDialogProps {
  section: 'basic' | 'contact' | 'education' | 'skills';
  title: string;
}

export function EditDialog({ section, title }: EditDialogProps) {
  
  const [open, setOpen] = useState(false);
  const { profile, updateProfile } = useProfile();
  const { register, handleSubmit} = useForm();

  const onSubmit = (data: any) => {
    const updateData: any = {};
    
    switch (section) {
      case 'basic':
        updateData.profileSummary = data.profileSummary;
        updateData.dateOfBirth = data.dateOfBirth;
        break;
      case 'contact':
        updateData.phone = {
          ...profile.phone,
          countryCode: parseInt(data.countryCode),
          phoneNumber: data.phoneNumber,
        };
        updateData.address = {
          ...profile.address,
          street: data.street,
          city: data.city,
          state: data.state,
          country: data.country,
          postalCode: data.postalCode,
        };
        break;
      case 'education':
        updateData.education = {
          ...profile.education,
          degree: data.degree,
          major: data.major,
          institution: data.institution,
          graduationDate: data.graduationDate,
          cgpa: parseFloat(data.cgpa),
        };
        break;
      case 'skills':
        updateData.skills = {
          ...profile.skills,
          title: data.skills.split(',').map((s: string) => s.trim()),
        };
        break;
    }

    updateProfile(updateData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {section === 'basic' && (
            <>
              <Textarea
                {...register('profileSummary')}
                defaultValue={profile.profileSummary}
                placeholder="Profile Summary"
              />
              <Input
                {...register('dateOfBirth')}
                type="date"
                defaultValue={new Date(profile.dateOfBirth).toISOString().split('T')[0]}
              />
              <Input
       
                {...register("experienceLevel")}
                className="input"
      />
            </>
          )}
          
          {section === 'contact' && (
            <>
              <Input
                {...register('countryCode')}
                type="number"
                placeholder="Country Code"
                defaultValue={profile.phone.countryCode}
              />
              <Input
                {...register('phoneNumber')}
                placeholder="Phone Number"
                defaultValue={profile.phone.phoneNumber}
              />
              <Input
                {...register('street')}
                placeholder="Street"
                defaultValue={profile.address.street}
              />
              <Input
                {...register('city')}
                placeholder="City"
                defaultValue={profile.address.city}
              />
              <Input
                {...register('state')}
                placeholder="State"
                defaultValue={profile.address.state}
              />
              <Input
                {...register('country')}
                placeholder="Country"
                defaultValue={profile.address.country}
              />
              <Input
                {...register('postalCode')}
                placeholder="Postal Code"
                defaultValue={profile.address.postalCode}
              />
            </>
          )}

          {section === 'education' && (
            <>
              <Input
                {...register('degree')}
                placeholder="Degree"
                defaultValue={profile.education.degree}
              />
              <Input
                {...register('major')}
                placeholder="Major"
                defaultValue={profile.education.major}
              />
              <Input
                {...register('institution')}
                placeholder="Institution"
                defaultValue={profile.education.institution}
              />
              <Input
                {...register('graduationDate')}
                type="date"
                defaultValue={profile.education.graduationDate}
              />
              <Input
                {...register('cgpa')}
                type="number"
                step="0.1"
                placeholder="CGPA"
                defaultValue={profile.education.cgpa}
              />
            </>
          )}

          {section === 'skills' && (
            <Textarea
              {...register('skills')}
              placeholder="Skills (comma-separated)"
              defaultValue={profile.skills.title.join(', ')}
            />
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}