"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Zap, Star, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { tools } from "@/lib/tools-config"

// Featured AI tools
const featuredTools = [
  {
    id: "snap-ai",
    title: "Snap AI Assistant",
    subtitle: "Your intelligent companion for productivity",
    description: "Experience the power of AI with our advanced assistant that helps you work smarter, not harder.",
    cta: "Try AI Assistant",
    background:
      "bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-900",
    tool: tools.find((t) => t.id === "snap-ai"),
    features: ["Smart Automation", "Natural Language", "Real-time Results"],
    badge: "Most Popular",
  },
  {
    id: "qr-generator",
    title: "AI-Powered QR Generator",
    subtitle: "Create stunning QR codes instantly",
    description: "Generate beautiful, customizable QR codes with our intelligent design system.",
    cta: "Generate QR Code",
    background:
      "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 dark:from-emerald-700 dark:via-teal-800 dark:to-cyan-900",
    tool: tools.find((t) => t.id === "qr-generator"),
    features: ["Custom Designs", "High Resolution", "Batch Generation"],
    badge: "New",
  },
  {
    id: "json-formatter",
    title: "Smart JSON Formatter",
    subtitle: "Format and validate JSON with AI",
    description: "Our intelligent JSON formatter not only formats but also suggests improvements and catches errors.",
    cta: "Format JSON",
    background:
      "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 dark:from-orange-700 dark:via-red-700 dark:to-pink-800",
    tool: tools.find((t) => t.id === "json-formatter"),
    features: ["Error Detection", "Auto-complete", "Schema Validation"],
    badge: "Enhanced",
  },
  {
    id: "password-generator",
    title: "Secure Password AI",
    subtitle: "Generate unbreakable passwords",
    description: "Create ultra-secure passwords using advanced AI algorithms that balance security and memorability.",
    cta: "Generate Password",
    background:
      "bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 dark:from-violet-800 dark:via-purple-800 dark:to-fuchsia-900",
    tool: tools.find((t) => t.id === "password-generator"),
    features: ["Military Grade", "Custom Rules", "Strength Analysis"],
    badge: "Secure",
  },
]

export function AIHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredTools.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const currentTool = featuredTools[currentSlide]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTools.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTools.length) % featuredTools.length)
  }

  return (
    <div className="w-full h-[100svh] flex">
      <div className="relative w-full overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 ${currentTool.background}`}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-20 h-20 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                  scale: [1.2, 1, 1.2],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute -bottom-5 -left-5 sm:-bottom-10 sm:-left-10 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 right-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-white/20 rounded-full"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                  {/* Left Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="space-y-4 sm:space-y-6 text-center lg:text-left"
                  >
                    <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 flex-wrap">
                      <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {currentTool.badge}
                      </Badge>
                      <Badge variant="outline" className="bg-white/10 text-white border-white/30 text-xs sm:text-sm">
                        AI-Powered
                      </Badge>
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                        {currentTool.title}
                      </h1>
                      <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium">{currentTool.subtitle}</p>
                      <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        {currentTool.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {currentTool.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
                        >
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
                          <span className="text-white text-xs sm:text-sm font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 items-center lg:items-start"
                    >
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white text-gray-900 hover:bg-white/90 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                      >
                        {currentTool.cta}
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold backdrop-blur-sm bg-transparent"
                      >
                        View All Tools
                      </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6 text-white/80 text-sm sm:text-base flex-wrap"
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">4.9</span>
                        <span className="text-xs sm:text-sm">rating</span>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="font-semibold">50K+</span> users
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="font-semibold">Free</span> to use
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right Content - Tool Preview */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="hidden lg:flex justify-center items-center"
                  >
                    <div className="relative">
                      <div className="w-64 h-64 xl:w-80 xl:h-80 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center">
                        {currentTool.tool && (
                          <currentTool.tool.icon className="w-24 h-24 xl:w-32 xl:h-32 text-white/80" />
                        )}
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur-xl" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls - Fixed positioning with higher z-index */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20">
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="rounded-full text-white hover:bg-white/20 backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <div className="flex items-center gap-1 sm:gap-2 px-2">
              {featuredTools.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 flex-shrink-0 ${
                    index === currentSlide ? "bg-white w-6 sm:w-8 h-2" : "bg-white/50 w-2 h-2 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="rounded-full text-white hover:bg-white/20 backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-full text-white hover:bg-white/20 backdrop-blur-sm ml-1 sm:ml-2 h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
            >
              {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
            </Button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20">
          <div className="bg-black/20 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="text-white/80 text-xs sm:text-sm font-medium">
              {currentSlide + 1} / {featuredTools.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
