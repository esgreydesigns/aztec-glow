"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2, Settings, Eye, Sparkles, Target, TrendingUp, AlertTriangle, Download, Copy } from "lucide-react"

export function ContentGenerator() {
  const [generationMode, setGenerationMode] = useState("manual")
  const [productType, setProductType] = useState("")
  const [prompt, setPrompt] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [smartContext, setSmartContext] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError("")
    setGeneratedContent("")

    try {
      // Simulate content generation delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate sample content based on product type
      const sampleContent = generateSampleContent(productType, prompt, targetAudience)
      setGeneratedContent(sampleContent)
    } catch (err) {
      setError("Content generation failed")
      console.error("Generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${productType || "content"}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Helper function for content generation
  const generateSampleContent = (productType: string, prompt: string, targetAudience: string): string => {
    const templates = {
      "prompt-guide": `# AI Prompt Engineering Guide

## Target Audience: ${targetAudience}

## Overview
This comprehensive guide teaches effective prompt engineering techniques for ${prompt}.

## Key Chapters

### Chapter 1: Understanding AI Models
- How language models work
- Different model capabilities
- Choosing the right model for your needs

### Chapter 2: Basic Prompt Structure
- Clear instructions and context
- Specific formatting requirements
- Examples and templates

### Chapter 3: Advanced Techniques
- Chain of thought prompting
- Few-shot learning examples
- Role-playing and persona prompts

### Chapter 4: Industry Applications
- Content creation and marketing
- Technical writing and documentation
- Creative writing and storytelling

### Chapter 5: Best Practices
- Testing and iteration
- Avoiding common pitfalls
- Measuring prompt effectiveness

## Resources Included
- 50+ prompt templates
- Case studies and examples
- Testing frameworks
- Performance tracking sheets

## Pricing Strategy
- PDF Download: $27
- Bundle with video course: $97
- Enterprise licensing available`,

      "template-pack": `# Professional Template Collection

## Target Audience: ${targetAudience}

## Template Categories

### Business Templates
- Business plan templates
- Financial projections
- Marketing strategy documents
- Project management templates

### Creative Templates
- Social media content calendars
- Blog post templates
- Email newsletter templates
- Presentation slide decks

### Technical Templates
- API documentation templates
- Code review checklists
- System architecture diagrams
- Testing strategy templates

## Key Features
- **Customizable**: Easy to modify for your needs
- **Professional Design**: Modern, clean layouts
- **Multiple Formats**: Word, Google Docs, PDF
- **Brand Integration**: Spaces for logo and colors

## Package Contents
- 25+ professional templates
- Design customization guide
- Usage instructions
- Brand integration examples

## Value Proposition
Save 10+ hours per week on document creation while maintaining professional standards.`,

      "micro-report": `# Market Intelligence Micro-Report

## Topic: ${prompt}
## Target Audience: ${targetAudience}

## Executive Summary
This concise report provides actionable insights on current market trends and opportunities.

## Key Findings
1. **Market Size**: Current market valuation and growth projections
2. **Competitive Landscape**: Major players and market share distribution
3. **Consumer Trends**: Emerging preferences and behavior patterns
4. **Technology Impact**: How new technologies are reshaping the industry

## Strategic Recommendations
- Short-term opportunities (3-6 months)
- Medium-term strategies (6-18 months)
- Long-term positioning (18+ months)

## Data Sources
- Primary research and surveys
- Industry reports and analysis
- Competitor monitoring
- Consumer behavior studies

## Next Steps
1. Schedule strategy review meeting
2. Assign action items to team members
3. Set up monitoring and tracking systems
4. Plan follow-up research initiatives

## About This Report
- **Length**: 5-7 pages
- **Format**: PDF with interactive elements
- **Updates**: Quarterly refresh cycle
- **Price**: $47 per report`,

      "checklist": `# Comprehensive Project Checklist

## Project: ${prompt}
## Target Audience: ${targetAudience}

## Pre-Project Planning
- [ ] Define project scope and objectives
- [ ] Identify stakeholders and team members
- [ ] Set timeline and milestones
- [ ] Allocate budget and resources
- [ ] Risk assessment and mitigation plan

## Development Phase
- [ ] Requirements gathering and documentation
- [ ] Design and architecture planning
- [ ] Development environment setup
- [ ] Code implementation and testing
- [ ] Quality assurance and review

## Deployment Phase
- [ ] Production environment preparation
- [ ] Data migration and backup
- [ ] Security and performance testing
- [ ] User acceptance testing
- [ ] Go-live planning and execution

## Post-Launch Activities
- [ ] Performance monitoring setup
- [ ] User feedback collection
- [ ] Documentation and training materials
- [ ] Maintenance and support planning
- [ ] Success metrics and ROI analysis

## Emergency Procedures
- [ ] Backup and recovery procedures
- [ ] Incident response plan
- [ ] Communication protocols
- [ ] Escalation procedures

## Success Metrics
- Project completion on time and budget
- Stakeholder satisfaction ratings
- System performance benchmarks
- User adoption and engagement rates`,

      "script": `# Automation Script Collection

## Target Audience: ${targetAudience}

## Script Categories

### Productivity Scripts
- Email automation workflows
- File organization and backup
- Task management integration
- Calendar and scheduling automation

### Data Processing Scripts
- CSV import/export automation
- Data validation and cleaning
- Report generation scripts
- Database maintenance tasks

### Web Scraping Scripts
- Content aggregation tools
- Price monitoring systems
- Social media data collection
- News and trend tracking

### API Integration Scripts
- Third-party service connections
- Data synchronization tools
- Notification and alert systems
- Workflow automation pipelines

## Technical Specifications
- **Language**: Python 3.8+
- **Dependencies**: Standard library + popular packages
- **Platform**: Cross-platform compatibility
- **Documentation**: Comprehensive README files

## Key Features
- **Error Handling**: Robust error management
- **Logging**: Detailed execution logs
- **Configuration**: Easy setup and customization
- **Security**: Safe credential management

## Package Contents
- 15+ ready-to-use scripts
- Installation and setup guide
- Configuration templates
- Troubleshooting documentation

## Learning Resources
- Video tutorials for each script
- Code walkthroughs and explanations
- Customization examples
- Best practices guide`,

      "analysis": `# Market Analysis Report

## Industry: ${prompt}
## Target Audience: ${targetAudience}

## Executive Summary
Comprehensive analysis of market trends, opportunities, and competitive landscape.

## Market Overview
- **Total Market Size**: Current valuation and growth rate
- **Key Segments**: Major market divisions and their characteristics
- **Geographic Distribution**: Regional market variations
- **Growth Drivers**: Primary factors influencing market expansion

## Competitive Analysis
- **Major Players**: Top 10 companies and their market share
- **Competitive Advantages**: Key differentiators and strengths
- **Market Entry Barriers**: Challenges for new entrants
- **SWOT Analysis**: Industry-wide strengths, weaknesses, opportunities, threats

## Consumer Insights
- **Target Demographics**: Age, income, location, interests
- **Buying Behavior**: Decision-making processes and preferences
- **Pain Points**: Common customer challenges and frustrations
- **Purchase Channels**: Online vs offline preferences

## Technology Trends
- **Emerging Technologies**: Innovations shaping the industry
- **Digital Transformation**: Adoption rates and impact
- **Automation Opportunities**: Areas for efficiency improvement
- **Data Analytics**: Usage patterns and insights

## Regulatory Environment
- **Current Regulations**: Existing laws and compliance requirements
- **Upcoming Changes**: Anticipated regulatory developments
- **Compliance Costs**: Financial impact of regulatory compliance
- **Industry Standards**: Best practices and benchmarks

## Investment Opportunities
- **Growth Sectors**: High-potential market segments
- **M&A Activity**: Recent mergers and acquisitions
- **Venture Capital**: Investment trends and funding patterns
- **ROI Projections**: Expected returns on investment

## Strategic Recommendations
1. **Market Entry Strategy**: Optimal approach for new market entrants
2. **Product Development**: Features and capabilities in high demand
3. **Marketing Strategy**: Effective channels and messaging
4. **Partnership Opportunities**: Strategic alliances and collaborations

## Methodology
- **Data Sources**: Primary and secondary research methods
- **Sample Size**: Survey and interview participant counts
- **Time Period**: Analysis timeframe and data currency
- **Validation**: Quality assurance and data verification processes

## Limitations and Assumptions
- Data availability and accuracy considerations
- Market volatility and uncertainty factors
- Geographic scope and coverage limitations
- Future projection assumptions and caveats`
    }

    return templates[productType as keyof typeof templates] || `# Custom Content Product

## Product Type: ${productType}
## Target Audience: ${targetAudience}
## Description: ${prompt}

## Overview
This custom content product has been tailored to meet your specific requirements and target audience needs.

## Key Features
- **Customized Content**: Specifically designed for your use case
- **Professional Quality**: High standards of writing and presentation
- **Practical Value**: Immediate actionable insights and information
- **Flexible Format**: Adaptable to your preferred delivery method

## Content Structure
1. **Introduction**: Context and background information
2. **Main Content**: Core material and key information
3. **Practical Applications**: Real-world usage examples
4. **Conclusion**: Summary and next steps

## Delivery Options
- Digital download (PDF, Word, etc.)
- Web-based access
- Physical delivery (print materials)
- Custom integration (API, embed codes)

## Support and Resources
- Implementation guide
- FAQ and troubleshooting
- Contact information for support
- Update and revision policy

## Terms and Conditions
- License and usage rights
- Refund and return policy
- Intellectual property considerations
- Maintenance and update commitments`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Wand2 className="h-8 w-8 text-accent" />
        <h2 className="font-serif text-3xl font-bold text-foreground">Content Generator</h2>
      </div>

      <Tabs value={generationMode} onValueChange={setGenerationMode} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Manual Creation
          </TabsTrigger>
          <TabsTrigger value="smart" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Smart Generation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Manual Content Creation</CardTitle>
              <CardDescription>Customize every aspect of your digital product with detailed control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-type">Product Type</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prompt-guide">AI Prompt Guide</SelectItem>
                      <SelectItem value="template-pack">Template Pack</SelectItem>
                      <SelectItem value="micro-report">Micro Report</SelectItem>
                      <SelectItem value="checklist">Checklist</SelectItem>
                      <SelectItem value="script">Code Script</SelectItem>
                      <SelectItem value="analysis">Market Analysis</SelectItem>
                      <SelectItem value="automation-tool">Automation Tool</SelectItem>
                      <SelectItem value="tutorial-guide">Tutorial Guide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Input
                    id="target-audience"
                    placeholder="e.g., Small business owners, Content creators"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-prompt">Content Description</Label>
                <Textarea
                  id="content-prompt"
                  placeholder="Describe what you want to create. Be as specific as possible about the content, format, and desired outcomes..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !productType || !prompt}
                  className="bg-accent hover:bg-accent/90"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Smart Generation</CardTitle>
              <CardDescription>
                AI analyzes the 50 "easy $5 win" opportunities and creates optimized products automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-accent" />
                  <span className="font-semibold text-accent">Market Intelligence Active</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <div className="text-sm">
                      <div className="font-semibold">AI Automation Tools</div>
                      <div className="text-muted-foreground">87% growth trend</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="text-sm">
                      <div className="font-semibold">API Migration Gap</div>
                      <div className="text-muted-foreground">94% demand, 23% supply</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    <div className="text-sm">
                      <div className="font-semibold">Best Opportunity</div>
                      <div className="text-muted-foreground">$2.4K/month potential</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI analyzes the 50 proven "easy $5 win" categories to suggest the most marketable products.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Optional Context (Leave blank for fully automated)</Label>
                  <Textarea
                    placeholder="Provide any specific industry, audience, or product preferences (optional)..."
                    rows={3}
                    value={smartContext}
                    onChange={(e) => setSmartContext(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-accent hover:bg-accent/90"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Market & Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Smart Product
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-600">{error}</div>
          </CardContent>
        </Card>
      )}

      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif">Generated Content</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadContent}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/20 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedContent}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
