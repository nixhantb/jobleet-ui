"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, Book, MessageCircle, FileText } from 'lucide-react';

export default function HelpMenu() {
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Help & Resources</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Book className="mr-2 h-4 w-4" />
          Documentation
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact Support
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          FAQs
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}