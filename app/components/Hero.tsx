'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { BriefcaseIcon, ChartBarIcon, GlobeIcon, LightbulbIcon, UserIcon,RocketIcon } from "lucide-react"
import JobSearch from "./Jobs/jobsearch"


interface HeroProps {
  title: string
  description: string

}
// Dummy data : Later it will be updated with real data
const carouselItems = [
  { icon: UserIcon, title: "Diverse Talent Pool", description: "Access candidates from all backgrounds" },
  { icon: BriefcaseIcon, title: "10,000+ Jobs", description: "Find your dream job from our vast database" },
  { icon: ChartBarIcon, title: "Advanced Analytics", description: "Make data-driven hiring decisions" },
  { icon: GlobeIcon, title: "Global Reach", description: "Connect with talent worldwide" },
  { icon: LightbulbIcon, title: "AI Matching", description: "Smart algorithms for perfect job fits" },
  { icon: RocketIcon, title: "Fast Hiring", description: "Streamline your recruitment process" },
]

export default function Hero({
  title,
  description,
}: HeroProps) {
  return (
    <section className="relative py-20 w-auto overflow-hidden">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              {description}
            </p>
            
          </div>
          <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none shadow-lg">
                      <CardContent className="flex flex-col items-center justify-center p-6 h-64">
                        <item.icon className="w-16 h-16 mb-4 text-primary" />
                        <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                        <p className="text-center text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
            </Carousel>
            
          </div>
          
        </div>
        <JobSearch/>
       
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-0"></div>
    </section>
  )
}