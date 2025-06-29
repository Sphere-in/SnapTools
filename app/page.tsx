import { ToolGrid } from "@/components/tool-grid"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Multi-Tool Suite</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of essential tools for developers, students, and professionals. Clean, fast, and
            always available.
          </p>
        </div>
        <ToolGrid />
      </main>
    </div>
  )
}
