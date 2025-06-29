"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export function HashGenerator() {
  const [input, setInput] = useState("")
  const [algorithm, setAlgorithm] = useState("SHA-256")
  const [hash, setHash] = useState("")

  const generateHash = async () => {
    if (!input.trim()) {
      toast.error("Please enter text to hash")
      return
    }

    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(input)

      let hashBuffer: ArrayBuffer

      switch (algorithm) {
        case "SHA-1":
          hashBuffer = await crypto.subtle.digest("SHA-1", data)
          break
        case "SHA-256":
          hashBuffer = await crypto.subtle.digest("SHA-256", data)
          break
        case "SHA-384":
          hashBuffer = await crypto.subtle.digest("SHA-384", data)
          break
        case "SHA-512":
          hashBuffer = await crypto.subtle.digest("SHA-512", data)
          break
        default:
          throw new Error("Unsupported algorithm")
      }

      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

      setHash(hashHex)
      toast.success(`${algorithm} hash generated!`)
    } catch (error) {
      toast.error("Failed to generate hash")
    }
  }

  const copyHash = async () => {
    if (!hash) return

    try {
      await navigator.clipboard.writeText(hash)
      toast.success("Hash copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy hash")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hash-input">Text to Hash</Label>
                <Textarea
                  id="hash-input"
                  placeholder="Enter text to generate hash..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="algorithm">Hash Algorithm</Label>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SHA-1">SHA-1</SelectItem>
                    <SelectItem value="SHA-256">SHA-256</SelectItem>
                    <SelectItem value="SHA-384">SHA-384</SelectItem>
                    <SelectItem value="SHA-512">SHA-512</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateHash} className="w-full">
                Generate {algorithm} Hash
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generated Hash</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hash-output">Hash Output</Label>
                <Textarea
                  id="hash-output"
                  value={hash}
                  readOnly
                  rows={6}
                  className="font-mono text-sm"
                  placeholder="Generated hash will appear here..."
                />
              </div>

              {hash && (
                <div className="space-y-2">
                  <Button onClick={copyHash} className="w-full bg-transparent" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Hash
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Algorithm:</strong> {algorithm}
                    </p>
                    <p>
                      <strong>Length:</strong> {hash.length} characters
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
