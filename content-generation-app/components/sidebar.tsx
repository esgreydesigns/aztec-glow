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
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border sidebar-3d flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-serif font-bold text-sidebar-foreground">Acrylic Alchemy</h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Content Creation Studio</p>
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
              className={`w-full justify-start h-auto p-4 text-left transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground button-3d"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{category.name}</div>
                <div className="text-xs opacity-70 truncate">{category.description}</div>
              </div>
            </Button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/50 text-center">v2.0 • Personal Edition</div>
      </div>
    </div>
  )
}
