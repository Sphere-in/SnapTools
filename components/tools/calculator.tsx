"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const toggleSign = () => {
    if (display !== "0") {
      setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display)
    }
  }

  const inputPercent = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const buttonClass = "h-12 text-lg font-semibold"
  const operatorClass = "h-12 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
  const functionClass =
    "h-12 text-lg font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input value={display} readOnly className="text-right text-2xl font-mono h-16 text-lg" />

          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <Button onClick={clear} className={functionClass}>
              AC
            </Button>
            <Button onClick={clearEntry} className={functionClass}>
              CE
            </Button>
            <Button onClick={inputPercent} className={functionClass}>
              %
            </Button>
            <Button onClick={() => inputOperation("÷")} className={operatorClass}>
              ÷
            </Button>

            {/* Row 2 */}
            <Button onClick={() => inputNumber("7")} className={buttonClass}>
              7
            </Button>
            <Button onClick={() => inputNumber("8")} className={buttonClass}>
              8
            </Button>
            <Button onClick={() => inputNumber("9")} className={buttonClass}>
              9
            </Button>
            <Button onClick={() => inputOperation("×")} className={operatorClass}>
              ×
            </Button>

            {/* Row 3 */}
            <Button onClick={() => inputNumber("4")} className={buttonClass}>
              4
            </Button>
            <Button onClick={() => inputNumber("5")} className={buttonClass}>
              5
            </Button>
            <Button onClick={() => inputNumber("6")} className={buttonClass}>
              6
            </Button>
            <Button onClick={() => inputOperation("-")} className={operatorClass}>
              -
            </Button>

            {/* Row 4 */}
            <Button onClick={() => inputNumber("1")} className={buttonClass}>
              1
            </Button>
            <Button onClick={() => inputNumber("2")} className={buttonClass}>
              2
            </Button>
            <Button onClick={() => inputNumber("3")} className={buttonClass}>
              3
            </Button>
            <Button onClick={() => inputOperation("+")} className={operatorClass}>
              +
            </Button>

            {/* Row 5 */}
            <Button onClick={toggleSign} className={buttonClass}>
              ±
            </Button>
            <Button onClick={() => inputNumber("0")} className={buttonClass}>
              0
            </Button>
            <Button onClick={inputDecimal} className={buttonClass}>
              .
            </Button>
            <Button onClick={performCalculation} className={operatorClass}>
              =
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
