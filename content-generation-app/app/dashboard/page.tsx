import { UserDashboard } from "@/components/user-dashboard"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <UserDashboard />
      </main>
    </div>
  )
}
