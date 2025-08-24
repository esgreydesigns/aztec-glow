import { Button } from "@/components/ui/button"
import { Sparkles, User, Settings, Bell } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-accent" />
            <span className="font-serif text-2xl font-bold text-foreground">ContentCraft AI</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/templates">Templates</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/editor">Editor</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/intelligence">Intelligence</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/export">Export</Link>
            </Button>
            <Button variant="ghost" size="sm">
              Analytics
            </Button>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
