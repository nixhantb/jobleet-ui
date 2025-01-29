"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Upload, Mic, ClipboardList, Goal } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
];

export function JobApplicationWorkflow() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="w-full py-8 px-4 mx-auto bg-muted">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2 sm:text-3xl lg:text-4xl">
            Streamlined Hiring Process
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Take the first step toward your dream career with just a single click.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex"
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
            >
              <Card className="relative flex-1 border-0">
                <CardContent className="pt-8 pb-6 px-4 sm:px-6 flex flex-col items-center text-center">
                 
                  <div 
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full p-3 transition-colors duration-300 ${
                      hoveredStep === index ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                  >
                    <step.icon className="h-5 w-5 text-white" />
                  </div>

                 
                  <h3 className="text-lg font-semibold mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}