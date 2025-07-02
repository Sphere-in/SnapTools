"use client"

import { Moon, Sun, Grid3X3, Menu, X, Sparkle, Globe, Brain } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
const navItems = [
  { name: "Discover", path: "/", icon: <Globe height={15} width={15} /> },
  { name: "AI Tools", path: "/ai-tools", icon: <Brain height={15} width={15} /> },
  { name: "Try Snap AI", path: "/ai", icon: <Sparkle height={15} width={15} /> },
]


export function Header() {
  const { setTheme, theme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Snap Tools Logo"
                width={32}
                height={32}
                className="w-8 h-8 "
              />
              <span className="font-bold text-gray-900 dark:text-white text-lg">Snap Tools</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={`flex  gap-x-2 justify-center items-center  text-sm font-medium transition-colors duration-200 pb-1 border-b-2 ${isActive
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                >
                  {item.name}{item.icon}
                </button>
              )
            })}
          </nav>


          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className={`relative w-full transition-all duration-300 ${searchFocused ? "scale-105" : ""}`}>
              <input
                type="text"
                placeholder="Search AI tools and utilities..."
                className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:text-white dark:placeholder-gray-400"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setMobileMenuOpen(false)
                      router.push(item.path)
                    }}
                    className={`text-left text-sm font-medium transition-colors duration-200 ${isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </nav>

          </motion.div>
        )}
      </div>
    </header>
  )
}