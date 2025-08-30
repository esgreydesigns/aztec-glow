"use client"
import { Button } from "@/components/ui/button"
import {
  FileText,
  ImageIcon,
  Video,
  Puzzle,
  HelpCircle,
  Gamepad2,
  Code,
  Music,
  BookOpen,
  Palette,
  Brain,
  Zap,
  File,
  Sparkles,
} from "lucide-react"

const contentCategories = [
  { id: "templates", name: "Templates", icon: FileText, description: "Documents, forms, layouts" },
  { id: "documents", name: "Digital Documents", icon: File, description: "PDFs, reports, contracts" },
  { id: "images", name: "Images", icon: ImageIcon, description: "Graphics, illustrations, art" },
  { id: "videos", name: "Videos", icon: Video, description: "Animations, clips, tutorials" },
  { id: "puzzles", name: "Puzzles", icon: Puzzle, description: "Brain teasers, logic games" },
  { id: "quizzes", name: "Quizzes", icon: HelpCircle, description: "Tests, assessments, trivia" },
  { id: "games", name: "Games", icon: Gamepad2, description: "Interactive experiences" },
  { id: "code", name: "Code", icon: Code, description: "Scripts, tools, utilities" },
  { id: "audio", name: "Audio", icon: Music, description: "Music, sounds, podcasts" },
  { id: "ebooks", name: "E-books", icon: BookOpen, description: "Guides, stories, manuals" },
  { id: "designs", name: "Designs", icon: Palette, description: "UI/UX, branding, layouts" },
  { id: "courses", name: "Courses", icon: Brain, description: "Learning materials, lessons" },
  { id: "automation", name: "Automation", icon: Zap, description: "Workflows, bots, scripts" },
]

interface SidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-purple-800/30 flex flex-col fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="p-6 border-b border-purple-800/30">
        <h1 className="text-xl font-serif font-bold text-white">Acrylic Alchemy</h1>
        <p className="text-sm text-purple-200 mt-1">Content Creation Studio</p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {contentCategories.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-4 text-left transition-all duration-200 rounded-lg group ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25 transform scale-105"
                  : "text-purple-100 hover:bg-purple-800/30 hover:text-white"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-purple-300 group-hover:text-purple-100"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium truncate transition-colors ${
                    isActive ? "text-white" : "text-purple-100"
                  }`}>
                    {category.name}
                  </div>
                  <div className={`text-xs opacity-70 truncate transition-colors ${
                    isActive ? "text-purple-100" : "text-purple-400"
                  }`}>
                    {category.description}
                  </div>
                </div>
              </div>
            </Button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-purple-800/30">
        <div className="text-xs text-purple-300 text-center">v2.0 • Personal Edition</div>
      </div>
    </div>
  )
}
