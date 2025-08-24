"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Download, Copy, RefreshCw, Edit3, Save, FileText, ImageIcon, Video, Code2 } from "lucide-react"

interface ContentWorkspaceProps {
  category: string
}

export function ContentWorkspace({ category }: ContentWorkspaceProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")
  const [exportFormat, setExportFormat] = useState("txt")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          category,
          mode: "manual",
        }),
      })

      const data = await response.json()
      if (data.content) {
        setGeneratedContent(data.content)
        setEditedContent(data.content)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSmartGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          mode: "smart",
        }),
      })

      const data = await response.json()
      if (data.content) {
        setGeneratedContent(data.content)
        setEditedContent(data.content)
        setPrompt(data.prompt || "")
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Smart generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    const contentToCopy = isEditing ? editedContent : generatedContent
    navigator.clipboard.writeText(contentToCopy)
  }

  const handleSaveEdit = () => {
    setGeneratedContent(editedContent)
    setIsEditing(false)
  }

  const handleExport = () => {
    const contentToExport = isEditing ? editedContent : generatedContent
    const blob = new Blob([contentToExport], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${category}-content.${exportFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getCategoryIcon = (cat: string) => {
    const icons: Record<string, any> = {
      templates: FileText,
      images: ImageIcon,
      videos: Video,
      puzzles: FileText,
      quizzes: FileText,
      games: Code2,
      code: Code2,
      audio: FileText,
      ebooks: FileText,
      designs: ImageIcon,
      courses: FileText,
      automation: Code2,
    }
    return icons[cat] || FileText
  }

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      templates: "Document Templates",
      images: "Image Generation",
      videos: "Video Content",
      puzzles: "Puzzle Creation",
      quizzes: "Quiz Builder",
      games: "Game Development",
      code: "Code Generation",
      audio: "Audio Content",
      ebooks: "E-book Creation",
      designs: "Design Assets",
      courses: "Course Materials",
      automation: "Automation Scripts",
    }
    return titles[cat] || "Content Generation"
  }

  const CategoryIcon = getCategoryIcon(category)

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <CategoryIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground">{getCategoryTitle(category)}</h2>
            <p className="text-muted-foreground mt-1">Generate high-quality {category} content with AI</p>
          </div>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </div>

      {/* Generation Interface */}
      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Generation</TabsTrigger>
          <TabsTrigger value="smart">Smart Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Custom Prompt
              </CardTitle>
              <CardDescription>Describe exactly what you want to create</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`Describe the ${category} you want to create...`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full button-3d">
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart" className="space-y-4">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI-Powered Smart Generation
              </CardTitle>
              <CardDescription>Let AI automatically create marketable {category} content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleSmartGenerate} disabled={isGenerating} className="w-full button-3d">
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Smart Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {generatedContent && (
        <Card className="card-3d">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CategoryIcon className="w-5 h-5 text-primary" />
                Generated Content
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="txt">TXT</SelectItem>
                    <SelectItem value="md">MD</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="button-3d bg-transparent"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Preview" : "Edit"}
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="button-3d bg-transparent">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport} className="button-3d bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit} className="button-3d">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditedContent(generatedContent)
                      setIsEditing(false)
                    }}
                    className="button-3d bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <div className="max-h-[500px] overflow-y-auto">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedContent}</pre>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {generatedContent.length} characters • {generatedContent.split("\n").length} lines
                  </span>
                  <span>Generated with {category} AI</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
