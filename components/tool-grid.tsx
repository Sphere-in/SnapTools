"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Sparkles } from 'lucide-react'
import { tools } from "@/lib/tools-config"
import { ToolDialog } from "@/components/tool-dialog"
import useDebounce from "@/hooks/useDebounce"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface ToolGridProps {
  filter?: string
  selectedCategory?: string
}

// Color scheme for dark mode - using emerald/teal instead of blue
const darkModeColors = {
  primary: "emerald-500",
  primaryHover: "emerald-400",
  primaryDark: "emerald-600",
  accent: "teal-500",
  accentHover: "teal-400",
  ring: "emerald-800",
  shadow: "emerald-500/10",
}

// Hydration-safe floating particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    setParticles(
      [...Array(6)].map((_, i) => ({
        x: Math.random() * 300,
        y: Math.random() * 200,
        delay: Math.random() * 2,
      })),
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/20 dark:bg-emerald-400/30 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
          }}
          animate={{
            x: particle.x + Math.sin(i) * 50,
            y: particle.y + Math.cos(i) * 50,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Pattern components for different tool categories
const PatternBackground = ({ category, className }: { category: string; className?: string }) => {
  const getPattern = () => {
    switch (category.toLowerCase()) {
      case "image":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-5 ${className}`} viewBox="0 0 100 100">
            <defs>
              <pattern id="image-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
                <rect x="5" y="5" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#image-pattern)" />
          </svg>
        )
      case "text":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-5 ${className}`} viewBox="0 0 100 100">
            <defs>
              <pattern id="text-pattern" x="0" y="0" width="25" height="15" patternUnits="userSpaceOnUse">
                <line x1="2" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="0.5" />
                <line x1="2" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="0.5" />
                <line x1="2" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#text-pattern)" />
          </svg>
        )
      case "video":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-5 ${className}`} viewBox="0 0 100 100">
            <defs>
              <pattern id="video-pattern" x="0" y="0" width="30" height="20" patternUnits="userSpaceOnUse">
                <rect x="5" y="5" width="20" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <polygon points="10,7 10,13 16,10" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#video-pattern)" />
          </svg>
        )
      case "audio":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-5 ${className}`} viewBox="0 0 100 100">
            <defs>
              <pattern id="audio-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="8" y="12" width="1" height="6" fill="currentColor" />
                <rect x="10" y="8" width="1" height="14" fill="currentColor" />
                <rect x="12" y="10" width="1" height="10" fill="currentColor" />
                <rect x="14" y="6" width="1" height="18" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#audio-pattern)" />
          </svg>
        )
      case "code":
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-5 ${className}`} viewBox="0 0 100 100">
            <defs>
              <pattern id="code-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M8 10l-3 3 3 3M17 10l3 3-3 3M12 8l-2 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#code-pattern)" />
          </svg>
        )
      default:
        return (
          <svg className={`absolute inset-0 w-full h-full opacity-5 ${className}`} viewBox="0 0 100 100">
            <defs>
              <pattern id="default-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" />
                <circle cx="5" cy="5" r="0.5" fill="currentColor" />
                <circle cx="15" cy="15" r="0.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#default-pattern)" />
          </svg>
        )
    }
  }

  return getPattern()
}

export function ToolGrid({ filter = "all", selectedCategory }: ToolGridProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(selectedCategory || "all")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredTools = useMemo(() => {
    let filtered = tools

    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          tool.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      )
    }

    if (activeCategory && activeCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category.toLowerCase() === activeCategory.toLowerCase())
    }

    if (filter === "popular") {
      filtered = filtered.slice(0, 12)
    } else if (filter === "new") {
      filtered = filtered.slice(-8)
    } else if (filter === "free") {
      filtered = filtered
    }

    return filtered
  }, [debouncedSearchTerm, activeCategory, filter])

  const categories = ["all", ...Array.from(new Set(tools.map((tool) => tool.category.toLowerCase())))]

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const getCategoryGradient = (category: string) => {
    const gradients = {
      image:
        "from-purple-500/10 via-pink-500/10 to-red-500/10 dark:from-purple-400/10 dark:via-pink-400/10 dark:to-red-400/10",
      text: "from-blue-500/10 via-cyan-500/10 to-teal-500/10 dark:from-emerald-500/10 dark:via-teal-500/10 dark:to-cyan-500/10",
      video:
        "from-orange-500/10 via-red-500/10 to-pink-500/10 dark:from-orange-400/10 dark:via-red-400/10 dark:to-pink-400/10",
      audio:
        "from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-emerald-500/10 dark:via-teal-500/10 dark:to-green-500/10",
      code: "from-indigo-500/10 via-purple-500/10 to-blue-500/10 dark:from-violet-500/10 dark:via-purple-500/10 dark:to-indigo-500/10",
      default:
        "from-gray-500/10 via-slate-500/10 to-zinc-500/10 dark:from-slate-400/10 dark:via-gray-400/10 dark:to-zinc-400/10",
    }
    return gradients[category.toLowerCase() as keyof typeof gradients] || gradients.default
  }

  return (
    <div className="space-y-8 relative">
      {/* Ambient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-cyan-950/20 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-emerald-900/40 dark:to-teal-900/40 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-emerald-400" />
          </motion.div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {activeCategory === "all" ? "All AI Tools" : `${activeCategory} Tools`}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent"
        >
          {activeCategory === "all" ? "Explore Our Complete Toolkit" : `${activeCategory} Tools`}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {filteredTools.length} powerful AI-enhanced tools available
        </motion.p>
      </div>

      {/* Search and Filter Bar */}
      <div className="space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
            <Input
              placeholder="Search AI tools and utilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-6 py-4 text-base rounded-full border-2 border-white/20 dark:border-gray-700/50 focus:border-blue-500/50 dark:focus:border-emerald-400/50 focus:ring-2 focus:ring-blue-200/50 dark:focus:ring-emerald-800/50 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full overflow-x-auto scrollbar-hide p-2 flex xl:justify-center gap-3"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${activeCategory === category
                ? "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-emerald-600 dark:to-teal-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-emerald-500/25"
                : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/20"
                }`}
            >
              {category === "all" ? "All Categories" : category}
            </motion.button>
          ))}
        </motion.div>


      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 relative z-10">
          <div className="text-gray-400 dark:text-gray-600 text-xl">No tools found matching your criteria</div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 relative z-10">
          {filteredTools.map((tool, toolIndex) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: toolIndex * 0.05,
                type: "tween",
                duration: 0.3,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                transition: { type: "tween", duration: 0.2, ease: "easeOut" },
              }}
              className="group"
            >
              <Card
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-emerald-400/20 border-0 rounded-3xl overflow-hidden bg-gradient-to-br ${getCategoryGradient(tool.category)} backdrop-blur-sm relative`}
                onClick={() => {
                  if (tool.id === "snap-ai") {
                    router.push("/ai")
                  } else {
                    setSelectedTool(tool.id)
                  }
                }}
              >
                {/* Background Pattern */}
                <PatternBackground
                  category={tool.category}
                  className="text-blue-500/30 dark:text-blue-400/20 group-hover:text-blue-600/40 dark:group-hover:text-emerald-300/30 transition-colors duration-500"
                />

                {/* Floating Particles */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <FloatingParticles />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <CardHeader className="p-8 relative z-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-3xl">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className="p-4 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-700/40 rounded-2xl backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <tool.icon className="h-8 w-8 text-blue-600 dark:text-emerald-400 group-hover:text-blue-700 dark:group-hover:text-emerald-300 transition-colors duration-300" />
                    </motion.div>

                    <div className="flex items-center gap-3">
                      <motion.div
                        className="flex items-center gap-1 bg-yellow-100/80 dark:bg-yellow-900/40 px-3 py-1 rounded-full backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">4.5</span>
                      </motion.div>

                      <Badge
                        variant="secondary"
                        className="text-xs bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border border-white/30 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300"
                      >
                        {tool.category}
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-3">
                    {tool.name}
                  </CardTitle>

                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6">
                    {tool.description}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-4 border-t border-white/30 dark:border-gray-700/50">
                    <motion.span
                      className="text-sm text-green-600 dark:text-green-400 font-semibold bg-green-100/60 dark:bg-green-900/30 px-3 py-1 rounded-full backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      Free
                    </motion.span>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="font-medium">1M+ users</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <ToolDialog toolId={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  )
}