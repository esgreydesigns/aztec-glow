"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, Search, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const marketTrends = [
  {
    id: "ai-automation",
    topic: "AI Automation Tools",
    trend: "up",
    growth: 87,
    demand: "High",
    competition: "Medium",
    opportunity: 92,
    avgPrice: "$12",
    searchVolume: "45K/month",
    description: "Growing demand for AI-powered automation solutions",
  },
  {
    id: "micro-saas",
    topic: "Micro-SaaS Solutions",
    trend: "up",
    growth: 73,
    demand: "High",
    competition: "Low",
    opportunity: 89,
    avgPrice: "$8",
    searchVolume: "32K/month",
    description: "Small, focused software solutions gaining traction",
  },
  {
    id: "no-code-templates",
    topic: "No-Code Templates",
    trend: "up",
    growth: 65,
    demand: "Medium",
    competition: "High",
    opportunity: 71,
    avgPrice: "$15",
    searchVolume: "28K/month",
    description: "Templates for no-code platforms increasingly popular",
  },
  {
    id: "api-integrations",
    topic: "API Integration Guides",
    trend: "up",
    growth: 58,
    demand: "Medium",
    competition: "Low",
    opportunity: 84,
    avgPrice: "$10",
    searchVolume: "19K/month",
    description: "Developers need help with complex API integrations",
  },
  {
    id: "content-frameworks",
    topic: "Content Creation Frameworks",
    trend: "down",
    growth: -12,
    demand: "Low",
    competition: "High",
    opportunity: 34,
    avgPrice: "$6",
    searchVolume: "15K/month",
    description: "Market becoming saturated with generic frameworks",
  },
]

const marketGaps = [
  {
    id: "deprecated-api-tools",
    title: "Deprecated API Migration Tools",
    description: "Tools to help migrate from deprecated APIs are in high demand but low supply",
    demandScore: 94,
    supplyScore: 23,
    opportunityScore: 96,
    estimatedRevenue: "$2,400/month",
    timeToMarket: "2-3 weeks",
    difficulty: "Medium",
    tags: ["APIs", "Migration", "Developer Tools"],
  },
  {
    id: "niche-automation",
    title: "Industry-Specific Automation Scripts",
    description: "Automation scripts for specific industries (real estate, healthcare, etc.)",
    demandScore: 89,
    supplyScore: 31,
    opportunityScore: 91,
    estimatedRevenue: "$1,800/month",
    timeToMarket: "1-2 weeks",
    difficulty: "Low",
    tags: ["Automation", "Industry-Specific", "Scripts"],
  },
  {
    id: "ai-prompt-niches",
    title: "Specialized AI Prompt Collections",
    description: "AI prompts for very specific use cases (legal, medical, technical writing)",
    demandScore: 82,
    supplyScore: 45,
    opportunityScore: 78,
    estimatedRevenue: "$1,200/month",
    timeToMarket: "1 week",
    difficulty: "Low",
    tags: ["AI", "Prompts", "Specialized"],
  },
  {
    id: "micro-analytics",
    title: "Micro-Analytics Dashboards",
    description: "Simple analytics solutions for small businesses and creators",
    demandScore: 76,
    supplyScore: 52,
    opportunityScore: 71,
    estimatedRevenue: "$1,500/month",
    timeToMarket: "3-4 weeks",
    difficulty: "High",
    tags: ["Analytics", "Small Business", "Dashboards"],
  },
]

const competitorAnalysis = [
  {
    product: "Generic Prompt Packs",
    marketShare: 34,
    avgPrice: "$5",
    weaknesses: ["Too generic", "Poor organization", "No customization"],
    opportunities: ["Niche-specific versions", "Better categorization", "Interactive elements"],
  },
  {
    product: "Code Snippet Libraries",
    marketShare: 28,
    avgPrice: "$12",
    weaknesses: ["Outdated examples", "Poor documentation", "Limited languages"],
    opportunities: ["Modern frameworks", "Better docs", "Multi-language support"],
  },
  {
    product: "Business Templates",
    marketShare: 22,
    avgPrice: "$8",
    weaknesses: ["Generic design", "No customization", "Poor mobile experience"],
    opportunities: ["Industry-specific", "Customizable", "Mobile-first design"],
  },
]

export function MarketIntelligence() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Market Intelligence</h2>
          <p className="text-muted-foreground mt-1">AI-powered market analysis and opportunity detection</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button onClick={runAnalysis} disabled={isAnalyzing} className="bg-accent hover:bg-accent/90">
            {isAnalyzing ? (
              <>
                <Search className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Refresh Analysis
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="gaps">Opportunity Gaps</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Trending Topics</CardTitle>
                  <CardDescription>Market trends and demand analysis for digital products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketTrends.map((trend) => (
                      <div key={trend.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${trend.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                            >
                              {trend.trend === "up" ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{trend.topic}</h4>
                              <p className="text-sm text-muted-foreground">{trend.description}</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              trend.opportunity > 80 ? "default" : trend.opportunity > 60 ? "secondary" : "outline"
                            }
                          >
                            {trend.opportunity}% opportunity
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Growth</div>
                            <div className={`font-semibold ${trend.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                              {trend.growth > 0 ? "+" : ""}
                              {trend.growth}%
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Avg Price</div>
                            <div className="font-semibold">{trend.avgPrice}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Search Volume</div>
                            <div className="font-semibold">{trend.searchVolume}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Competition</div>
                            <div className="font-semibold">{trend.competition}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Market Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">47</div>
                    <div className="text-sm text-muted-foreground">Active Opportunities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">$2.4K</div>
                    <div className="text-sm text-muted-foreground">Avg Monthly Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">92%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Quick Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>AI automation tools showing 87% growth</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>API integration guides have low competition</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Best time to launch: Next 2 weeks</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Market Opportunity Gaps</CardTitle>
              <CardDescription>High-demand, low-supply opportunities identified by AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {marketGaps.map((gap) => (
                  <Card key={gap.id} className="border-2 border-accent/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-serif text-lg">{gap.title}</CardTitle>
                        <Badge className="bg-accent text-accent-foreground">{gap.opportunityScore}% Score</Badge>
                      </div>
                      <CardDescription>{gap.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Demand vs Supply</div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Demand</span>
                              <span>{gap.demandScore}%</span>
                            </div>
                            <Progress value={gap.demandScore} className="h-2" />
                            <div className="flex justify-between text-xs">
                              <span>Supply</span>
                              <span>{gap.supplyScore}%</span>
                            </div>
                            <Progress value={gap.supplyScore} className="h-2" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm text-muted-foreground">Est. Revenue</div>
                            <div className="font-semibold text-accent">{gap.estimatedRevenue}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Time to Market</div>
                            <div className="font-semibold">{gap.timeToMarket}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Difficulty</div>
                            <Badge
                              variant={
                                gap.difficulty === "Low"
                                  ? "default"
                                  : gap.difficulty === "Medium"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {gap.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {gap.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90">
                        <Target className="h-4 w-4 mr-2" />
                        Generate Product for This Gap
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Competitor Analysis</CardTitle>
              <CardDescription>Analysis of existing products and their weaknesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competitorAnalysis.map((competitor, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{competitor.product}</h4>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Market Share</div>
                          <div className="font-semibold">{competitor.marketShare}%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Avg Price</div>
                          <div className="font-semibold">{competitor.avgPrice}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-red-600 mb-2">Weaknesses</h5>
                        <ul className="space-y-1">
                          {competitor.weaknesses.map((weakness, i) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-600 mb-2">Opportunities</h5>
                        <ul className="space-y-1">
                          {competitor.opportunities.map((opportunity, i) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {opportunity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">AI-Generated Recommendations</CardTitle>
              <CardDescription>Personalized product suggestions based on market intelligence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-accent" />
                    <span className="font-semibold text-accent">Top Recommendation</span>
                  </div>
                  <h4 className="font-semibold mb-2">Create "API Migration Toolkit for Deprecated Services"</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    High demand (94%) with very low supply (23%). Estimated revenue: $2,400/month. Time to market: 2-3
                    weeks.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-accent hover:bg-accent/90">
                      Generate This Product
                    </Button>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-semibold mb-2">Industry-Specific Automation Scripts</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Focus on real estate or healthcare automation
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>Opportunity Score:</span>
                        <span className="font-semibold text-accent">91%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-semibold mb-2">Specialized AI Prompt Collections</h5>
                      <p className="text-sm text-muted-foreground mb-2">Legal, medical, or technical writing prompts</p>
                      <div className="flex justify-between text-sm">
                        <span>Opportunity Score:</span>
                        <span className="font-semibold text-accent">78%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
