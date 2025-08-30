"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Download, Copy, RefreshCw, Edit3, Save, FileText, ImageIcon, Video, Code2, Wand2, Zap, Star, Clock, TrendingUp, Brain } from "lucide-react"

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
  const [aiProvider, setAiProvider] = useState("simulated")
  const [generationStats, setGenerationStats] = useState({ time: 0, quality: 0 })

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    const startTime = Date.now()

    try {
      if (category === "images") {
        // Generate actual image using Stability AI
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            size: "1024x1024",
            style: "vivid",
          }),
        })

        const data = await response.json()
        if (data.success) {
          setGeneratedContent(`![Generated Image](${data.imageUrl})\n\n**Prompt:** ${prompt}\n**Size:** 1024x1024\n**Style:** Vivid`)
          setEditedContent(`![Generated Image](${data.imageUrl})\n\n**Prompt:** ${prompt}\n**Size:** 1024x1024\n**Style:** Vivid`)
          setIsEditing(false)
          setGenerationStats({
            time: Date.now() - startTime,
            quality: Math.floor(Math.random() * 20) + 80 // Simulated quality score
          })
        } else {
          throw new Error(data.error || "Failed to generate image")
        }
      } else if (category === "videos") {
        // Generate actual video using Runway ML or similar
        const response = await fetch("/api/generate-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            duration: 5,
            style: "realistic",
          }),
        })

        const data = await response.json()
        if (data.success) {
          setGeneratedContent(`🎬 **Generated Video**\n\n[Video Link](${data.videoUrl})\n\n**Prompt:** ${prompt}\n**Duration:** 5 seconds\n**Style:** Realistic\n\n${data.message}`)
          setEditedContent(`🎬 **Generated Video**\n\n[Video Link](${data.videoUrl})\n\n**Prompt:** ${prompt}\n**Duration:** 5 seconds\n**Style:** Realistic\n\n${data.message}`)
          setIsEditing(false)
          setGenerationStats({
            time: Date.now() - startTime,
            quality: Math.floor(Math.random() * 15) + 85
          })
        } else {
          throw new Error(data.error || "Failed to generate video")
        }
      } else if (aiProvider === "m3-agent") {
        // Use M3-Agent for generation
        const response = await fetch("/api/m3-generate", {
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
          setGenerationStats({
            time: Date.now() - startTime,
            quality: Math.floor(Math.random() * 25) + 75
          })
        }
      } else {
        // Use simulated generation
        const sampleContent = generateSampleContent(category, prompt)
        setGeneratedContent(sampleContent)
        setEditedContent(sampleContent)
        setIsEditing(false)
        setGenerationStats({
          time: Date.now() - startTime,
          quality: Math.floor(Math.random() * 30) + 70
        })
      }
    } catch (error) {
      console.error("Generation failed:", error)
      setGeneratedContent(`Error: ${error instanceof Error ? error.message : "Generation failed"}`)
      setEditedContent(`Error: ${error instanceof Error ? error.message : "Generation failed"}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSmartGenerate = async () => {
    setIsGenerating(true)
    try {
      if (aiProvider === "m3-agent") {
        // Use M3-Agent for smart generation
        const response = await fetch("/api/m3-generate", {
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
      } else {
        // Use simulated smart generation
        const smartContent = generateSmartContent(category)
        setGeneratedContent(smartContent)
        setEditedContent(smartContent)
        setPrompt(`Smart-generated ${category} content`)
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
      documents: FileText,
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
      documents: "Digital Document Creation",
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

  // Helper functions for content generation
  const generateSampleContent = (category: string, prompt: string): string => {
    const templates = {
      templates: `# Professional Document Template

## Overview
This template provides a structured format for ${prompt}.

## Key Sections
1. Introduction
2. Main Content
3. Conclusion
4. References

## Usage Instructions
- Customize each section with your specific content
- Maintain consistent formatting throughout
- Review for clarity and completeness

## Template Structure
\`\`\`
[Header]
[Introduction]
[Body Content]
[Conclusion]
[Footer]
\`\`\``,

      documents: `# Professional Digital Document

## Document Overview
**Title:** ${prompt}
**Type:** Business Document
**Format:** PDF, Word, HTML

## Document Structure
### Executive Summary
- Key objectives and goals
- Main findings and insights
- Strategic recommendations
- Implementation timeline

### Detailed Content
- Comprehensive analysis
- Data visualization
- Supporting evidence
- Case studies and examples

### Action Plan
- Specific next steps
- Resource requirements
- Timeline and milestones
- Success metrics

## Professional Features
- **Branding:** Company logo and colors
- **Typography:** Consistent font hierarchy
- **Layout:** Professional formatting
- **Compliance:** Industry standards

## Export Options
- PDF for distribution
- Word for collaboration
- HTML for web publishing
- Print-ready formats

## Quality Assurance
- Automated proofreading
- Format validation
- Content optimization
- SEO-friendly structure`,

      images: `# AI-Generated Image

## Image Details
**Prompt:** ${prompt}
**Style:** Digital illustration with vibrant colors
**Resolution:** 1024x1024 pixels
**Format:** PNG

## Usage Recommendations
- Web graphics and social media
- Digital marketing materials
- Presentation slides
- Blog illustrations
- App interfaces

## Technical Specifications
- High-resolution output
- Transparent background option
- Scalable vector format available
- Optimized for web delivery

## Next Steps
1. Download the generated image
2. Edit in your preferred image editor
3. Optimize for your specific use case
4. Add to your content library`,

      videos: `# AI-Generated Video

## Video Details
**Prompt:** ${prompt}
**Duration:** 5 seconds
**Style:** Realistic cinematography
**Resolution:** 1080p HD

## Production Features
- Professional camera work
- Smooth transitions and effects
- Background music integration
- Text overlay capabilities
- Multiple export formats

## Usage Applications
- Social media content
- Marketing videos
- Educational materials
- Product demonstrations
- Promotional clips

## Technical Specifications
- 4K resolution option
- Multiple aspect ratios
- Custom frame rates
- Audio enhancement
- Subtitle support

## Distribution Options
- Direct download
- Cloud storage links
- Social media optimization
- Email marketing integration`,

      code: `# Code Template

## Project: ${prompt}

\`\`\`javascript
// Main application file
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Features
- RESTful API endpoints
- Error handling middleware
- Environment configuration
- Logging system

## Installation
\`\`\`bash
npm install
npm start
\`\`\`

## Usage
Access the API at http://localhost:3000`
    }

    return templates[category as keyof typeof templates] || `# ${category.charAt(0).toUpperCase() + category.slice(1)} Content

## Overview
This is sample content for the ${category} category based on your prompt: "${prompt}"

## Key Features
- Professional structure
- Clear formatting
- Practical examples
- Easy customization

## Next Steps
1. Review and customize the content
2. Add your specific details
3. Format according to your needs
4. Share or publish as appropriate`
  }

  const generateSmartContent = (category: string): string => {
    const smartTemplates = {
      templates: `# Smart Business Template

## Executive Summary
This professionally designed template optimizes workflow efficiency and productivity.

## Key Benefits
- **Time Savings**: 40% reduction in document creation time
- **Consistency**: Standardized formatting across all documents
- **Professional Appearance**: Modern design with brand consistency
- **Easy Customization**: Simple fields for personalization

## Template Sections
1. Header with company branding
2. Main content area with structured layout
3. Footer with contact information
4. Version control and approval workflow

## Implementation Guide
- Download the template files
- Customize colors and fonts to match brand guidelines
- Add company-specific content and policies
- Train team members on template usage

## Expected ROI
- Initial setup: 2-3 hours
- Monthly time savings: 10-15 hours
- Annual cost reduction: $5,000-$8,000`,

      documents: `# Smart Digital Document Generator

## Document Intelligence Analysis
AI-powered document creation with context-aware content generation and professional formatting.

## Smart Features
- **Content Analysis**: Automatic topic detection and structure optimization
- **Format Optimization**: Intelligent layout and typography selection
- **Compliance Checking**: Built-in legal and regulatory compliance
- **Multi-format Export**: PDF, Word, HTML, and print-ready formats

## Document Types Supported
### Business Documents
- Reports and proposals
- Contracts and agreements
- Presentations and decks
- Meeting agendas and minutes

### Marketing Materials
- Brochures and flyers
- Product catalogs
- Press releases
- Social media content plans

### Educational Content
- Training manuals
- Course materials
- Assessment tools
- Certification guides

## Automation Features
- **Template Selection**: AI chooses optimal template based on content
- **Content Population**: Smart field filling with context-aware suggestions
- **Quality Assurance**: Automated proofreading and formatting checks
- **Version Control**: Integrated document versioning and collaboration

## Integration Capabilities
- CRM system integration
- Database connectivity
- API-driven content generation
- Cloud storage and sharing`,

      images: `# Professional Image Asset Package

## Package Contents
- Logo variations (PNG, SVG, EPS)
- Brand color palette
- Typography guidelines
- Icon set (50 icons)
- Social media templates
- Email signature templates

## Technical Specifications
- Resolution: 300 DPI minimum
- Color mode: RGB for web, CMYK for print
- File formats: PNG, JPG, SVG, PDF
- Maximum file size: 5MB per asset

## Usage Guidelines
- Maintain minimum 1-inch clear space around logos
- Use brand colors consistently
- Follow typography hierarchy
- Ensure readability at all sizes

## Brand Applications
- Website and digital marketing
- Print materials and signage
- Social media posts
- Email marketing campaigns
- Product packaging and labels`,

      videos: `# Educational Video Series

## Series Overview
"Mastering ${category}" - A comprehensive 10-part video series

## Episode Breakdown

### Episode 1: Introduction and Fundamentals
- Duration: 15 minutes
- Topics: Basic concepts, terminology, overview
- Learning objectives: Understand core principles

### Episode 2: Getting Started
- Duration: 20 minutes
- Topics: Setup, tools, first project
- Learning objectives: Hands-on experience

### Episodes 3-8: Advanced Topics
- Duration: 25-30 minutes each
- Topics: Deep dives into specific areas
- Learning objectives: Master advanced techniques

### Episode 9: Real-World Applications
- Duration: 35 minutes
- Topics: Case studies, practical examples
- Learning objectives: Apply knowledge practically

### Episode 10: Next Steps and Resources
- Duration: 20 minutes
- Topics: Advanced resources, community, career paths
- Learning objectives: Continued learning plan

## Production Quality
- 4K resolution
- Professional voiceover
- Custom graphics and animations
- Subtitles in multiple languages
- Downloadable resources and worksheets`,

      code: `# Full-Stack Web Application

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Deployment**: Docker with CI/CD pipeline

## Core Features
- User authentication and authorization
- Real-time notifications
- File upload and management
- API documentation with Swagger
- Comprehensive error handling
- Logging and monitoring

## Project Structure
\`\`\`
/src
  /components     # Reusable UI components
  /pages         # Application pages
  /hooks         # Custom React hooks
  /services      # API service functions
  /utils         # Helper functions
  /types         # TypeScript type definitions
\`\`\`

## Development Setup
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Set up environment variables
4. Run database migrations
5. Start development server: \`npm run dev\`

## Deployment
- Automated testing with Jest
- Docker containerization
- AWS deployment with CloudFormation
- Monitoring with DataDog`
    }

    return smartTemplates[category as keyof typeof smartTemplates] || `# Smart ${category.charAt(0).toUpperCase() + category.slice(1)} Content

## Market Analysis
Based on current trends and demand analysis, this content addresses the top needs in the ${category} category.

## Key Opportunities
- High demand with low competition
- Scalable business model
- Passive income potential
- Low startup costs

## Content Strategy
1. **Research Phase**: Analyze market trends and competitor content
2. **Creation Phase**: Develop high-quality, valuable content
3. **Optimization Phase**: SEO optimization and performance tracking
4. **Monetization Phase**: Multiple revenue streams and partnerships

## Success Metrics
- Content engagement rates
- Conversion rates
- Revenue per content piece
- Customer satisfaction scores

## Next Steps
- Conduct detailed market research
- Create content calendar
- Develop distribution strategy
- Set up analytics and tracking`
  }

  return (
    <div className="flex-1 ml-64 transition-all duration-300">
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 min-h-screen">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
              <CategoryIcon className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{getCategoryTitle(category)}</h1>
              <p className="text-gray-600">Create stunning {category} with advanced AI technology</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
            {generatedContent && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-600 rounded-lg border border-green-500/20">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Ready</span>
              </div>
            )}
          </div>
        </div>

      {/* AI Provider Selection with Enhanced Design */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
              <Zap className="w-5 h-5 text-white" />
            </div>
            AI Engine Selection
          </CardTitle>
          <CardDescription className="text-base">Choose your content generation powerhouse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              aiProvider === "simulated"
                ? "border-purple-600 bg-purple-50 shadow-lg"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`} onClick={() => setAiProvider("simulated")}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Wand2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Simulated AI</h4>
                  <p className="text-sm text-gray-600">Fast local generation</p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
              aiProvider === "m3-agent"
                ? "border-purple-600 bg-purple-50 shadow-lg"
                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
            }`} onClick={() => setAiProvider("m3-agent")}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">M3-Agent</h4>
                  <p className="text-sm text-gray-600">Advanced memory system</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {aiProvider === "simulated"
              ? "⚡ Lightning-fast generation with optimized templates"
              : "🧠 Intelligent content with long-term memory and context awareness"
            }
          </p>
        </CardContent>
      </Card>      {/* Enhanced Generation Interface */}
      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 backdrop-blur-sm border border-gray-200">
          <TabsTrigger value="manual" className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300">
            Manual Creation
          </TabsTrigger>
          <TabsTrigger value="smart" className="text-base font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300">
            Smart Generation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                Creative Prompt Studio
              </CardTitle>
              <CardDescription className="text-base">Craft your perfect prompt for exceptional results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Textarea
                  placeholder={`Describe the perfect ${category} you want to create...`}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[140px] resize-none text-base leading-relaxed border-2 border-gray-200 focus:border-purple-300 transition-colors bg-white/50 backdrop-blur-sm"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {prompt.length} characters
                </div>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500">
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                AI-Powered Smart Generation
              </CardTitle>
              <CardDescription className="text-base">Let our advanced AI create market-ready {category} content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleSmartGenerate}
                disabled={isGenerating}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-3" />
                    Smart Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {generatedContent && (
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-cyan-50"></div>
          <CardHeader className="relative border-b border-gray-200 bg-gradient-to-r from-white/80 to-white/60">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                  <CategoryIcon className="w-5 h-5 text-white" />
                </div>
                Generated Content
              </CardTitle>
              <div className="flex items-center gap-3">
                {/* Generation Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-lg border border-blue-500/20">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{(generationStats.time / 1000).toFixed(1)}s</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-600 rounded-lg border border-green-500/20">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">{generationStats.quality}%</span>
                  </div>
                </div>

                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="w-28 h-9 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="txt">TXT</SelectItem>
                    <SelectItem value="md">MD</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="h-9 px-3 border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditing ? "Preview" : "Edit"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="h-9 px-3 border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                    className="h-9 px-3 border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative p-0">
            {isEditing ? (
              <div className="p-6 space-y-6">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[500px] font-mono text-base leading-relaxed border-2 border-gray-200 focus:border-purple-300 transition-colors bg-white/50 backdrop-blur-sm resize-none"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveEdit}
                    className="h-12 px-6 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditedContent(generatedContent)
                      setIsEditing(false)
                    }}
                    className="h-12 px-6 text-base border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-inner">
                  <div className="max-h-[600px] overflow-y-auto">
                    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-purple-600 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
                      <pre className="whitespace-pre-wrap text-base leading-relaxed font-sans">{generatedContent}</pre>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {generatedContent.length.toLocaleString()} characters
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {generatedContent.split("\n").length} lines
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                        {aiProvider === "m3-agent" ? "M3-Agent" : "Simulated AI"}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                        {category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
    {/* Closing tag for the main flex container */}
    </div>
  )
}
