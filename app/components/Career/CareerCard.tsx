import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface CareerCardProps {
  category: string
  title: string
  imageUrl: StaticImageData
  href: string
  categoryColor?: 'default' | 'blue' | 'green' | 'red'
}

export function CareerCard({ category, title, imageUrl, href, categoryColor = 'default' }: CareerCardProps) {
  const colorVariants = {
    default: "bg-primary hover:bg-primary/90",
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600"
  }

  return (
   
    <Link href={href} className="group transition-transform duration-200 hover:-translate-y-1">
      <Card className="overflow-hidden border-none shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </CardHeader>
        <CardContent className="relative -mt-6 space-y-4 p-4">
          <Badge className={`${colorVariants[categoryColor]} px-4 py-1 text-white`}>
            {category}
          </Badge>
          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
   

  )
}

