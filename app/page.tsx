import Heading from "@/components/heading"
import { ToolGrid } from "@/components/tool-grid"
import { Header } from "@/components/header"


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Spacer  */}
      <div className="w-full py-16"/>
      <main className="container mx-auto px-8 py-8">
        <Heading />
        <ToolGrid />
      </main>
    </div>
  )
}
