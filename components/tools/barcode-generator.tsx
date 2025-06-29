"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { toast } from "sonner"

export function BarcodeGenerator() {
  const [text, setText] = useState("")
  const [format, setFormat] = useState("code128")
  const [barcodeUrl, setBarcodeUrl] = useState("")

  useEffect(() => {
    if (text && text.length > 0) {
      // Using barcode generator API
      const url = `https://barcodeapi.org/api/${format}/${encodeURIComponent(text)}`
      setBarcodeUrl(url)
    } else {
      setBarcodeUrl("")
    }
  }, [text, format])

  const downloadBarcode = () => {
    if (!barcodeUrl) return

    const link = document.createElement("a")
    link.href = barcodeUrl
    link.download = "barcode.png"
    link.click()
    toast.success("Barcode downloaded!")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="barcode-text">Text or Number</Label>
            <Input
              id="barcode-text"
              placeholder="Enter text or number"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Barcode Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code128">Code 128</SelectItem>
                <SelectItem value="code39">Code 39</SelectItem>
                <SelectItem value="ean13">EAN-13</SelectItem>
                <SelectItem value="ean8">EAN-8</SelectItem>
                <SelectItem value="upc">UPC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {barcodeUrl ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generated Barcode</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <img src={barcodeUrl || "/placeholder.svg"} alt="Barcode" className="border rounded max-w-full" />
                </div>
                <Button onClick={downloadBarcode} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Barcode
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
                Enter text to generate barcode
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
