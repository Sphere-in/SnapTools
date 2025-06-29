"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"

export function URLShortener() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const shortenUrl = async () => {
    if (!url) {
      toast.error("Please enter a URL")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call - in real app, you'd call your shortening service
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const shortened = `https://short.ly/${Math.random().toString(36).substr(2, 8)}`
      setShortUrl(shortened)
      toast.success("URL shortened successfully!")
    } catch (error) {
      toast.error("Failed to shorten URL")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      toast.success("Copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Enter URL to shorten</Label>
          <Input
            id="url"
            placeholder="https://example.com/very-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button onClick={shortenUrl} disabled={isLoading} className="w-full">
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>

      {shortUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shortened URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={shortUrl} readOnly />
              <Button size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="icon" asChild>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
