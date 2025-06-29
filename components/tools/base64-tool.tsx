"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"

export function Base64Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const encode = () => {
    try {
      const encoded = btoa(input)
      setOutput(encoded)
      toast.success("Text encoded to Base64!")
    } catch (error) {
      toast.error("Failed to encode text")
    }
  }

  const decode = () => {
    try {
      const decoded = atob(input)
      setOutput(decoded)
      toast.success("Base64 decoded to text!")
    } catch (error) {
      toast.error("Invalid Base64 string")
    }
  }

  const switchMode = () => {
    setMode(mode === "encode" ? "decode" : "encode")
    setInput(output)
    setOutput("")
  }

  const copyToClipboard = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      toast.success("Copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Button onClick={switchMode} variant="outline" className="flex items-center gap-2 bg-transparent">
          <ArrowUpDown className="h-4 w-4" />
          Switch to {mode === "encode" ? "Decode" : "Encode"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{mode === "encode" ? "Text Input" : "Base64 Input"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">{mode === "encode" ? "Enter text to encode" : "Enter Base64 to decode"}</Label>
              <Textarea
                id="input"
                placeholder={mode === "encode" ? "Enter your text here..." : "Enter Base64 string here..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={mode === "encode" ? encode : decode} className="w-full" disabled={!input.trim()}>
              {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{mode === "encode" ? "Base64 Output" : "Text Output"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="output">{mode === "encode" ? "Encoded Base64" : "Decoded Text"}</Label>
              <Textarea
                id="output"
                value={output}
                readOnly
                rows={8}
                className="font-mono text-sm"
                placeholder={
                  mode === "encode" ? "Base64 output will appear here..." : "Decoded text will appear here..."
                }
              />
            </div>

            {output && (
              <Button onClick={copyToClipboard} className="w-full bg-transparent" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
