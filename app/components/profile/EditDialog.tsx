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
  section: 'basic' | 'education' | 'skills';
  title: string;
}

export function EditDialog({ section, title }: EditDialogProps) {
  const [open, setOpen] = useState(false);
  const { profile, updateProfile } = useProfile();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const updateData: any = {};

    switch (section) {
      case 'basic':
        updateData.profileSummary = data.profileSummary;
        updateData.dateOfBirth = data.dateOfBirth;
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

        updateData.socialMedias = [
          ...(profile.socialMedias || []), 
          {
            title: data.title,
            url: data.url
          }
        ];
        
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
              <div className="space-y-2">
                <h4 className="font-medium">Personal Information</h4>
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
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
                <div className="flex gap-2">
                  <Input
                    {...register('countryCode')}
                    type="number"
                    placeholder="Country Code"
                    defaultValue={profile.phone.countryCode}
                    className="w-1/3"
                  />
                  <Input
                    {...register('phoneNumber')}
                    placeholder="Phone Number"
                    defaultValue={profile.phone.phoneNumber}
                    className="w-2/3"
                  />
                </div>
                <h4 className="font-medium">Addresses</h4>
                <Input
                  {...register('street')}
                  placeholder="Street"
                  defaultValue={profile.address.street}
                />
                <div className="grid grid-cols-2 gap-2">
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
                </div>
                <div className="grid grid-cols-2 gap-2">
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
                  
                </div>
                <h4 className="font-medium">Socials</h4>
                {profile.socialMedias.map((social, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <Input
                    {...register(`socialMedias.${index}.title`)}
                    placeholder="Handle"
                    defaultValue={social.title}
                  />
                  <Input
                    {...register(`socialMedias.${index}.url`)}
                    placeholder="URL"
                    defaultValue={social.url}
                  />
                </div>
))}

              </div>
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