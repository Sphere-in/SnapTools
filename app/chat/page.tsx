"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, ArrowLeft, Sun, Moon, Sparkles, User, Bot, RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"
import useDebounce from "@/hooks/useDebounce"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatPageProps {
  initialMessage?: string
}

export default function ChatPage({ initialMessage }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { theme, setTheme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initialMessageProcessed = useRef(false)

  const handleSendMessage = useCallback(
    async (messageContent?: string) => {
      const content = messageContent || input
      if (!content.trim()) return

      const userMessage: Message = {
        id: Date.now().toString(),
        content: content,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      if (!messageContent) {
        setInput("")
      }

      // Simulate AI response
      await simulateAIResponse(content)
    },
    [input],
  )

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true)
    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const responses = [
      "I understand your question. Let me help you with that.",
      "That's an interesting point. Here's what I think about it...",
      "I'd be happy to assist you with this. Based on what you've asked...",
      "Great question! Let me break this down for you.",
      "I can help you with that. Here's a comprehensive answer...",
      "Excellent! Let me provide you with detailed information about this topic.",
      "That's a fascinating subject. Here's my analysis...",
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]
    const elaboration =
      " " +
      userMessage.split(" ").slice(-3).join(" ") +
      " is indeed a complex topic that requires careful consideration. Let me explain the key aspects and provide you with actionable insights."

    const aiMessage: Message = {
      id: Date.now().toString() + "-ai",
      content: response + elaboration,
      role: "assistant",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsTyping(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (initialMessage && !initialMessageProcessed.current) {
      initialMessageProcessed.current = true
      handleSendMessage(initialMessage)
    }
  }, [initialMessage])

  // Example usage of debounced input for auto-saving drafts
  const debouncedInput = useDebounce(input, 500)

  useEffect(() => {
    if (debouncedInput.trim() && debouncedInput !== input) {
      // Auto-save draft logic could go here
      console.log("Auto-saving draft:", debouncedInput)
    }
  }, [debouncedInput])

  // Example usage for input validation or processing
  useEffect(() => {
    if (debouncedInput.trim()) {
      // Perform any expensive input processing here
      // For example: spell check, content analysis, etc.
      console.log("Processing input:", debouncedInput)
    }
  }, [debouncedInput])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setInput("")
    initialMessageProcessed.current = false
    inputRef.current?.focus()
  }

  const goBack = () => {
    window.location.reload()
  }

  const MessageBubble = ({ message }: { message: Message }) => (
    <div
      className={cn(
        "flex gap-4 p-6 group transition-all duration-500 hover:bg-accent/20 animate-fade-in",
        message.role === "user" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <Avatar
        className={cn(
          "h-12 w-12 flex-shrink-0 ring-2 ring-offset-2 ring-offset-background transition-all duration-300",
          message.role === "user" ? "ring-blue-500/50 hover:ring-blue-500" : "ring-purple-500/50 hover:ring-purple-500",
        )}
      >
        <AvatarFallback
          className={cn(
            "transition-all duration-300",
            message.role === "user"
              ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
              : "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-purple-500/25",
          )}
        >
          {message.role === "user" ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex-1 space-y-3 max-w-[85%] lg:max-w-[75%]",
          message.role === "user" ? "items-end" : "items-start",
        )}
      >
        <div className={cn("flex items-center gap-3", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
          <span
            className={cn(
              "text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent",
              message.role === "user" ? "from-blue-500 to-cyan-500" : "from-purple-500 to-pink-500",
            )}
          >
            {message.role === "user" ? "You" : "AI Assistant"}
          </span>
          <span className="text-xs text-muted-foreground/70 font-medium">{message.timestamp.toLocaleTimeString()}</span>
        </div>
        <div
          className={cn(
            "relative p-5 rounded-2xl backdrop-blur-sm border transition-all duration-300 group-hover:shadow-lg",
            message.role === "user"
              ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-foreground shadow-blue-500/10 ml-auto"
              : "bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20 text-foreground shadow-purple-500/10",
          )}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</div>
          {/* Decorative gradient border */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
              message.role === "user"
                ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                : "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
            )}
          />
        </div>
      </div>
    </div>
  )

  const TypingIndicator = () => (
    <div className="flex gap-4 p-6 animate-fade-in">
      <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-purple-500/50 ring-offset-2 ring-offset-background">
        <AvatarFallback className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg shadow-purple-500/25">
          <Bot className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-3 max-w-[85%] lg:max-w-[75%]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Assistant
          </span>
          <span className="text-xs text-muted-foreground/70 font-medium">thinking...</span>
        </div>
        <div className="relative p-5 rounded-2xl backdrop-blur-sm border bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20 shadow-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <span className="text-xs text-muted-foreground ml-2">Generating response...</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-accent/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main Chat Area - Full Width */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="hover:bg-accent/50 transition-colors rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
                <Sparkles className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Powered by Gemini AI</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNewChat}
              className="hover:bg-accent/50 transition-colors rounded-xl"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 relative">
          <div className="max-w-5xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center space-y-8 p-8">
                <div className="relative">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/25">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 blur-xl opacity-50 -z-10" />
                </div>
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    Ready to Chat!
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Start your conversation below. I'm here to help with anything you need!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <MessageBubble key={index} message={message} />
                ))}
                {isTyping && <TypingIndicator />}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Enhanced Input Area */}
        <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="pr-4 min-h-[56px] text-base rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:bg-background/80 transition-all duration-300 shadow-lg"
                  disabled={isTyping}
                />
                {/* Optional: Show draft indicator when there's debounced content */}
                {debouncedInput.trim() && debouncedInput !== input && (
                  <div className="absolute -top-6 left-2 text-xs text-muted-foreground/70">Draft saved</div>
                )}
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-3 text-center font-medium">
              AI Assistant can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
