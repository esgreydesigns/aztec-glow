import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Code, TrendingUp, Lightbulb } from "lucide-react"
import Link from "next/link"

const productCategories = [
  {
    title: "AI Content & Tools",
    description: "Prompt guides, templates, and AI-powered utilities",
    icon: Zap,
    count: 12,
    examples: ["ChatGPT Prompt Guides", "Content Templates", "AI Headline Generators"],
  },
  {
    title: "Code & Software Solutions",
    description: "Scripts, fixes, and development resources",
    icon: Code,
    count: 8,
    examples: ["API Wrappers", "Script Fixes", "UI Templates"],
  },
  {
    title: "Market Analysis Reports",
    description: "Business insights and opportunity analyses",
    icon: TrendingUp,
    count: 15,
    examples: ["Niche Reports", "Market Gap Analysis", "Trend Insights"],
  },
  {
    title: "Conceptual Development",
    description: "Idea development and strategic planning guides",
    icon: Lightbulb,
    count: 6,
    examples: ["Idea Development Guides", "Strategic Plans", "Innovation Frameworks"],
  },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold text-foreground">Product Categories</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/templates">Browse Templates</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/editor">Create Template</Link>
          </Button>
          <Button className="bg-accent hover:bg-accent/90">
            <Zap className="h-4 w-4 mr-2" />
            Smart Generate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="font-serif text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{category.count} templates</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">Popular examples:</div>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <Badge key={example} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Explore Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
