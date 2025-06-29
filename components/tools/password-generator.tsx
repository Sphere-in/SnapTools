"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (!charset) {
      toast.error("Please select at least one character type")
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(result)
    toast.success("Password generated!")
  }

  const copyPassword = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      toast.success("Password copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy password")
    }
  }

  const getStrengthColor = () => {
    if (length[0] < 8) return "text-red-500"
    if (length[0] < 12) return "text-yellow-500"
    return "text-green-500"
  }

  const getStrengthText = () => {
    if (length[0] < 8) return "Weak"
    if (length[0] < 12) return "Medium"
    return "Strong"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Password Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Length: {length[0]}</Label>
                <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                  <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                  <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                  <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                </div>
              </div>

              <Button onClick={generatePassword} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Password
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generated Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Strength</Label>
                  <span className={`text-sm font-medium ${getStrengthColor()}`}>{getStrengthText()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={password}
                    readOnly
                    placeholder="Generated password will appear here"
                    className="font-mono"
                  />
                  <Button size="icon" onClick={copyPassword} disabled={!password}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {password && (
                <div className="text-sm text-muted-foreground">
                  <p>• Never share your password with anyone</p>
                  <p>• Use unique passwords for each account</p>
                  <p>• Consider using a password manager</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
