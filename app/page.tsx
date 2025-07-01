import { Header } from "@/components/header"
import { AIHeroSlider } from "@/components/ai-hero-slider"
import { AIStatsSection } from "@/components/ai-stats-section"
import { CategoryGrid } from "@/components/category-grid"
import { ToolGrid } from "@/components/tool-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <AIHeroSlider />
        <AIStatsSection />
        <main className="container mx-auto px-4 py-8 space-y-12">
          <CategoryGrid />
          <ToolGrid />
        </main>
      </div>
      <Footer />
    </div>
  )
}