"use client"
// this is used to make the ai response in proper format 
import ReactMarkdown from "react-markdown"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ArrowLeft, Sun, Moon, Sparkles, RotateCcw, Copy, Volume2, Mic, MicOff, Plus, Settings2, Square } from "lucide-react"
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
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState(false)
  const { theme, setTheme } = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])



  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [input])

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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
          }),
        },
      )

      const data = await res.json()
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response."

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
      await new Promise((resolve) => setTimeout(resolve, 30))
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

  // For voice input
  const SpeechRecognition =
    typeof window !== "undefined" &&
    ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)

  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  const handleMicClick = () => {
    if (!recognition) {
      alert("Speech Recognition is not supported in this browser.")
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)
      return
    }

    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.start()
    setIsListening(true)

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput((prev) => (prev ? prev + " " : "") + transcript)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false);
    }

    recognition.onend = () => {
      console.log("Speech recognition ended.")
      setIsListening(false)
    }
  }

  // For speak output or response 
  const speakText = (text: string) => {
    if (typeof window === "undefined") return

    const synth = window.speechSynthesis
    let voices = synth.getVoices()

    const speak = () => {
      voices = synth.getVoices()

      const hindiFemaleVoice =
        voices.find(
          (voice) =>
            voice.lang === "hi-IN" &&
            voice.name.toLowerCase().includes("female")
        ) || voices.find((voice) => voice.lang === "hi-IN")

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "hi-IN"
      if (hindiFemaleVoice) utterance.voice = hindiFemaleVoice

      // Start speaking
      synth.cancel()
      synth.speak(utterance)
      setIsSpeaking(true)

      // 🔁 Reset to not speaking once speech is done
      utterance.onend = () => {
        console.log("Speech ended")
        setIsSpeaking(false)
      }

      // 🛑 If there's an error, also reset
      utterance.onerror = (e) => {
        console.error("Speech synthesis error:", e)
        setIsSpeaking(false)
      }
    }

    if (voices.length === 0) {
      setTimeout(speak, 100)
    } else {
      speak()
    }
  }



  //copy the response 
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert("Copied to clipboard!") // Replace with toast if needed
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }


  const MessageBubble = ({ message }: { message: Message }) => (
    <div
      className={cn(
        "flex  rounded-3xl gap-4 p-6 group transition-all duration-300 hover:bg-accent/10 overflow-x-hidden",
        message.role === "user" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div className={cn("flex-1 space-y-2 max-w-[80%]", message.role === "user" ? "items-end" : "items-start")}>
        <div className={cn("flex items-center gap-2", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
          <span className={cn("text-sm  font-medium", message.role === "user" ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400")}>
            {message.role === "user" ? "You" : "Snap AI"}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

        </div>
        <div className={cn("relative py-2.5 px-6 rounded-3xl w-fit max-w-full sm:max-w-[75%] lg:max-w-[85%] transition-all duration-200 border-transparent", message.role === "user" ? "bg-muted/35  ml-auto" : "bg-purple-500/5 ")}>
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap break-word">
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
            {message.isTyping && <span className="inline-block w-2 h-5 bg-current ml-1 animate-pulse" />}
          </div>
        </div>
        {
          message.role != "user" ?
            <div className="flex ">
              <button
                title="Copy"
                onClick={() => copyToClipboard(message.content)}
                className=" p-2 w-fit rounded-lg hover:bg-muted/90 text-slate-400">
                <Copy className="w-4 h-4" />

              </button>
              {!isSpeaking ? (
                <button
                  onClick={() => {
                    if (isSpeaking) return;
                    setIsSpeaking(true);
                    speakText(message.content)
                  }}
                  className="p-2 w-fit rounded-lg hover:bg-muted/90 text-slate-400 cursor-pointer"
                  title="Speak message"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )
                : (
                  <button
                    onClick={() => {
                      if (!isSpeaking) return;
                      setIsSpeaking(false);
                      window.speechSynthesis.cancel()
                    }}
                    className="p-2 w-fit rounded-lg hover:bg-muted/90 text-slate-400 cursor-pointer"
                    title="Speak message">
                    <Square className="w-4 h-4" />
                  </button>
                )}

            </div>
            :
            <></>
        }
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4">
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
                <p className="text-xs text-muted-foreground">Powered by Gemini</p>
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
        <ScrollArea className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-4xl mx-auto px-4 pb-36 space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-fit min-h-[500px] text-center space-y-8 p-8">
                <div className="bg-black p-5 rounded-full shadow-lg animate-fade-in-up">
                  <Sparkles className="h-10 w-10 text-white animate-pulse" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-4xl font-extrabold text-foreground leading-tight">
                    Welcome to <span className="text-purple-500">Snap AI</span>
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Get answers, brainstorm ideas, write faster, or just chat. I’m your AI companion — powered by Gemini.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-4xl text-sm">
                  {[
                    "🧠 Summarize long content quickly",
                    "💡 Brainstorm app or product ideas",
                    "✍️ Draft professional emails",
                    "📜 Improve or rewrite text",
                    "🔎 Explain any concept simply",
                    "🧑‍💻 Debug & write code snippets",
                  ].map((prompt, i) => (
                    <div
                      key={i}
                      className="p-4  bg-gradient-to-br from-violet-950/10 to-accent/50  rounded-3xl hover:bg-accent transition-all shadow-sm backdrop-blur-md"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="space-y-4"
              >
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 ">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col  bg-muted/55  py-2 px-2.5 rounded-3xl ">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask away, I’m listening..."
                rows={1}
                className="w-full px-3 resize-none overflow-y-auto max-h-40 min-h-[48px] bg-transparent text-sm outline-none border-none focus:ring-0 focus:outline-none placeholder:text-muted-foreground pt-[13px]"
                disabled={isTyping}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className=" p-2 rounded-full hover:bg-muted">
                    <Plus className="w-6 h-6" />
                  </span>
                  <span className="flex gap-1  rounded-full hover:bg-muted text-sm items-center justify-center px-3 py-2">
                    <Settings2 className="w-5 h-5" />
                    Tools
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    onClick={handleMicClick}
                    className={cn(
                      "p-2 flex items-center justify-center rounded-full cursor-pointer transition-all",
                      isListening ? "bg-red-100 text-red-600 animate-pulse" : "hover:bg-muted text-muted-foreground"
                    )}
                    title={isListening ? "Stop listening" : "Click to speak"}
                  >
                    {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </span>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    title="Send"
                    size="icon"
                    className="h-10 w-10 cursor-pointer rounded-full text-black bg-slate-200"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
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
