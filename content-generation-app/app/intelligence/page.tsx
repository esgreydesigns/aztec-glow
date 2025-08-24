import { MarketIntelligence } from "@/components/market-intelligence"
import { Header } from "@/components/header"

export default function IntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MarketIntelligence />
      </main>
    </div>
  )
}
