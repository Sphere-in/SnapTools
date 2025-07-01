"use client"

import { motion } from "framer-motion"
import { Gamepad2, Wrench, Palette, Code, Calculator, FileText, Shield, Zap } from 'lucide-react'
import { useRouter } from "next/navigation"
import { tools } from "@/lib/tools-config"

const categories = [
  {
    id: "productivity",
    name: "Productivity",
    icon: Wrench,
    color: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 border-blue-200 dark:border-blue-700",
    iconColor: "text-blue-600 dark:text-blue-400",
    description: "Boost your efficiency with smart tools",
  },
  {
    id: "development",
    name: "Development",
    icon: Code,
    color: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 border-purple-200 dark:border-purple-700",
    iconColor: "text-purple-600 dark:text-purple-400",
    description: "Code faster with AI assistance",
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: Calculator,
    color: "bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40 border-green-200 dark:border-green-700",
    iconColor: "text-green-600 dark:text-green-400",
    description: "Essential tools for daily tasks",
  },
  {
    id: "design",
    name: "Art & Design",
    icon: Palette,
    color: "bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-800/40 border-pink-200 dark:border-pink-700",
    iconColor: "text-pink-600 dark:text-pink-400",
    description: "Creative tools for designers",
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    color: "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40 border-red-200 dark:border-red-700",
    iconColor: "text-red-600 dark:text-red-400",
    description: "Protect your digital assets",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: Gamepad2,
    color: "bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-800/40 border-orange-200 dark:border-orange-700",
    iconColor: "text-orange-600 dark:text-orange-400",
    description: "Fun and engaging experiences",
  },
  {
    id: "text",
    name: "Text Tools",
    icon: FileText,
    color: "bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/30 dark:hover:bg-teal-800/40 border-teal-200 dark:border-teal-700",
    iconColor: "text-teal-600 dark:text-teal-400",
    description: "Advanced text processing",
  },
  {
    id: "performance",
    name: "Performance",
    icon: Zap,
    color: "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/40 border-yellow-200 dark:border-yellow-700",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    description: "Optimize and accelerate",
  },
]

interface CategoryGridProps {
  showAll?: boolean
  onCategorySelect?: (categoryId: string) => void
}

export function CategoryGrid({ showAll = false, onCategorySelect }: CategoryGridProps) {
  const router = useRouter()

  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId)
    } else {
      router.push(`/ai-tools?category=${categoryId}`)
    }
  }

  const displayCategories = showAll ? categories : categories.slice(0, 8)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {showAll ? "All Categories" : "Top categories"}
        </h2>
        {!showAll && (
          <button
            onClick={() => router.push("/categories")}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm md:text-base transition-colors"
          >
            See more
          </button>
        )}
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 ${showAll ? "lg:grid-cols-4" : "lg:grid-cols-8"} gap-4`}>
        {displayCategories.map((category, index) => {
          const categoryTools = tools.filter((tool) => tool.category.toLowerCase() === category.id)
          const toolCount = categoryTools.length

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                ${category.color}
                shadow-sm hover:shadow-md
              `}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-xl bg-white/50 dark:bg-white/10 ${category.iconColor}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{category.name}</span>
                  {showAll && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">{category.description}</p>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {toolCount} tool{toolCount !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}