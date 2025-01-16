'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { UserProfile } from '@/types/profile';

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (newData: Partial<UserProfile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, profile: initialProfile }: { children: ReactNode; profile: UserProfile }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const updateProfile = (newData: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}