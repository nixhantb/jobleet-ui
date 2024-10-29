import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"


interface Feature {
    title: string
    description: string 
    icon: LucideIcon
}

interface FeaturesProps {
    title: string 
    features: Feature[]
}

export default function Features ({title, features} : FeaturesProps) {
    
    return (

        <section className="py-20 bg-muted">

            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                        <CardHeader>
                            <feature.icon className="h-10 w-10 mb-4 text-primary"/>
                            <CardTitle>{feature.title}</CardTitle>
                           
                        </CardHeader>
                        <CardHeader>
                            <CardContent>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            </div>
        </section>
    )
}