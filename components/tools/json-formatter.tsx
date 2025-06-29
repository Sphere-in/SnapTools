"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Copy, Download } from "lucide-react"
import { toast } from "sonner"

export function JSONFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
      toast.success("JSON formatted successfully!")
    } catch (err) {
      setError("Invalid JSON format")
      setOutput("")
      toast.error("Invalid JSON format")
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
      toast.success("JSON minified successfully!")
    } catch (err) {
      setError("Invalid JSON format")
      setOutput("")
      toast.error("Invalid JSON format")
    }
  }

  const validateJSON = () => {
    try {
      JSON.parse(input)
      setError("")
      toast.success("Valid JSON!")
    } catch (err) {
      setError("Invalid JSON format")
      toast.error("Invalid JSON format")
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      toast.success("Copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy")
    }
  }

  const downloadJSON = () => {
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "formatted.json"
    link.click()
    URL.revokeObjectURL(url)
    toast.success("JSON file downloaded!")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="json-input">JSON Input</Label>
            <Textarea
              id="json-input"
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={formatJSON}>Format</Button>
            <Button onClick={minifyJSON} variant="outline">
              Minify
            </Button>
            <Button onClick={validateJSON} variant="outline">
              Validate
            </Button>
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">{error}</div>}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="json-output">Formatted Output</Label>
            <Textarea
              id="json-output"
              value={output}
              readOnly
              rows={12}
              className="font-mono text-sm"
              placeholder="Formatted JSON will appear here..."
            />
          </div>

          {output && (
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button onClick={downloadJSON} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
