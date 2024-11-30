import { ArrowUpRight, Building2, Users2, UserCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from 'next/image';
import CompanyImg from '../assets/companies.jpg';
import EmployerImg from '../assets/employers.jpg';
import SeekersImg from '../assets/seekers.jpg';

const cardData = [
  {
    title: "Job Seekers",
    description: "Ready to take the next step in your career? JobLeet connects you with opportunities that match your skills and goals. With personalized job suggestions and real-time updates.",
    imgSrc: SeekersImg,
    altText: "Job Seekers using JobLeet",
  
    buttonText: "Upload CV",
    icon: UserCircle,
  },
  {
    title: "Companies",
    description: "Finding top talent has never been easier. As your trusted recruitment partner, JobLeet helps you identify the right candidates quickly and efficiently.",
    imgSrc: CompanyImg,
    altText: "Companies using JobLeet",
   
    buttonText: "Start Hiring",
    icon: Building2,
  },
  {
    title: "Employers",
    description: "Build the team you need to succeed with JobLeet. From managing applications to scheduling interviews, we provide tools that simplify the hiring process.",
    imgSrc: EmployerImg,
    altText: "Employers using JobLeet",
    buttonText: "Find Talents",
    icon: Users2,
  }
];

interface Props {
  title: string 
  description: string 
  imgSrc: StaticImageData
  altText: string 
  buttonText: string 
  icon:  React.ElementType
  
}
function AboutUsCard({ title, description, imgSrc, altText, buttonText, icon: Icon }: Props) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="relative pb-2">
        <div className="mb-2 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="relative h-40 rounded-lg overflow-hidden mb-4">
          <Image 
            src={imgSrc}
            alt={altText} 
            layout="fill" 
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full text-sm transition-colors">
          {buttonText}
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function AboutUs() {
  return (
    <section className="py-20 bg-muted mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Fast, Simple, and Effective Hiring Solutions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
              <AboutUsCard key={index} title={card.title} description={card.description} imgSrc={card.imgSrc} altText={card.altText} buttonText={card.buttonText} icon={card.icon}/>
          ))}
        </div>
      </div>
    </section>
  )
}

