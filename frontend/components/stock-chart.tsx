"use client"

import { useEffect, useRef } from "react"

interface StockChartProps {
  data: number[]
}

export default function StockChart({ data }: StockChartProps) {
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
    const padding = 20

    // Find min and max values
    const min = Math.min(...data) * 0.995
    const max = Math.max(...data) * 1.005

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#10b981" // Emerald color
    ctx.lineWidth = 2

    // Plot points
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
      const y = height - padding - ((value - min) / (max - min)) * (height - 2 * padding)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding + ((data.length - 1) / (data.length - 1)) * (width - 2 * padding), height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    ctx.fillStyle = "rgba(16, 185, 129, 0.1)"
    ctx.fill()

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // X-axis
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)

    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    ctx.strokeStyle = "#f3f4f6"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 1; i < 5; i++) {
      const y = padding + (i / 5) * (height - 2 * padding)
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }

    // Vertical grid lines
    for (let i = 1; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding)
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
    }

    ctx.stroke()

    // Draw price labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "right"

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const value = min + (i / 5) * (max - min)
      const y = height - padding - (i / 5) * (height - 2 * padding)
      ctx.fillText(value.toFixed(2), padding - 5, y + 3)
    }
  }, [data])

  return (
    <div className="w-full h-[200px]">
      <canvas ref={canvasRef} width={500} height={200} className="w-full h-full"></canvas>
    </div>
  )
}
