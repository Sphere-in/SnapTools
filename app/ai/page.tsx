"use client"

import React from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import {
  Sun,
  Moon,
  MessageSquare,
  Rocket,
  Bot,
  Shield,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function IntroPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleQuickStart = () => {
    router.push("/chat")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-24 -right-32 w-96 h-96 bg-pink-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-400/10 blur-[100px] rounded-full animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 ">
        <div className="flex items-center gap-3">
          <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Snap AI
            </h1>
            <p className="text-sm text-muted-foreground">Powered by Gemini AI</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl hover:bg-accent/50 transition-transform duration-300 hover:scale-110"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pt-10 pb-24">
        {/* Hero Section */}
        <section className="text-center space-y-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-tight">
              Welcome to the Future
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Experience next-generation AI chat. Pick your path and start exploring what's possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleQuickStart}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <MessageSquare className="mr-2 h-10 w-10 text-lg" />
              Quick Start Chat
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="text-center space-y-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Why Choose Our AI Assistant?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Instant responses powered by Gemini AI.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure & Private",
                description: "End-to-end encrypted. We don’t store your chats.",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Premium Experience",
                description: "Elegant, helpful, and always up to date.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="space-y-4 p-6 rounded-3xl bg-background/60 border border-border/50 backdrop-blur-sm shadow-md  transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
