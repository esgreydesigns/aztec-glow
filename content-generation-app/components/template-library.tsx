"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Star,
  Download,
  Eye,
  Zap,
  Code,
  TrendingUp,
  Lightbulb,
  FileText,
  CheckSquare,
  BarChart3,
} from "lucide-react"

const templates = [
  // AI Content & Tools
  {
    id: "chatgpt-prompts-marketing",
    title: "30 ChatGPT Prompts for Marketing",
    description: "Ready-to-use prompts for social media, content creation, and campaign planning",
    category: "ai-content",
    price: "$5",
    rating: 4.8,
    downloads: 1247,
    type: "prompt-guide",
    tags: ["Marketing", "Social Media", "Content Creation"],
    icon: Zap,
  },
  {
    id: "ai-headline-generator",
    title: "AI Headline Generator Pack",
    description: "50+ proven headline templates with AI optimization prompts",
    category: "ai-content",
    price: "$7",
    rating: 4.9,
    downloads: 892,
    type: "template-pack",
    tags: ["Headlines", "Copywriting", "AI"],
    icon: FileText,
  },
  {
    id: "affirmation-generator",
    title: "Personalized Affirmation Generator",
    description: "AI-powered affirmation templates based on user goals and energy alignment",
    category: "ai-content",
    price: "$5",
    rating: 4.7,
    downloads: 634,
    type: "template-pack",
    tags: ["Wellness", "Personal Development", "AI"],
    icon: Zap,
  },

  // Code & Software Solutions
  {
    id: "api-wrapper-snippets",
    title: "Deprecated API Wrapper Kit",
    description: "Code snippets for wrapping and modernizing deprecated APIs",
    category: "code-solutions",
    price: "$12",
    rating: 4.6,
    downloads: 445,
    type: "code-script",
    tags: ["API", "JavaScript", "Python"],
    icon: Code,
  },
  {
    id: "script-fixes-tutorial",
    title: "Common Script Fixes Guide",
    description: "Step-by-step solutions for frequently breaking automation scripts",
    category: "code-solutions",
    price: "$8",
    rating: 4.8,
    downloads: 723,
    type: "tutorial",
    tags: ["Debugging", "Automation", "Scripts"],
    icon: Code,
  },
  {
    id: "ui-overhaul-templates",
    title: "Niche Utility UI Templates",
    description: "Modern interface templates for outdated but functional tools",
    category: "code-solutions",
    price: "$15",
    rating: 4.5,
    downloads: 312,
    type: "template-pack",
    tags: ["UI/UX", "Templates", "Modernization"],
    icon: Code,
  },

  // Market Analysis Reports
  {
    id: "micro-niche-report",
    title: "Micro-Niche Identification Report",
    description: "Template for analyzing untapped niches with consistent demand",
    category: "market-analysis",
    price: "$10",
    rating: 4.9,
    downloads: 567,
    type: "analysis-template",
    tags: ["Market Research", "Niche Analysis", "Business"],
    icon: TrendingUp,
  },
  {
    id: "competitor-gap-analysis",
    title: "Competitor Gap Analysis Kit",
    description: "Framework for identifying missing features in competitor products",
    category: "market-analysis",
    price: "$12",
    rating: 4.7,
    downloads: 389,
    type: "analysis-template",
    tags: ["Competitive Analysis", "Strategy", "Business"],
    icon: BarChart3,
  },
  {
    id: "subscription-churn-analysis",
    title: "Subscription Churn Analysis Template",
    description: "Analyze why subscription services have high churn rates",
    category: "market-analysis",
    price: "$8",
    rating: 4.6,
    downloads: 234,
    type: "analysis-template",
    tags: ["SaaS", "Analytics", "Customer Retention"],
    icon: TrendingUp,
  },

  // Conceptual Development
  {
    id: "abandoned-idea-guide",
    title: "Abandoned Idea Development Guide",
    description: "Framework for reviving and developing innovative concepts from old posts",
    category: "conceptual",
    price: "$6",
    rating: 4.8,
    downloads: 445,
    type: "guide",
    tags: ["Innovation", "Idea Development", "Strategy"],
    icon: Lightbulb,
  },
  {
    id: "poc-to-product-checklist",
    title: "PoC to Product Checklist",
    description: "Step-by-step guide for transforming proof of concepts into commercial products",
    category: "conceptual",
    price: "$9",
    rating: 4.7,
    downloads: 312,
    type: "checklist",
    tags: ["Product Development", "Commercialization", "Strategy"],
    icon: CheckSquare,
  },
]

const categories = [
  { id: "all", label: "All Templates", icon: FileText },
  { id: "ai-content", label: "AI Content & Tools", icon: Zap },
  { id: "code-solutions", label: "Code Solutions", icon: Code },
  { id: "market-analysis", label: "Market Analysis", icon: TrendingUp },
  { id: "conceptual", label: "Conceptual Development", icon: Lightbulb },
]

export function TemplateLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", ""))
      case "price-high":
        return Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", ""))
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold text-foreground">Template Library</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-5 w-full">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTemplates.map((template) => {
                const IconComponent = template.icon
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-accent" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="font-serif text-lg leading-tight">{template.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">{template.rating}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{template.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="font-semibold">
                          {template.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{template.description}</CardDescription>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
                          <Download className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {sortedTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No templates found</div>
                <div className="text-sm text-muted-foreground">Try adjusting your search or category filter</div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
