"use client"

import { useEffect, useRef } from "react"

interface FinancialBreakdownProps {
  salary: number
  expenses: number
  riskTolerance: number
}

export default function FinancialBreakdown({ salary, expenses, riskTolerance }: FinancialBreakdownProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Define allocation based on risk tolerance
    let allocation: { name: string; percentage: number; color: string }[] = []

    if (riskTolerance <= 3) {
      // Conservative
      allocation = [
        { name: "Fixed Deposits", percentage: 0.4, color: "#3b82f6" },
        { name: "PPF/EPF", percentage: 0.3, color: "#10b981" },
        { name: "Debt Mutual Funds", percentage: 0.2, color: "#f59e0b" },
        { name: "Equity Mutual Funds", percentage: 0.1, color: "#ef4444" },
      ]
    } else if (riskTolerance <= 7) {
      // Moderate
      allocation = [
        { name: "Equity Mutual Funds", percentage: 0.4, color: "#ef4444" },
        { name: "Debt Mutual Funds", percentage: 0.25, color: "#f59e0b" },
        { name: "PPF/EPF", percentage: 0.2, color: "#10b981" },
        { name: "Fixed Deposits", percentage: 0.15, color: "#3b82f6" },
      ]
    } else {
      // Aggressive
      allocation = [
        { name: "Equity Mutual Funds", percentage: 0.6, color: "#ef4444" },
        { name: "Mid/Small Cap Funds", percentage: 0.15, color: "#ec4899" },
        { name: "Debt Mutual Funds", percentage: 0.15, color: "#f59e0b" },
        { name: "PPF/EPF", percentage: 0.1, color: "#10b981" },
      ]
    }

    // Draw pie chart
    let startAngle = 0

    allocation.forEach((item) => {
      const sliceAngle = 2 * Math.PI * item.percentage

      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Draw label line and text
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(midAngle)
      const labelY = centerY + labelRadius * Math.sin(midAngle)

      const textRadius = radius * 1.2
      const textX = centerX + textRadius * Math.cos(midAngle)
      const textY = centerY + textRadius * Math.sin(midAngle)

      // Draw line from slice to label
      ctx.beginPath()
      ctx.strokeStyle = item.color
      ctx.lineWidth = 2
      ctx.moveTo(centerX + radius * Math.cos(midAngle), centerY + radius * Math.sin(midAngle))
      ctx.lineTo(labelX, labelY)
      ctx.lineTo(textX, textY)
      ctx.stroke()

      // Draw label text
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = midAngle < Math.PI ? "left" : "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.name} (${(item.percentage * 100).toFixed(0)}%)`, textX, textY)

      startAngle += sliceAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.fillStyle = "#ffffff"
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
    ctx.fill()

    // Draw center text
    ctx.fillStyle = "#374151"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const disposableIncome = salary - expenses
    ctx.fillText(`₹${disposableIncome.toLocaleString()}`, centerX, centerY - 10)
    ctx.font = "12px sans-serif"
    ctx.fillText("Monthly Investment", centerX, centerY + 10)
  }, [salary, expenses, riskTolerance])

  // Calculate amounts based on risk tolerance
  const disposableIncome = salary - expenses

  return (
    <div className="space-y-6">
      <div className="w-full h-[300px] relative">
        <canvas ref={canvasRef} width={500} height={300} className="w-full h-full"></canvas>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Monthly Investment Breakdown</h3>

        {riskTolerance <= 3 ? (
          // Conservative
          <div className="space-y-2">
            <AllocationItem name="Fixed Deposits" amount={Math.round(disposableIncome * 0.4)} color="#3b82f6" />
            <AllocationItem name="PPF/EPF" amount={Math.round(disposableIncome * 0.3)} color="#10b981" />
            <AllocationItem name="Debt Mutual Funds" amount={Math.round(disposableIncome * 0.2)} color="#f59e0b" />
            <AllocationItem name="Equity Mutual Funds" amount={Math.round(disposableIncome * 0.1)} color="#ef4444" />
          </div>
        ) : riskTolerance <= 7 ? (
          // Moderate
          <div className="space-y-2">
            <AllocationItem name="Equity Mutual Funds" amount={Math.round(disposableIncome * 0.4)} color="#ef4444" />
            <AllocationItem name="Debt Mutual Funds" amount={Math.round(disposableIncome * 0.25)} color="#f59e0b" />
            <AllocationItem name="PPF/EPF" amount={Math.round(disposableIncome * 0.2)} color="#10b981" />
            <AllocationItem name="Fixed Deposits" amount={Math.round(disposableIncome * 0.15)} color="#3b82f6" />
          </div>
        ) : (
          // Aggressive
          <div className="space-y-2">
            <AllocationItem name="Equity Mutual Funds" amount={Math.round(disposableIncome * 0.6)} color="#ef4444" />
            <AllocationItem name="Mid/Small Cap Funds" amount={Math.round(disposableIncome * 0.15)} color="#ec4899" />
            <AllocationItem name="Debt Mutual Funds" amount={Math.round(disposableIncome * 0.15)} color="#f59e0b" />
            <AllocationItem name="PPF/EPF" amount={Math.round(disposableIncome * 0.1)} color="#10b981" />
          </div>
        )}
      </div>
    </div>
  )
}

function AllocationItem({ name, amount, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
        <span>{name}</span>
      </div>
      <span className="font-medium">₹{amount.toLocaleString()}</span>
    </div>
  )
}
