"use client"

import { Header } from "@/components/header"
import { ToolGrid } from "@/components/tool-grid"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sparkles, Filter } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"

const filterOptions = [
  { id: "all", label: "All Tools", description: "Browse our complete collection" },
  { id: "popular", label: "Popular", description: "Most used by our community" },
  { id: "new", label: "New", description: "Latest additions to our toolkit" },
  { id: "free", label: "Free", description: "Completely free to use" },
]

export default function AIToolsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-900 py-16 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Tools</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                All AI Tools
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Discover our complete collection of AI-enhanced tools designed to supercharge your productivity and creativity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Filter Tools:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={activeFilter === option.id ? "default" : "outline"}
                    onClick={() => setActiveFilter(option.id)}
                    className="rounded-full"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <main className="container mx-auto px-4 py-12">
          <ToolGrid filter={activeFilter} />
        </main>
      </div>
      <Footer />
    </div>
  )
}