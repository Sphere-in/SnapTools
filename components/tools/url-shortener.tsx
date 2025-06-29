"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { createShortUrl } from "@/lib/actions"

export function URLShortener() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreate(formData: FormData) {
    const originalUrl = formData.get("url") as string
    const code = await createShortUrl(originalUrl)
    return `${process.env.NEXT_PUBLIC_BASE_URL}/s/${code}`
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
      <form action={async (formData) => {
        const url = await handleCreate(formData)
        setShortUrl(url)
      }} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Enter URL to shorten</Label>
          <Input
            id="url"
            name="url"
            placeholder="https://example.com/very-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button disabled={isLoading} className="w-full">
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>

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
