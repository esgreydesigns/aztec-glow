"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ContentWorkspace } from "@/components/content-workspace"

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("templates")

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <ContentWorkspace category={activeCategory} />
    </div>
  )
}
