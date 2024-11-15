'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, BriefcaseConveyorBelt, Building, Building2 } from 'lucide-react'



export default function About() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [neonPosition, setNeonPosition] = useState(0)


    useEffect(() => {
        const interval = setInterval(() => {
            setNeonPosition((prev) => (prev + 1) % 100)
        }, 10)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-20 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">


                <div className="relative">

                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 z-10">
                        <div className="w-72 h-16 mx-auto mb-16 relative">
                            <div className="absolute inset-0 rounded-xl border border-gray-300 " />
                            <div className="absolute inset-[2px] rounded-lg border border-gray-300" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold">
                                    Why JobLeet?
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="absolute inset-0 pointer-events-none">

                        <div className="absolute top-11 left-1/2 -translate-x-1/2 w-[80%] h-[3px] bg-gray-300 dark:bg-gray-800 transition-colors duration-300">
                            <div
                                className="absolute top-10 left-0 w-[20%] h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                                style={{ left: `${neonPosition}%` }}
                            />
                        </div>


                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className="absolute top-1 h-44 w-[3px] bg-gray-300 dark:bg-gray-800 transition-colors duration-300"
                                style={{ left: `${25 + (index * 25)}%` }}
                            >
                                <div
                                    className="absolute w-full h-[20%] bg-gradient-to-b from-transparent via-current to-transparent"
                                    style={{
                                        top: `${neonPosition}%`,
                                        color: index === 0 ? 'rgb(59 130 246)' : index === 1 ? 'rgb(219 39 119)' : 'rgb(249 115 22)'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-24">
                        {[
                            
                            {
                                title: "Companies",
                                icon: (
                                    <Building2 />
                                ),
                                description: "Finding top talent has never been easier. As your trusted recruitment partner, JobLeet helps you identify the right candidates quickly and efficiently. Share your hiring needs with us, and we’ll do the heavy lifting—saving you time and ensuring you find the perfect fit.",
                                color: "purple",
                            },
                            {
                                title: "Employers",
                                icon: (
                                    <Building />
                                ),
                                description: "Build the team you need to succeed with JobLeet. From managing applications to scheduling interviews, we provide tools that simplify the hiring process. Need assistance finding exceptional talent? Just ask us—we’re here to make recruitment effortless and effective.",
                                color: "blue",
                            },
                            {
                                title: "Job Seekers",
                                icon: (
                                    <BriefcaseConveyorBelt />
                                ),
                                description: "Ready to take the next step in your career? JobLeet connects you with opportunities that match your skills and goals. With personalized job suggestions and real-time updates, we make your job search smooth and stress-free. Let us help you land your dream job!",
                                color: "blue",
                            }

                        ].map((card, index) => (
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="relative p-6 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 h-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-800">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {card.icon}
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                                {card.title}
                                            </h3>
                                        </div>
                                        <ArrowUpRight
                                            className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-all duration-300 ${hoveredCard === index ? 'transform translate-x-1 -translate-y-1' : ''
                                                }`}
                                        />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}