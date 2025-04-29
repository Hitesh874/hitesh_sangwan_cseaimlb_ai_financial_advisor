import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, salary, expenses } = await request.json()

    // Call the FastAPI backend
    const response = await fetch("https://ai-financial-advisor-agt6.onrender.com/api/finance-advice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salary: salary || 50000, // Default values if not provided
        expenses: expenses || 30000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      advice: data.advice,
      stockData: data.example_stock,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to get response from financial advisor" }, { status: 500 })
  }
}
