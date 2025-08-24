"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Download,
  Star,
  Target,
  Zap,
  Bell,
  Award,
  BarChart3,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Package,
} from "lucide-react"
import Link from "next/link"

const userStats = {
  totalRevenue: 2847,
  monthlyRevenue: 892,
  totalProducts: 23,
  totalDownloads: 5642,
  avgRating: 4.7,
  successRate: 89,
}

const recentProducts = [
  {
    id: "1",
    title: "30 ChatGPT Prompts for Marketing",
    type: "AI Prompt Guide",
    status: "published",
    revenue: 245,
    downloads: 49,
    rating: 4.8,
    createdAt: "2024-01-15",
    trend: "up",
  },
  {
    id: "2",
    title: "API Migration Toolkit",
    type: "Code Script",
    status: "published",
    revenue: 180,
    downloads: 15,
    rating: 4.9,
    createdAt: "2024-01-12",
    trend: "up",
  },
  {
    id: "3",
    title: "Micro-Niche Analysis Template",
    type: "Market Analysis",
    status: "draft",
    revenue: 0,
    downloads: 0,
    rating: 0,
    createdAt: "2024-01-10",
    trend: "neutral",
  },
  {
    id: "4",
    title: "Real Estate Automation Scripts",
    type: "Code Script",
    status: "published",
    revenue: 156,
    downloads: 12,
    rating: 4.6,
    createdAt: "2024-01-08",
    trend: "down",
  },
]

const notifications = [
  {
    id: "1",
    type: "revenue",
    title: "New sale: API Migration Toolkit",
    description: "$12 earned from your product",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "2",
    type: "opportunity",
    title: "High-demand opportunity detected",
    description: "Healthcare automation scripts showing 94% demand",
    time: "4 hours ago",
    unread: true,
  },
  {
    id: "3",
    type: "achievement",
    title: "Milestone reached!",
    description: "You've earned $2,500+ total revenue",
    time: "1 day ago",
    unread: false,
  },
  {
    id: "4",
    type: "review",
    title: "New 5-star review",
    description: "ChatGPT Prompts for Marketing received a great review",
    time: "2 days ago",
    unread: false,
  },
]

const achievements = [
  { title: "First Sale", description: "Made your first $5", earned: true },
  { title: "Revenue Milestone", description: "Earned $1,000+", earned: true },
  { title: "Product Creator", description: "Published 10+ products", earned: true },
  { title: "Top Rated", description: "Maintain 4.5+ rating", earned: true },
  { title: "Market Leader", description: "Earn $5,000+", earned: false },
  { title: "Power User", description: "Publish 50+ products", earned: false },
]

export function UserDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">Welcome back, Alex!</h1>
          <p className="text-xl text-muted-foreground mt-2">
            You've earned <span className="font-semibold text-accent">${userStats.monthlyRevenue}</span> this month
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button className="bg-accent hover:bg-accent/90">
            <Zap className="h-4 w-4 mr-2" />
            Create Product
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">${userStats.totalRevenue}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Products Published</p>
                <p className="text-2xl font-bold text-foreground">{userStats.totalProducts}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +3 this month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold text-foreground">{userStats.totalDownloads.toLocaleString()}</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +234 this week
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-foreground">{userStats.avgRating}</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Excellent rating
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="products" className="w-full">
            <TabsList>
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Recent Products</CardTitle>
                  <CardDescription>Your latest published and draft products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <FileText className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{product.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {product.type}
                              </Badge>
                              <Badge
                                variant={product.status === "published" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {product.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="font-semibold">${product.revenue}</div>
                            <div className="text-muted-foreground">Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{product.downloads}</div>
                            <div className="text-muted-foreground">Downloads</div>
                          </div>
                          {product.status === "published" && (
                            <div className="text-center">
                              <div className="font-semibold flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {product.rating}
                              </div>
                              <div className="text-muted-foreground">Rating</div>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            {product.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                            {product.trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-600" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Revenue Analytics</CardTitle>
                  <CardDescription>Your earnings performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <div className="text-2xl font-bold text-accent">$892</div>
                        <div className="text-sm text-muted-foreground">This Month</div>
                        <div className="text-xs text-green-600 mt-1">+23% vs last month</div>
                      </div>
                      <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <div className="text-2xl font-bold text-accent">$38.9</div>
                        <div className="text-sm text-muted-foreground">Avg per Product</div>
                        <div className="text-xs text-blue-600 mt-1">Above average</div>
                      </div>
                      <div className="text-center p-4 bg-muted/20 rounded-lg">
                        <div className="text-2xl font-bold text-accent">89%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                        <div className="text-xs text-purple-600 mt-1">Excellent performance</div>
                      </div>
                    </div>

                    <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                        <div>Revenue chart would appear here</div>
                        <div className="text-sm">Interactive analytics dashboard</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Personalized Opportunities</CardTitle>
                  <CardDescription>AI-recommended products based on your success patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-accent">Perfect Match</span>
                      </div>
                      <h4 className="font-semibold mb-1">Healthcare Automation Scripts</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on your success with API tools. 94% demand, 31% supply. Est: $1,800/month
                      </p>
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Generate This Product
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg p-4">
                        <h5 className="font-semibold mb-2">Legal AI Prompts</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Specialized prompts for legal professionals
                        </p>
                        <div className="flex justify-between text-sm">
                          <span>Match Score:</span>
                          <span className="font-semibold text-accent">87%</span>
                        </div>
                      </div>

                      <div className="border border-border rounded-lg p-4">
                        <h5 className="font-semibold mb-2">E-commerce Analytics Kit</h5>
                        <p className="text-sm text-muted-foreground mb-2">Analytics templates for online stores</p>
                        <div className="flex justify-between text-sm">
                          <span>Match Score:</span>
                          <span className="font-semibold text-accent">82%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${notification.unread ? "bg-accent/5 border-accent/20" : "bg-muted/20 border-border"}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`p-1 rounded ${notification.unread ? "bg-accent/20" : "bg-muted"}`}>
                        {notification.type === "revenue" && <DollarSign className="h-3 w-3 text-green-600" />}
                        {notification.type === "opportunity" && <Target className="h-3 w-3 text-accent" />}
                        {notification.type === "achievement" && <Award className="h-3 w-3 text-purple-600" />}
                        {notification.type === "review" && <Star className="h-3 w-3 text-yellow-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{notification.title}</div>
                        <div className="text-xs text-muted-foreground">{notification.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded ${achievement.earned ? "bg-accent/5" : "opacity-50"}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${achievement.earned ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                    >
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Zap className="h-4 w-4 mr-2" />
                Smart Generate Product
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Create Template
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/export">
                  <Package className="h-4 w-4 mr-2" />
                  Export & Deliver
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Target className="h-4 w-4 mr-2" />
                Find Opportunities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
