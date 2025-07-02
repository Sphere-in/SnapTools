"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"

const banners = [
  {
    id: 1,
    title: "Editor's Picks for you",
    subtitle: "Hand-picked by Snap Tools editors",
    buttonText: "See collection",
    background: "bg-gradient-to-r from-green-200 via-green-300 to-green-400",
    decorations: [
      { type: "circle", size: "w-16 h-16", color: "bg-blue-300/60", position: "top-20 right-32" },
      { type: "triangle", size: "w-12 h-12", color: "bg-teal-400/70", position: "top-32 right-64" },
      { type: "star", size: "w-20 h-20", color: "bg-green-500/50", position: "top-16 right-48" },
      { type: "circle", size: "w-8 h-8", color: "bg-blue-400/80", position: "bottom-24 right-24" },
    ],
  },
  {
    id: 2,
    title: "Favourites of 2024",
    subtitle: "Discover the standout tools that made our year",
    buttonText: "See collection",
    background: "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900",
    textColor: "text-white",
    decorations: [
      { type: "trophy", size: "w-32 h-32", color: "text-yellow-400", position: "top-12 left-32" },
      { type: "square", size: "w-6 h-6", color: "bg-orange-500", position: "top-16 left-64" },
      { type: "square", size: "w-4 h-4", color: "bg-pink-400", position: "top-32 left-48" },
      { type: "star", size: "w-8 h-8", color: "bg-orange-400", position: "bottom-20 left-40" },
    ],
  },
]

export function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const banner = banners[currentBanner]

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="mx-auto px-4 py-8">
      <motion.div
        key={currentBanner}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative overflow-hidden rounded-3xl ${banner.background} p-8 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px]`}
      >
        {/* Decorative Elements */}
        {banner.decorations.map((decoration, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`absolute ${decoration.position} ${decoration.size}`}
          >
            {decoration.type === "circle" && <div className={`w-full h-full rounded-full ${decoration.color}`} />}
            {decoration.type === "triangle" && (
              <div
                className={`w-0 h-0 border-l-6 border-r-6 border-b-12 border-transparent ${decoration.color.replace("bg-", "border-b-")}`}
              />
            )}
            {decoration.type === "star" && (
              <div className={`w-full h-full ${decoration.color} clip-path-star`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            )}
            {decoration.type === "square" && <div className={`w-full h-full ${decoration.color} rotate-45`} />}
            {decoration.type === "trophy" && (
              <div className={`w-full h-full ${decoration.color}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20.5C20.78 4 21 4.22 21 4.5S20.78 5 20.5 5H19V6C19 8.76 16.76 11 14 11H13V16H16C16.55 16 17 16.45 17 17S16.55 18 16 18H8C7.45 18 7 17.55 7 17S7.45 16 8 16H11V11H10C7.24 11 5 8.76 5 6V5H3.5C3.22 5 3 4.78 3 4.5S3.22 4 3.5 4H7ZM9 3V4H15V3H9ZM17 6V5H7V6C7 7.66 8.34 9 10 9H14C15.66 9 17 7.66 17 6Z" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${banner.textColor || "text-gray-800"}`}
          >
            {banner.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-lg md:text-xl mb-8 ${banner.textColor ? "text-gray-200" : "text-gray-700"}`}
          >
            {banner.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Button
              size="lg"
              variant={banner.textColor ? "secondary" : "default"}
              className="rounded-full px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {banner.buttonText}
            </Button>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className=" absolute bottom-6 right-6 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevBanner}
            className={`rounded-full ${banner.textColor ? "text-white hover:bg-white/20" : "text-gray-600 hover:bg-black/10"}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
            <span className={`text-sm font-medium ${banner.textColor || "text-gray-800"}`}>
              {currentBanner + 1} / {banners.length}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextBanner}
            className={`rounded-full ${banner.textColor ? "text-white hover:bg-white/20" : "text-gray-600 hover:bg-black/10"}`}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`rounded-full ${banner.textColor ? "text-white hover:bg-white/20" : "text-gray-600 hover:bg-black/10"}`}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}