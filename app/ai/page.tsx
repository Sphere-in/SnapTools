"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import useDebounce from "@/hooks/useDebounce"
import {
  Sun,
  Moon,
  MessageSquare,
  Zap,
  Brain,
  Code,
  Lightbulb,
  Rocket,
  ArrowRight,
  Send,
  Bot,
  Wand2,
  Globe,
  Shield,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import ChatPage from "@/app/chat/page"

interface QuickStartCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  prompt: string
  category: string
}

const quickStartCards: QuickStartCard[] = [
  {
    id: "creative",
    title: "Creative Writing",
    description: "Generate stories, poems, and creative content",
    icon: <Wand2 className="h-6 w-6" />,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    prompt: "Help me write a creative story about",
    category: "Creative",
  },
  {
    id: "coding",
    title: "Code Assistant",
    description: "Get help with programming and development",
    icon: <Code className="h-6 w-6" />,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    prompt: "Help me code",
    category: "Development",
  },
  {
    id: "learning",
    title: "Learning & Education",
    description: "Explain concepts and help with studies",
    icon: <Brain className="h-6 w-6" />,
    gradient: "from-green-500 via-emerald-500 to-cyan-500",
    prompt: "Explain to me about",
    category: "Education",
  },
  {
    id: "business",
    title: "Business Ideas",
    description: "Brainstorm and develop business concepts",
    icon: <Lightbulb className="h-6 w-6" />,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    prompt: "Help me brainstorm business ideas for",
    category: "Business",
  },
  {
    id: "productivity",
    title: "Productivity",
    description: "Organize tasks and boost efficiency",
    icon: <Zap className="h-6 w-6" />,
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    prompt: "Help me organize and plan",
    category: "Productivity",
  },
  {
    id: "research",
    title: "Research & Analysis",
    description: "Deep dive into topics and analyze data",
    icon: <Globe className="h-6 w-6" />,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    prompt: "Research and analyze",
    category: "Research",
  },
]

export default function IntroPage() {
  const [showChat, setShowChat] = useState(false)
  const [initialMessage, setInitialMessage] = useState("")
  const [selectedCard, setSelectedCard] = useState<QuickStartCard | null>(null)
  const [customInput, setCustomInput] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // Apply debounce to the custom input with 300ms delay
  const debouncedCustomInput = useDebounce(customInput, 300)

  const handleCardClick = (card: QuickStartCard) => {
    setSelectedCard(card)
    setCustomInput("")
    setIsDialogOpen(true)
  }

  const handleStartChat = () => {
    if (selectedCard && debouncedCustomInput.trim()) {
      const message = `${selectedCard.prompt} ${debouncedCustomInput.trim()}`
      setInitialMessage(message)
      setShowChat(true)
      setIsDialogOpen(false)
    }
  }

  const handleQuickStart = () => {
    setInitialMessage("Hello! I'd like to start a conversation.")
    setShowChat(true)
  }

  if (showChat) {
    return <ChatPage initialMessage={initialMessage} />
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
      <header className="relative z-10 flex items-center justify-between p-6 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
            <Bot className="h-6 w-6 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Assistant
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
      <main className="relative z-10 container mx-auto px-6 py-12">
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

        {/* Quick Start Cards */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Choose Your Adventure
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a category to get started with tailored prompts and suggestions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickStartCards.map((card, index) => (
              <Card
                key={card.id}
                className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden"
                onClick={() => handleCardClick(card)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4 relative">
                  {/* Gradient Background */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                      card.gradient,
                    )}
                  />
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {card.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110",
                      card.gradient,
                    )}
                  >
                    {card.icon}
                  </div>
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                  </div>
                  {/* Action */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">Click to start</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center space-y-8">
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

      {/* Dialog for Custom Input */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedCard && (
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                    selectedCard.gradient,
                  )}
                >
                  {selectedCard.icon}
                </div>
              )}
              <div>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {selectedCard?.title}
                </span>
                <p className="text-sm text-muted-foreground font-normal mt-1">{selectedCard?.description}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">What would you like to explore?</label>
              <Textarea
                placeholder={`e.g., "a futuristic city" or "a Python web scraper"`}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="min-h-[100px] resize-none rounded-xl border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleStartChat()
                  }
                }}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="flex-1 rounded-xl">
                Cancel
              </Button>
              <Button
                onClick={handleStartChat}
                disabled={!debouncedCustomInput.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
              >
                <Send className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
