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
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productType,
          prompt,
          targetAudience,
          mode: generationMode,
          context: smartContext,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedContent(data.content)
      } else {
        setError(data.error || "Generation failed")
      }
    } catch (err) {
      setError("Network error occurred")
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
