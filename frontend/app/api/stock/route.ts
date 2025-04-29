import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const symbol = searchParams.get("symbol") || "RELIANCE.NS"

    // Call your FastAPI backend to get stock data
    // This is a simplified version - in a real app, you'd have an endpoint for this
    const response = await fetch("https://ai-financial-advisor-agt6.onrender.com/api/finance-advice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salary: 50000, // Default values
        expenses: 30000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      stockData: data.example_stock,
    })
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}
