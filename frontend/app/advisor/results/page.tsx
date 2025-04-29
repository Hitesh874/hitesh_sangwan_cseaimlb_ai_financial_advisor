"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Download, PieChart, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"
import StockChart from "@/components/stock-chart"
import FinancialBreakdown from "@/components/financial-breakdown"
import ProtectedRoute from "@/components/protected-route"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [advice, setAdvice] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [stockData, setStockData] = useState(null)

  const salary = searchParams.get("salary") || "0"
  const expenses = searchParams.get("expenses") || "0"
  const riskTolerance = searchParams.get("riskTolerance") || "5"

  useEffect(() => {
    async function fetchAdvice() {
      try {
        // In a real app, this would call your API
        // For demo purposes, we'll generate some advice based on the inputs
        const salaryNum = Number.parseInt(salary)
        const expensesNum = Number.parseInt(expenses)
        const riskToleranceNum = Number.parseInt(riskTolerance)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Generate advice based on inputs
        const disposableIncome = salaryNum - expensesNum
        const savingsRate = Math.min(0.5, Math.max(0.1, disposableIncome / salaryNum))

        let adviceText = `Based on your monthly income of ₹${salaryNum.toLocaleString()} and expenses of ₹${expensesNum.toLocaleString()}, you have ₹${disposableIncome.toLocaleString()} available for savings and investments.\n\n`

        adviceText += `## Savings Recommendation\n\n`
        adviceText += `- Emergency Fund: ₹${Math.round(expensesNum * 6).toLocaleString()} (6 months of expenses)\n`
        adviceText += `- Monthly Savings Target: ₹${Math.round(disposableIncome * 0.4).toLocaleString()} (40% of disposable income)\n\n`

        adviceText += `## Investment Allocation\n\n`

        if (riskToleranceNum <= 3) {
          // Conservative
          adviceText += `Based on your conservative risk profile (${riskToleranceNum}/10), I recommend:\n\n`
          adviceText += `- Fixed Deposits: 40%\n`
          adviceText += `- PPF/EPF: 30%\n`
          adviceText += `- Debt Mutual Funds: 20%\n`
          adviceText += `- Equity Mutual Funds: 10%\n`
        } else if (riskToleranceNum <= 7) {
          // Moderate
          adviceText += `Based on your moderate risk profile (${riskToleranceNum}/10), I recommend:\n\n`
          adviceText += `- Equity Mutual Funds: 40%\n`
          adviceText += `- Debt Mutual Funds: 25%\n`
          adviceText += `- PPF/EPF: 20%\n`
          adviceText += `- Fixed Deposits: 15%\n`
        } else {
          // Aggressive
          adviceText += `Based on your aggressive risk profile (${riskToleranceNum}/10), I recommend:\n\n`
          adviceText += `- Equity Mutual Funds: 60%\n`
          adviceText += `- Mid/Small Cap Funds: 15%\n`
          adviceText += `- Debt Mutual Funds: 15%\n`
          adviceText += `- PPF/EPF: 10%\n`
        }

        adviceText += `\n## Additional Recommendations\n\n`
        adviceText += `- Consider investing ₹${Math.min(150000, Math.round(salaryNum * 2)).toLocaleString()} annually in tax-saving instruments under Section 80C\n`
        adviceText += `- Set up an SIP (Systematic Investment Plan) of ₹${Math.round(disposableIncome * 0.3).toLocaleString()} per month\n`
        adviceText += `- Review your investment portfolio quarterly and rebalance if needed\n`

        setAdvice(adviceText)

        // Mock stock data
        setStockData({
          name: "Reliance Industries",
          price: 2876.45,
          change: 23.75,
          percentChange: 0.83,
          history: [2830.15, 2845.3, 2852.7, 2840.1, 2876.45],
        })
      } catch (error) {
        console.error("Error fetching advice:", error)
        setAdvice("Sorry, there was an error generating your financial advice. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAdvice()
  }, [salary, expenses, riskTolerance])

  // Calculate savings and investment amounts for the chart
  const disposableIncome = Number.parseInt(salary) - Number.parseInt(expenses)
  const savings = Math.round(disposableIncome * 0.4)
  const investments = Math.round(disposableIncome * 0.6)

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/advisor">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Form
            </Button>
          </Link>
          <Link href={`/advisor/chat?salary=${salary}&expenses=${expenses}&riskTolerance=${riskTolerance}`}>
            <Button variant="outline" className="mb-4 ml-2">
              Chat with AI Advisor
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Your Financial Plan</h1>
          <p className="text-gray-600">
            Based on income of ₹{Number.parseInt(salary).toLocaleString()}, expenses of ₹
            {Number.parseInt(expenses).toLocaleString()}, and risk tolerance of {riskTolerance}/10
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="advice" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="advice">Advice</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="market">Market Data</TabsTrigger>
              </TabsList>

              <TabsContent value="advice" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5 text-emerald-600" />
                      Financial Advice
                    </CardTitle>
                    <CardDescription>Personalized recommendations based on your financial situation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-4 w-[85%]" />
                        <Skeleton className="h-4 w-[75%]" />
                      </div>
                    ) : (
                      <div className="prose max-w-none">
                        {advice?.split("\n").map((line, index) => {
                          if (line.startsWith("##")) {
                            return (
                              <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                                {line.replace("##", "")}
                              </h3>
                            )
                          } else if (line.startsWith("-")) {
                            return (
                              <p key={index} className="flex items-start mb-2">
                                <span className="mr-2 text-emerald-600">•</span>
                                <span>{line.substring(2)}</span>
                              </p>
                            )
                          } else {
                            return (
                              <p key={index} className="mb-4">
                                {line}
                              </p>
                            )
                          }
                        })}
                      </div>
                    )}

                    <Button className="mt-6" variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Download Financial Plan
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="investments" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5 text-emerald-600" />
                      Investment Breakdown
                    </CardTitle>
                    <CardDescription>Recommended allocation of your investments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Skeleton className="h-[300px] w-full" />
                    ) : (
                      <div>
                        <FinancialBreakdown
                          salary={Number.parseInt(salary)}
                          expenses={Number.parseInt(expenses)}
                          riskTolerance={Number.parseInt(riskTolerance)}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
                      Market Insights
                    </CardTitle>
                    <CardDescription>Current market data and stock recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading || !stockData ? (
                      <Skeleton className="h-[300px] w-full" />
                    ) : (
                      <div>
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-2">Featured Stock: {stockData.name}</h3>
                          <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold mr-2">₹{stockData.price}</span>
                            <span className={`text-sm ${stockData.change > 0 ? "text-green-600" : "text-red-600"}`}>
                              {stockData.change > 0 ? "+" : ""}
                              {stockData.change} ({stockData.percentChange}%)
                            </span>
                          </div>

                          <StockChart data={stockData.history} />
                        </div>

                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-4">Recommended Stocks Based on Your Profile</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StockCard name="HDFC Bank" price="1,642.30" change="+12.45" percent="+0.76%" />
                            <StockCard name="Infosys" price="1,456.75" change="+8.20" percent="+0.57%" />
                            <StockCard name="TCS" price="3,567.90" change="+15.30" percent="+0.43%" />
                            <StockCard name="ITC Ltd" price="432.15" change="+3.75" percent="+0.88%" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Overview of your financial situation</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Monthly Income</h3>
                      <p className="text-2xl font-bold">₹{Number.parseInt(salary).toLocaleString()}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Monthly Expenses</h3>
                      <p className="text-2xl font-bold">₹{Number.parseInt(expenses).toLocaleString()}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Disposable Income</h3>
                      <p className="text-2xl font-bold text-emerald-600">₹{disposableIncome.toLocaleString()}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Recommended Allocation</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Savings</span>
                          <span className="font-medium">₹{savings.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <span>Investments</span>
                          <span className="font-medium">₹{investments.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Risk Profile</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${
                              Number.parseInt(riskTolerance) <= 3
                                ? "bg-blue-600"
                                : Number.parseInt(riskTolerance) <= 7
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${Number.parseInt(riskTolerance) * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{riskTolerance}/10</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-500">
                        {Number.parseInt(riskTolerance) <= 3
                          ? "Conservative"
                          : Number.parseInt(riskTolerance) <= 7
                            ? "Moderate"
                            : "Aggressive"}{" "}
                        investor
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-emerald-100 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      1
                    </div>
                    <span>Set up an emergency fund</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      2
                    </div>
                    <span>Start a systematic investment plan (SIP)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      3
                    </div>
                    <span>Review and optimize tax-saving investments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      4
                    </div>
                    <span>Schedule a quarterly portfolio review</span>
                  </li>
                </ul>

                <Button className="w-full mt-6">Schedule a Consultation</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function StockCard({ name, price, change, percent }) {
  const isPositive = change.startsWith("+")

  return (
    <div className="border rounded-lg p-4">
      <h4 className="font-medium">{name}</h4>
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-bold">₹{price}</span>
        <span className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {change} ({percent})
        </span>
      </div>
    </div>
  )
}
