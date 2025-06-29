"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface Color {
  hex: string
  rgb: string
  hsl: string
}

export function ColorPalette() {
  const [colors, setColors] = useState<Color[]>([])

  const generateRandomColor = (): Color => {
    const hex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)

    const rgb = `rgb(${r}, ${g}, ${b})`

    const h = Math.round((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI)
    const l = Math.round(((r + g + b) / 3 / 255) * 100)
    const s = Math.round(((Math.max(r, g, b) - Math.min(r, g, b)) / Math.max(r, g, b)) * 100)
    const hsl = `hsl(${h}, ${s}%, ${l}%)`

    return { hex, rgb, hsl }
  }

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor())
    setColors(newColors)
  }

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      toast.success(`Copied ${color} to clipboard!`)
    } catch (error) {
      toast.error("Failed to copy color")
    }
  }

  useEffect(() => {
    generatePalette()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Button onClick={generatePalette} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Generate New Palette
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {colors.map((color, index) => (
          <Card key={index} className="overflow-hidden">
            <div
              className="h-32 w-full cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyColor(color.hex)}
            />
            <CardContent className="p-4 space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono">{color.hex}</span>
                  <Button size="sm" variant="ghost" onClick={() => copyColor(color.hex)} className="h-6 w-6 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">{color.rgb}</span>
                  <Button size="sm" variant="ghost" onClick={() => copyColor(color.rgb)} className="h-6 w-6 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">{color.hsl}</span>
                  <Button size="sm" variant="ghost" onClick={() => copyColor(color.hsl)} className="h-6 w-6 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
