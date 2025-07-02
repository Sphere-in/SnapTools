import { Header } from "@/components/header"
import { AIHeroSlider } from "@/components/ai-hero-slider"
import { AIStatsSection } from "@/components/ai-stats-section"
import { ToolGrid } from "@/components/tool-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AIHeroSlider />
      <AIStatsSection />
      <main className="w-full mx-auto px-4 py-8 space-y-12 ">
        <ToolGrid />
      </main>
      <Footer />
    </div>
  )
}