'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { CareerGrid } from "@/app/components/Career/CareerGrid";

export default function CareerSection() {
  return (
    <section className="container mx-auto  px-4 py-12 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Top Career Advice
        </h2>
        <Button variant="ghost" className="group gap-2">
          BROWSE ADVICE
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <CareerGrid />
    </section>
  )
}

