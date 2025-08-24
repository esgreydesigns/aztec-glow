import { TemplateEditor } from "@/components/template-editor"
import { Header } from "@/components/header"

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TemplateEditor />
      </main>
    </div>
  )
}
