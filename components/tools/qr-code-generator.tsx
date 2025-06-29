"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { toast } from "sonner"

export function QRCodeGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState("200")
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  useEffect(() => {
    if (text) {
      // Using QR Server API for demonstration
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
      setQrCodeUrl(url)
    } else {
      setQrCodeUrl("")
    }
  }, [text, size])

  const downloadQR = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = "qrcode.png"
    link.click()
    toast.success("QR code downloaded!")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text or URL</Label>
            <Textarea
              id="text"
              placeholder="Enter text or URL to generate QR code"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="150">150x150</SelectItem>
                <SelectItem value="200">200x200</SelectItem>
                <SelectItem value="300">300x300</SelectItem>
                <SelectItem value="400">400x400</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {qrCodeUrl ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generated QR Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="border rounded" />
                </div>
                <Button onClick={downloadQR} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
                Enter text to generate QR code
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
