"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Download,
  Mail,
  Cloud,
  Package,
  FileText,
  Archive,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react"

const exportFormats = [
  {
    id: "pdf",
    name: "PDF Document",
    description: "Professional PDF with custom branding",
    icon: FileText,
    size: "~2-5 MB",
    recommended: true,
  },
  {
    id: "docx",
    name: "Word Document",
    description: "Editable Microsoft Word format",
    icon: FileText,
    size: "~1-3 MB",
    recommended: false,
  },
  {
    id: "html",
    name: "HTML Package",
    description: "Interactive web-based format",
    icon: Package,
    size: "~500 KB",
    recommended: false,
  },
  {
    id: "zip",
    name: "Complete Package",
    description: "All formats + bonus materials",
    icon: Archive,
    size: "~5-10 MB",
    recommended: true,
  },
]

const deliveryMethods = [
  {
    id: "direct",
    name: "Direct Download",
    description: "Instant download link",
    icon: Download,
    setup: "automatic",
  },
  {
    id: "email",
    name: "Email Delivery",
    description: "Send via email with custom message",
    icon: Mail,
    setup: "configure",
  },
  {
    id: "cloud",
    name: "Cloud Storage",
    description: "Upload to Google Drive, Dropbox, etc.",
    icon: Cloud,
    setup: "connect",
  },
  {
    id: "marketplace",
    name: "Marketplace Integration",
    description: "Auto-deliver through Gumroad, Etsy, etc.",
    icon: ExternalLink,
    setup: "integrate",
  },
]

const recentDeliveries = [
  {
    id: "1",
    product: "30 ChatGPT Prompts for Marketing",
    customer: "john@example.com",
    format: "PDF",
    method: "Email",
    status: "delivered",
    deliveredAt: "2024-01-15 14:30",
    revenue: "$5.00",
  },
  {
    id: "2",
    product: "API Migration Toolkit",
    customer: "sarah@company.com",
    format: "ZIP",
    method: "Direct Download",
    status: "delivered",
    deliveredAt: "2024-01-15 12:15",
    revenue: "$12.00",
  },
  {
    id: "3",
    product: "Real Estate Automation Scripts",
    customer: "mike@realty.com",
    format: "ZIP",
    method: "Cloud Storage",
    status: "processing",
    deliveredAt: null,
    revenue: "$8.00",
  },
  {
    id: "4",
    product: "Micro-Niche Analysis Template",
    customer: "lisa@startup.io",
    format: "PDF",
    method: "Email",
    status: "failed",
    deliveredAt: null,
    revenue: "$10.00",
  },
]

export function ExportDelivery() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["pdf"])
  const [selectedDelivery, setSelectedDelivery] = useState("direct")
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export process
    const steps = [
      { name: "Generating content", duration: 1000 },
      { name: "Applying branding", duration: 800 },
      { name: "Creating formats", duration: 1200 },
      { name: "Packaging files", duration: 600 },
      { name: "Preparing delivery", duration: 400 },
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration))
      setExportProgress(((i + 1) / steps.length) * 100)
    }

    setIsExporting(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Export & Delivery</h2>
          <p className="text-muted-foreground mt-1">Package and deliver your products to customers</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Settings className="h-4 w-4 mr-2" />
          Delivery Settings
        </Button>
      </div>

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="export">Export Products</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Management</TabsTrigger>
          <TabsTrigger value="history">Delivery History</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Export Configuration */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Product Selection</CardTitle>
                  <CardDescription>Choose the product you want to export</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Product</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a product to export" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatgpt-prompts">30 ChatGPT Prompts for Marketing</SelectItem>
                        <SelectItem value="api-toolkit">API Migration Toolkit</SelectItem>
                        <SelectItem value="niche-analysis">Micro-Niche Analysis Template</SelectItem>
                        <SelectItem value="automation-scripts">Real Estate Automation Scripts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedProduct && (
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-accent" />
                        <span className="font-semibold">Product Details</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          Status: <Badge variant="default">Published</Badge>
                        </div>
                        <div>Downloads: 49</div>
                        <div>Last updated: Jan 15, 2024</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Export Formats</CardTitle>
                  <CardDescription>Select the formats you want to generate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exportFormats.map((format) => {
                      const IconComponent = format.icon
                      return (
                        <div key={format.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={format.id}
                            checked={selectedFormats.includes(format.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFormats([...selectedFormats, format.id])
                              } else {
                                setSelectedFormats(selectedFormats.filter((f) => f !== format.id))
                              }
                            }}
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              <IconComponent className="h-4 w-4 text-accent" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Label htmlFor={format.id} className="font-semibold">
                                  {format.name}
                                </Label>
                                {format.recommended && (
                                  <Badge variant="secondary" className="text-xs">
                                    Recommended
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{format.description}</div>
                              <div className="text-xs text-muted-foreground">Size: {format.size}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Branding & Customization</CardTitle>
                  <CardDescription>Customize the appearance of your exported products</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Title</Label>
                    <Input placeholder="Custom title for this export" />
                  </div>
                  <div className="space-y-2">
                    <Label>Author Name</Label>
                    <Input placeholder="Your name or business name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Custom Message</Label>
                    <Textarea placeholder="Add a personal message or instructions..." rows={3} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="watermark" />
                    <Label htmlFor="watermark">Add watermark/branding</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contact" />
                    <Label htmlFor="contact">Include contact information</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Preview & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Export Preview</CardTitle>
                  <CardDescription>Preview how your exported product will look</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <div className="text-muted-foreground mb-2">Product preview will appear here</div>
                    <div className="text-sm text-muted-foreground">Select a product and formats to see preview</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Export Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Selected Formats:</span>
                      <span>{selectedFormats.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Size:</span>
                      <span>~3-8 MB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Export Time:</span>
                      <span>~30-60 seconds</span>
                    </div>
                  </div>

                  {isExporting ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-accent/20 rounded-full flex-1">
                          <div
                            className="h-2 bg-accent rounded-full transition-all duration-300"
                            style={{ width: `${exportProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{Math.round(exportProgress)}%</span>
                      </div>
                      <div className="text-sm text-muted-foreground text-center">Exporting your product...</div>
                    </div>
                  ) : (
                    <Button
                      onClick={handleExport}
                      disabled={!selectedProduct || selectedFormats.length === 0}
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Product
                    </Button>
                  )}
                </CardContent>
              </Card>

              {exportProgress === 100 && !isExporting && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Export Complete!</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Files
                      </Button>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Download Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Delivery Methods</CardTitle>
              <CardDescription>Configure how your products are delivered to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deliveryMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <Card
                      key={method.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedDelivery === method.id ? "ring-2 ring-accent bg-accent/5" : ""
                      }`}
                      onClick={() => setSelectedDelivery(method.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{method.name}</h4>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                        <Badge variant={method.setup === "automatic" ? "default" : "secondary"} className="text-xs">
                          {method.setup === "automatic" ? "Ready" : "Setup Required"}
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {selectedDelivery === "email" && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Email Delivery Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email Template</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose email template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional Template</SelectItem>
                          <SelectItem value="friendly">Friendly Template</SelectItem>
                          <SelectItem value="minimal">Minimal Template</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Custom Message</Label>
                      <Textarea placeholder="Thank you for your purchase! Here's your product..." rows={3} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Recent Deliveries</CardTitle>
              <CardDescription>Track your product deliveries and customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Package className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{delivery.product}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{delivery.customer}</span>
                          <Badge variant="outline" className="text-xs">
                            {delivery.format}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {delivery.method}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-accent">{delivery.revenue}</div>
                        {delivery.deliveredAt && (
                          <div className="text-xs text-muted-foreground">{delivery.deliveredAt}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {delivery.status === "delivered" && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Delivered
                          </Badge>
                        )}
                        {delivery.status === "processing" && (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Processing
                          </Badge>
                        )}
                        {delivery.status === "failed" && (
                          <Badge variant="destructive">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
