"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { tools } from "@/lib/tools-config"
import { ToolDialog } from "@/components/tool-dialog"

export function ToolGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const categories = Array.from(new Set(tools.map((tool) => tool.category)))

  return (
    <div className="space-y-8">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {categories.map((category) => {
        const categoryTools = filteredTools.filter((tool) => tool.category === category)
        if (categoryTools.length === 0) return null

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )
      })}

      <ToolDialog toolId={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  )
}
