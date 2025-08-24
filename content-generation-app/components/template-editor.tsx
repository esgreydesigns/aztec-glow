"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Eye, Plus, X, FileText, Code, BarChart3, CheckSquare } from "lucide-react"

interface TemplateField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "number"
  placeholder?: string
  options?: string[]
  required?: boolean
}

const templateTypes = [
  {
    id: "prompt-guide",
    name: "AI Prompt Guide",
    icon: FileText,
    fields: [
      {
        id: "title",
        label: "Guide Title",
        type: "text",
        placeholder: "e.g., 30 ChatGPT Prompts for Marketing",
        required: true,
      },
      {
        id: "audience",
        label: "Target Audience",
        type: "text",
        placeholder: "e.g., Small business owners, Content creators",
      },
      {
        id: "category",
        label: "Category",
        type: "select",
        options: ["Marketing", "Content Creation", "Business", "Education", "Personal"],
        required: true,
      },
      { id: "prompt_count", label: "Number of Prompts", type: "number", placeholder: "30" },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Describe what problems these prompts solve...",
      },
      { id: "sample_prompts", label: "Sample Prompts", type: "textarea", placeholder: "List 3-5 example prompts..." },
    ],
  },
  {
    id: "code-script",
    name: "Code Script",
    icon: Code,
    fields: [
      {
        id: "title",
        label: "Script Title",
        type: "text",
        placeholder: "e.g., API Wrapper for Deprecated Service",
        required: true,
      },
      {
        id: "language",
        label: "Programming Language",
        type: "select",
        options: ["JavaScript", "Python", "PHP", "Ruby", "Go"],
        required: true,
      },
      { id: "use_case", label: "Use Case", type: "textarea", placeholder: "What problem does this script solve?" },
      {
        id: "requirements",
        label: "Requirements",
        type: "textarea",
        placeholder: "Dependencies, setup requirements...",
      },
      { id: "code_sample", label: "Code Sample", type: "textarea", placeholder: "Provide a sample of the code..." },
    ],
  },
  {
    id: "analysis-template",
    name: "Analysis Template",
    icon: BarChart3,
    fields: [
      {
        id: "title",
        label: "Analysis Title",
        type: "text",
        placeholder: "e.g., Micro-Niche Market Analysis",
        required: true,
      },
      {
        id: "analysis_type",
        label: "Analysis Type",
        type: "select",
        options: ["Market Research", "Competitor Analysis", "Trend Analysis", "Customer Analysis"],
        required: true,
      },
      { id: "methodology", label: "Methodology", type: "textarea", placeholder: "Describe the analysis approach..." },
      { id: "data_sources", label: "Data Sources", type: "textarea", placeholder: "What data sources are used?" },
      { id: "deliverables", label: "Deliverables", type: "textarea", placeholder: "What will the user receive?" },
    ],
  },
  {
    id: "checklist",
    name: "Checklist",
    icon: CheckSquare,
    fields: [
      {
        id: "title",
        label: "Checklist Title",
        type: "text",
        placeholder: "e.g., PoC to Product Launch Checklist",
        required: true,
      },
      {
        id: "process_type",
        label: "Process Type",
        type: "select",
        options: ["Product Development", "Marketing", "Business Setup", "Technical Implementation"],
        required: true,
      },
      { id: "steps_count", label: "Number of Steps", type: "number", placeholder: "15" },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "What process does this checklist guide?",
      },
      { id: "sample_steps", label: "Sample Steps", type: "textarea", placeholder: "List 5 example checklist items..." },
    ],
  },
]

export function TemplateEditor() {
  const [selectedType, setSelectedType] = useState("")
  const [templateData, setTemplateData] = useState<Record<string, string>>({})
  const [customFields, setCustomFields] = useState<TemplateField[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const currentTemplate = templateTypes.find((t) => t.id === selectedType)

  const handleFieldChange = (fieldId: string, value: string) => {
    setTemplateData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const addCustomField = () => {
    const newField: TemplateField = {
      id: `custom_${Date.now()}`,
      label: "Custom Field",
      type: "text",
      placeholder: "Enter value...",
    }
    setCustomFields((prev) => [...prev, newField])
  }

  const removeCustomField = (fieldId: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== fieldId))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save process
    setTimeout(() => {
      setIsSaving(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold text-foreground">Template Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-accent hover:bg-accent/90">
            {isSaving ? (
              <>
                <Save className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Template
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList>
          <TabsTrigger value="builder">Template Builder</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Template Type</CardTitle>
              <CardDescription>Choose the type of product template you want to create</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templateTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedType === type.id ? "ring-2 ring-accent bg-accent/5" : ""
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <CardContent className="p-4 text-center">
                        <IconComponent className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <div className="font-semibold text-sm">{type.name}</div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {currentTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Template Configuration</CardTitle>
                <CardDescription>Configure the fields and content for your {currentTemplate.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTemplate.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      {field.type === "text" && (
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          value={templateData[field.id] || ""}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        />
                      )}
                      {field.type === "number" && (
                        <Input
                          id={field.id}
                          type="number"
                          placeholder={field.placeholder}
                          value={templateData[field.id] || ""}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        />
                      )}
                      {field.type === "textarea" && (
                        <Textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          value={templateData[field.id] || ""}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          rows={3}
                        />
                      )}
                      {field.type === "select" && (
                        <Select
                          value={templateData[field.id] || ""}
                          onValueChange={(value) => handleFieldChange(field.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>

                {customFields.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Custom Fields</h4>
                    </div>
                    {customFields.map((field) => (
                      <div key={field.id} className="flex items-end gap-2">
                        <div className="flex-1 space-y-2">
                          <Label>{field.label}</Label>
                          <Input
                            placeholder={field.placeholder}
                            value={templateData[field.id] || ""}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => removeCustomField(field.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" onClick={addCustomField}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Field
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Template Settings</CardTitle>
              <CardDescription>Configure pricing, tags, and distribution settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input placeholder="$5" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-content">AI Content & Tools</SelectItem>
                      <SelectItem value="code-solutions">Code Solutions</SelectItem>
                      <SelectItem value="market-analysis">Market Analysis</SelectItem>
                      <SelectItem value="conceptual">Conceptual Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="Enter tags separated by commas" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Template Preview</CardTitle>
              <CardDescription>Preview how your template will appear to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg p-6 bg-muted/20">
                <div className="text-center text-muted-foreground">
                  Template preview will appear here based on your configuration
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
