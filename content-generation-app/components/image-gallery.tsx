"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, Search, Filter } from "lucide-react"

interface ImageGalleryProps {
  onGenerate: (prompt: string) => void
}

export default function ImageGallery({ onGenerate }: ImageGalleryProps) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const placeholders = [
    "/placeholder.jpg",
    "/placeholder-user.jpg",
    "/placeholder-logo.png",
    "/placeholder-logo.svg",
    "/placeholder.svg",
  ]

  const images = placeholders.filter((p) => p.includes(query) || query === "")

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-200 p-3 pr-10"
              placeholder="Search images or enter an inspiration prompt..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 p-2"
          aria-label="Filter images"
        >
          <option value="all">All</option>
          <option value="illustration">Illustration</option>
          <option value="photography">Photography</option>
          <option value="branding">Branding</option>
        </select>
        <Button onClick={() => onGenerate(query || "A vibrant product photo on a white background")}>Quick Generate</Button>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((src, idx) => (
          <div key={idx} className="break-inside-avoid rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
            <img src={src} alt={`placeholder-${idx}`} className="w-full block object-cover" />
            <div className="p-3 flex items-center justify-between">
              <div className="text-sm text-gray-700 truncate">{src.replace('/', '')}</div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => onGenerate(`Enhance: ${src}`)}>Use</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
