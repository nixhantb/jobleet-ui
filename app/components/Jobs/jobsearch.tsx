"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';

export default function JobSearch() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('search', searchTerm);
    if (location) queryParams.append('location', location);

    router.push(`/jobs?${queryParams.toString()}`);
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">

        

        <motion.form
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-card shadow-lg rounded-xl p-2 md:p-3 flex flex-col md:flex-row gap-3">

            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Briefcase className="h-5 w-5" />
              </div>
              <Input
                type="text"
                placeholder="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 h-12 md:h-14 text-base bg-background border-0 transition-colors"
              />
            </div>


            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-11 h-12 md:h-14 text-base bg-background border-0 transition-colors"
              />
            </div>


            <Button
              type="submit"
              size="lg"
              className="h-12 md:h-14 px-8 text-base font-semibold"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Jobs
            </Button>
          </div>
        </motion.form>


        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Popular Searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Remote', 'Full-Time', 'Software Engineer', 'Marketing', 'Design'].map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={() => setSearchTerm(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}