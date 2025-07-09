"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { tools } from "@/lib/tools-config"
import { URLShortener } from "@/components/tools/url-shortener"
import { QRCodeGenerator } from "@/components/tools/qr-code-generator"
import { BarcodeGenerator } from "@/components/tools/barcode-generator"
import { JSONFormatter } from "@/components/tools/json-formatter"
import { UnitConverter } from "@/components/tools/unit-converter"
import { ColorPalette } from "@/components/tools/color-palette"
import { PasswordGenerator } from "@/components/tools/password-generator"
import { Base64Tool } from "@/components/tools/base64-tool"
import { HashGenerator } from "@/components/tools/hash-generator"
import { TextDiff } from "@/components/tools/text-diff"
import { Calculator } from "@/components/tools/calculator"
import MarkdownPreviewer from "./tools/MarkdownPreviewer"
import Codebeautifierminifier from "./tools/CodebeautifierMinifier"
import { ImageGenerator } from "./tools/ImageGenerator"
interface ToolDialogProps {
  toolId: string | null
  onClose: () => void
}

const toolComponents: Record<string, React.ComponentType> = {
  "url-shortener": URLShortener,
  "qr-generator": QRCodeGenerator,
  "barcode-generator": BarcodeGenerator,
  "json-formatter": JSONFormatter,
  "unit-converter": UnitConverter,
  "color-palette": ColorPalette,
  "password-generator": PasswordGenerator,
  "base64-tool": Base64Tool,
  "hash-generator": HashGenerator,
  "text-diff": TextDiff,
  "calculator": Calculator,
  "markdown-previewer": MarkdownPreviewer,
  "code-beautifier-minifier": Codebeautifierminifier,
  "image-generator": ImageGenerator
}

export function ToolDialog({ toolId, onClose }: ToolDialogProps) {
  if (!toolId) return null


  const tool = tools.find((t) => t.id === toolId)
  const ToolComponent = toolComponents[toolId]

  if (!tool || !ToolComponent) return null

  return (
    <Dialog open={!!toolId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <tool.icon className="h-5 w-5" />
            {tool.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ToolComponent />
        </div>
      </DialogContent>
    </Dialog>
  )
}
