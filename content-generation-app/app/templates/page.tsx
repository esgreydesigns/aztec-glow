import { TemplateLibrary } from "@/components/template-library"
import { Header } from "@/components/header"

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TemplateLibrary />
      </main>
    </div>
  )
}
