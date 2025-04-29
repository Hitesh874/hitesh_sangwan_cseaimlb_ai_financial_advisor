"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import StockChart from "@/components/stock-chart"

type StockData = {
  name: string
  price: number
  change?: number
  percentChange?: number
}

export default function RealTimeStock() {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<number[]>([])
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  const fetchStockData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/stock")
      if (!response.ok) {
        throw new Error("Failed to fetch stock data")
      }
      const data = await response.json()

      if (data.stockData) {
        setStockData(data.stockData)

        // Update chart data with new price
        setChartData((prev) => {
          const newData = [...prev, data.stockData.price]
          // Keep only the last 10 data points
          if (newData.length > 10) {
            return newData.slice(newData.length - 10)
          }
          return newData
        })
      }
    } catch (error) {
      console.error("Error fetching stock data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStockData()

    // Set up interval for real-time updates
    const interval = setInterval(fetchStockData, 30000) // Update every 30 seconds
    setRefreshInterval(interval)

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [])

  const handleManualRefresh = () => {
    fetchStockData()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Real-Time Stock Data</CardTitle>
        <Button variant="outline" size="sm" onClick={handleManualRefresh} disabled={loading} className="h-8 w-8 p-0">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading && !stockData ? (
          <div className="flex flex-col items-center justify-center h-[200px]">
            <RefreshCw className="h-8 w-8 text-emerald-600 animate-spin mb-2" />
            <p className="text-sm text-gray-500">Loading stock data...</p>
          </div>
        ) : stockData ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">{stockData.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold">₹{stockData.price.toFixed(2)}</span>
                  {stockData.change && (
                    <span
                      className={`ml-2 flex items-center text-sm ${
                        stockData.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stockData.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {stockData.change >= 0 ? "+" : ""}
                      {stockData.change.toFixed(2)} ({stockData.percentChange?.toFixed(2)}%)
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500">Auto-refreshes every 30s</div>
            </div>

            {chartData.length > 1 ? (
              <StockChart data={chartData} />
            ) : (
              <div className="h-[200px] flex items-center justify-center border rounded">
                <p className="text-sm text-gray-500">Collecting data points...</p>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px]">
            <p className="text-sm text-gray-500">Failed to load stock data</p>
            <Button variant="outline" size="sm" onClick={handleManualRefresh} className="mt-2">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
