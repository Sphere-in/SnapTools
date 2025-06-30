"use client"

import { Bot, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Header() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="fixed w-full flex items-center justify-between p-5 bg-background/80 backdrop-blur-md border-b border-border/80 shadow-md">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="container mx-auto h-16 flex items-center justify-between"
      >
        {/* Brand logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
            <span className="font-bold">ST</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Snap Tools
            </h1>
          </div>
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </motion.div>
    </header>
  )
}
