"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Mail,
  ChevronLeft,
  BookMarked,
} from 'lucide-react';
import { Button } from '@/components/ui/button';


const sidebarItems = [
  { icon: Users, label: 'Profile', href: '/seekers' },
  {icon: BookMarked, label: 'Saved Jobs', href: '/saved-jobs'},
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Mail, label: 'Messages', href: '/messages' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
    
      <div className={cn(
      "flex flex-col h-screen border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed &&   <Button variant="ghost"> <LayoutDashboard/>{<span className="ml-3">Dashboard</span>}</Button>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            collapsed && "rotate-180"
          )} />
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                collapsed ? "px-2" : "px-4",
                isActive && "bg-gray-100"
              )}
              onClick={() => router.push(item.href)}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          );
        })}
      </nav>
     
    </div>

    </>
  
  );
}