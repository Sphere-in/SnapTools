"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  Sun,
  Moon,
  MessageSquare,
  Rocket,
  Bot,
  Shield,
  Star,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function IntroPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme()

  const handleQuickStart = () => {
    router.push("/chat");
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 bg-background/80 backdrop-blur-xl border-b border-border/80 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
            <Bot className="h-6 w-6 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
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
          className="rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pt-8">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-tight">
              Welcome to the Future
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience next-generation AI conversation. Choose your journey and start exploring the possibilities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleQuickStart}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Quick Start Chat
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>



        {/* Features Section */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Why Choose Our AI Assistant?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Get instant responses with our optimized AI engine",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure & Private",
                description: "Your conversations are encrypted and never stored",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Premium Quality",
                description: "Powered by the latest Gemini AI technology",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="space-y-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-accent/20 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
