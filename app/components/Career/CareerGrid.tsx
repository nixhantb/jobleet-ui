import { CareerCard } from "./CareerCard"
import InterviewImg from "../../assets/interview.jpg";
import JobsImage from "../../assets/Jobs.jpg";
import ResumeImg from "../../assets/resume.jpg";
import CoursesImg from "../../assets/courses.jpg";
const careerData = [
  {
    category: "Mock Interviews",
    title: "Real world interview experience with experts",
    imageUrl: InterviewImg,
    href: "/mock-interviews",
    categoryColor: "blue" as const
  },
  {
    category: "JOBS",
    title: "How to start looking for a job and optimise your profile",
    imageUrl: JobsImage,
    href: "/jobs",
    categoryColor: "default" as const
  },
  {
    category: "RESUME",
    title: "How to craft an ATS friendly resume to stand out in a crowd",
    imageUrl: ResumeImg,
    href: "/resume",
    categoryColor: "green" as const
  },
  {
    category: "Courses",
    title: "Courses from well qualified instructors to boost up your confidence",
    imageUrl: CoursesImg,
    href: "/courses",
    categoryColor: "red" as const
  }
]

export function CareerGrid() {
  return (

    <div className="container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {careerData.map((card, index) => (
        <CareerCard key={index} {...card} />
      ))}
    </div>
  )
}

