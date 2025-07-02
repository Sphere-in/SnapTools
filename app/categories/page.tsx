"use client"
import { Header } from "@/components/header"
import { CategoryGrid } from "@/components/category-grid"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="mx-2 sm:mx-4 lg:mx-6 mb-6 sm:mb-8 rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
          <div className="mx-auto px-4 text-center py-8 sm:py-12 md:py-16 lg:py-20 sm:px-6 md:px-8 lg:px-12 rounded-xl sm:rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Explore All Categories
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover our comprehensive collection of AI-powered tools organized by category. 
                Find exactly what you need to boost your productivity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <main className="container mx-auto px-4 py-12">
          <CategoryGrid showAll={true} />
        </main>
      </div>
      <Footer />
    </div>
  )
}