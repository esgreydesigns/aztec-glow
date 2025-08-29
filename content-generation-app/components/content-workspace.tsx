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
  const [aiProvider, setAiProvider] = useState("simulated")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
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
        }
      } else {
        // Use simulated generation
        const sampleContent = generateSampleContent(category, prompt)
        setGeneratedContent(sampleContent)
        setEditedContent(sampleContent)
        setIsEditing(false)
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

      {/* AI Provider Selection */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Provider
          </CardTitle>
          <CardDescription>Choose your content generation engine</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={aiProvider} onValueChange={setAiProvider}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simulated">Simulated AI (Fast)</SelectItem>
              <SelectItem value="m3-agent">M3-Agent (Advanced Memory)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            {aiProvider === "simulated" 
              ? "Fast local generation with sample content" 
              : "Advanced generation using M3-Agent with long-term memory capabilities"
            }
          </p>
        </CardContent>
      </Card>

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
                  <span>Generated with {aiProvider === "m3-agent" ? "M3-Agent" : category} AI</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
