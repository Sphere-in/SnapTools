"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const conversions = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meter", factor: 1 },
      kilometer: { name: "Kilometer", factor: 1000 },
      centimeter: { name: "Centimeter", factor: 0.01 },
      millimeter: { name: "Millimeter", factor: 0.001 },
      inch: { name: "Inch", factor: 0.0254 },
      foot: { name: "Foot", factor: 0.3048 },
      yard: { name: "Yard", factor: 0.9144 },
      mile: { name: "Mile", factor: 1609.34 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilogram", factor: 1 },
      gram: { name: "Gram", factor: 0.001 },
      pound: { name: "Pound", factor: 0.453592 },
      ounce: { name: "Ounce", factor: 0.0283495 },
      ton: { name: "Ton", factor: 1000 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius" },
      fahrenheit: { name: "Fahrenheit" },
      kelvin: { name: "Kelvin" },
    },
  },
}

export function UnitConverter() {
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("meter")
  const [toUnit, setToUnit] = useState("kilometer")
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const convert = (value: string, from: string, to: string, cat: string) => {
    if (!value || isNaN(Number(value))) return ""

    const num = Number(value)

    if (cat === "temperature") {
      let celsius = num
      if (from === "fahrenheit") celsius = ((num - 32) * 5) / 9
      if (from === "kelvin") celsius = num - 273.15

      if (to === "celsius") return celsius.toString()
      if (to === "fahrenheit") return ((celsius * 9) / 5 + 32).toString()
      if (to === "kelvin") return (celsius + 273.15).toString()
    } else {
      const categoryData = conversions[cat as keyof typeof conversions]
      const fromFactor = categoryData.units[from as keyof typeof categoryData.units].factor
      const toFactor = categoryData.units[to as keyof typeof categoryData.units].factor

      if (fromFactor && toFactor) {
        const result = (num * fromFactor) / toFactor
        return result.toString()
      }
    }

    return ""
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    setToValue(convert(value, fromUnit, toUnit, category))
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    setFromValue(convert(value, toUnit, fromUnit, category))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value)
              setFromValue("")
              setToValue("")
              const units = Object.keys(conversions[value as keyof typeof conversions].units)
              setFromUnit(units[0])
              setToUnit(units[1] || units[0])
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(conversions).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">From</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select
                value={fromUnit}
                onValueChange={(value) => {
                  setFromUnit(value)
                  setToValue(convert(fromValue, value, toUnit, category))
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">To</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select
                value={toUnit}
                onValueChange={(value) => {
                  setToUnit(value)
                  setFromValue(convert(toValue, value, fromUnit, category))
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                placeholder="Converted value"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
