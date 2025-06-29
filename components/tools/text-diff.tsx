"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TextDiff() {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [diff, setDiff] = useState<Array<{ type: "equal" | "delete" | "insert"; text: string }>>([])

  const calculateDiff = () => {
    const lines1 = text1.split("\n")
    const lines2 = text2.split("\n")
    const result: Array<{ type: "equal" | "delete" | "insert"; text: string }> = []

    const maxLines = Math.max(lines1.length, lines2.length)

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || ""
      const line2 = lines2[i] || ""

      if (line1 === line2) {
        if (line1 !== "") {
          result.push({ type: "equal", text: line1 })
        }
      } else {
        if (line1 && !line2) {
          result.push({ type: "delete", text: line1 })
        } else if (!line1 && line2) {
          result.push({ type: "insert", text: line2 })
        } else if (line1 && line2) {
          result.push({ type: "delete", text: line1 })
          result.push({ type: "insert", text: line2 })
        }
      }
    }

    setDiff(result)
  }

  const getDiffStats = () => {
    const additions = diff.filter((d) => d.type === "insert").length
    const deletions = diff.filter((d) => d.type === "delete").length
    const unchanged = diff.filter((d) => d.type === "equal").length

    return { additions, deletions, unchanged }
  }

  const stats = getDiffStats()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Original Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="text1">Text 1</Label>
              <Textarea
                id="text1"
                placeholder="Enter original text..."
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Modified Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="text2">Text 2</Label>
              <Textarea
                id="text2"
                placeholder="Enter modified text..."
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={calculateDiff} disabled={!text1 && !text2}>
          Compare Texts
        </Button>
      </div>

      {diff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Differences
              <div className="flex gap-2">
                <Badge variant="destructive">-{stats.deletions}</Badge>
                <Badge variant="default">+{stats.additions}</Badge>
                <Badge variant="secondary">{stats.unchanged} unchanged</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 font-mono text-sm max-h-96 overflow-y-auto">
              {diff.map((item, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 ${
                    item.type === "delete"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                      : item.type === "insert"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                        : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <span className="mr-2 text-xs text-muted-foreground">
                    {item.type === "delete" ? "-" : item.type === "insert" ? "+" : " "}
                  </span>
                  {item.text || "(empty line)"}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
