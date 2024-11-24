'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Upload, Mic, ClipboardList, ChevronRight, Goal } from 'lucide-react'

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
    <div className="w-full mx-auto p-6 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center min-h-[20vh]">
                <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-semibold mb-1">Streamlined Hiring Process</h2> <p className="text-sm md:text-base text-gray-600">Take the first step toward your dream career with just a single click.</p>
                </div>
              </div>
      <div className="flex flex-col md:flex-row items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 w-full md:w-auto">
            <motion.div
              className="relative z-10 bg-muted rounded-lg p-14 m-2 h-full"
              whileHover={{ scale: 1.05, zIndex: 20 }}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
            >
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-3 ${hoveredStep === index ? 'bg-blue-500' : 'bg-gray-700'} transition-colors duration-300`}>
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
              {index < steps.length - 1 && (
                <ChevronRight className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-500 h-8 w-8 hidden md:block" />
              )}
            </motion.div>
          </div>
        ))}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 transform -translate-y-1/2 hidden md:block" />
      </div>
    </div>
  )
}

