"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export function Header() {
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[#0f172a]/80 to-[#1e293b]/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="container mx-auto px-4 h-16 flex items-center justify-between"
      >
        {/* Brand logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">ST</span>
          </div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-sky-400">
            Snap Tools
          </span>
        </motion.div>

        {/* Theme toggle */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="backdrop-blur border bg-background/80 shadow-xl">
              {["light", "dark", "system"].map((mode) => (
                <DropdownMenuItem
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className="hover:bg-muted transition-colors"
                >
                  {mode[0].toUpperCase() + mode.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </header>
  )
}
