"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, ArrowLeft, Sun, Moon, Sparkles, User, Bot, RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isTyping?: boolean
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { theme, setTheme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    await getAIResponse(input.trim())
  }, [input, isTyping])

  const getAIResponse = async (userMessage: string) => {
    setIsTyping(true)

    // Create placeholder message for typing animation
    const aiMessageId = Date.now().toString() + "-ai"
    const aiMessage: Message = {
      id: aiMessageId,
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isTyping: true,
    }

    setMessages((prev) => [...prev, aiMessage])

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userMessage,
                  },
                ],
              },
            ],
          }),
        },
      )

      const data = await res.json()
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."

      await animateTyping(aiMessageId, responseText)
    } catch (error) {
      console.error("Error getting AI response:", error)
      await animateTyping(aiMessageId, "Sorry, there was an error processing your request.")
    }

    setIsTyping(false)
  }

  const animateTyping = async (messageId: string, fullText: string) => {
    const words = fullText.split(" ")
    let currentText = ""

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i]

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentText, isTyping: i < words.length - 1 } : msg,
        ),
      )

      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 30))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setInput("")
    inputRef.current?.focus()
  }

  const goBack = () => {
    router.push("/ai")
  }

  const MessageBubble = ({ message }: { message: Message }) => (
    <div
      className={cn(
        "flex gap-4 p-6 group transition-all duration-300 hover:bg-accent/20",
        message.role === "user" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <Avatar
        className={cn(
          "h-10 w-10 flex-shrink-0 ring-2 ring-offset-2 ring-offset-background",
          message.role === "user" ? "ring-blue-500/30" : "ring-purple-500/30",
        )}
      >
        <AvatarFallback
          className={cn(
            message.role === "user"
              ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
              : "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
          )}
        >
          {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex-1 space-y-2 max-w-[80%]", message.role === "user" ? "items-end" : "items-start")}>
        <div className={cn("flex items-center gap-2", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
          <span
            className={cn(
              "text-sm font-medium",
              message.role === "user" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400",
            )}
          >
            {message.role === "user" ? "You" : "Snap AI"}
          </span>
          <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
        </div>

        <div
          className={cn(
            "relative p-4 rounded-2xl border transition-all duration-200",
            message.role === "user"
              ? "bg-blue-500/10 border-blue-500/20 ml-auto"
              : "bg-purple-500/5 border-purple-500/20",
          )}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
            {message.isTyping && <span className="inline-block w-2 h-5 bg-current ml-1 animate-pulse" />}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Header */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack} className="hover:bg-accent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Snap AI</h1>
                <p className="text-sm text-muted-foreground">Powered by Gemini</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleNewChat} className="hover:bg-accent">
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-accent"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6 p-8">
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Ready to Chat!</h2>
                  <p className="text-muted-foreground">
                    Start your conversation below. I'm here to help with anything you need!
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="min-h-[48px] rounded-xl"
                  disabled={isTyping}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
