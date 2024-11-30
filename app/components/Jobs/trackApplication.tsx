"use client";

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Upload, Mic, ClipboardList, Goal } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Briefcase,
    title: "Job",
    description: "Find and select the job you want to apply for."
  },
  {
    icon: Upload,
    title: "Upload CV",
    description: "Submit your resume to start the application process."
  },
  {
    icon: Mic,
    title: "Interview",
    description: "Participate in a virtual interview in our platform to showcase your talents"
  },
  {
    icon: ClipboardList,
    title: "Track Application",
    description: "Monitor the status of your application in real-time."
  },
  {
    icon: Goal,
    title: "Get Hired",
    description: "Congratulations on your new job and kudos to your hardwork"
  }
]

export function JobApplicationWorkflow() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 mx-auto">
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4">Streamlined Hiring Process</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">Take the first step toward your dream career with just a single click.</p>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-between relative gap-4 sm:gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 w-full sm:w-auto">
            <motion.div
              className="h-full"
              whileHover={{ scale: 1.05, zIndex: 20 }}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
            >
              <Card className="relative bg-slate-50 border-0 h-full">
                <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
                  <div className={`absolute -top-4 sm:-top-5 left-1/2 transform -translate-x-1/2 rounded-full p-3 ${hoveredStep === index ? 'bg-blue-500' : 'bg-gray-700'} transition-colors duration-300`}>
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mt-6 sm:mt-8 mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
            
          </div>
        ))}
        
      </div>
    </div>
  )
}

