"use client"

import { Header } from "@/components/header"
import { ToolGrid } from "@/components/tool-grid"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sparkles, Filter } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const filterOptions = [
  { id: "all", label: "All Tools" },
  { id: "popular", label: "Popular", },
  { id: "new", label: "New" },
  { id: "free", label: "Free" },
]

export default function AIToolsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="mx-2 sm:mx-4 lg:mx-6  mb-6 sm:mb-8 lg:mb-12">
          <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-900 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 sm:space-y-6 lg:space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">AI-Powered Tools</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                All AI Tools
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Discover our complete collection of AI-enhanced tools designed to supercharge your productivity and
                creativity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <main className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-12">
          <div className="max-w-7xl mx-auto">
            <ToolGrid filter={activeFilter} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
