import { ExportDelivery } from "@/components/export-delivery"
import { Header } from "@/components/header"

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ExportDelivery />
      </main>
    </div>
  )
}
