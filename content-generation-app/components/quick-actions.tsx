"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, TrendingUp, Zap, Sparkles, FileText, ImageIcon, Video } from "lucide-react"

interface QuickActionsProps {
  onQuickGenerate: (type: string, prompt: string) => void
  isGenerating: boolean
}

export function QuickActions({ onQuickGenerate, isGenerating }: QuickActionsProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const quickActions = [
    {
      id: "blog-post",
      title: "Blog Post",
      description: "Create engaging blog content",
      icon: FileText,
      prompt: "Write a comprehensive blog post about the latest trends in digital marketing",
      category: "documents",
      color: "blue"
    },
    {
      id: "social-media",
      title: "Social Media Post",
      description: "Craft viral social content",
      icon: Sparkles,
      prompt: "Create an engaging social media post about productivity tips for remote workers",
      category: "documents",
      color: "purple"
    },
    {
      id: "product-image",
      title: "Product Image",
      description: "Generate product visuals",
      icon: ImageIcon,
      prompt: "Create a professional product image of a sleek wireless headset on a minimalist background",
      category: "images",
      color: "green"
    },
    {
      id: "video-script",
      title: "Video Script",
      description: "Write compelling video content",
      icon: Video,
      prompt: "Write a 2-minute video script about the benefits of sustainable living",
      category: "videos",
      color: "orange"
    }
  ]

  const handleQuickAction = (action: typeof quickActions[0]) => {
    setSelectedAction(action.id)
    onQuickGenerate(action.category, action.prompt)
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          Quick Actions
        </CardTitle>
        <CardDescription className="text-base">Jumpstart your creativity with pre-built templates</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            const isActive = selectedAction === action.id

            return (
              <div
                key={action.id}
                className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border/50 hover:border-primary/30 hover:bg-primary/5"
                }`}
                onClick={() => handleQuickAction(action)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      action.color === "blue" ? "bg-blue-500/10 text-blue-600" :
                      action.color === "purple" ? "bg-purple-500/10 text-purple-600" :
                      action.color === "green" ? "bg-green-500/10 text-green-600" :
                      "bg-orange-500/10 text-orange-600"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {action.description}
                      </p>
                      <Badge
                        variant="outline"
                        className="mt-2 text-xs border-border/50"
                      >
                        {action.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 border border-border/30">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Pro tip: Customize prompts for better results</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
