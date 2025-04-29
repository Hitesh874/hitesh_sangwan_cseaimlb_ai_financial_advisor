"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RealTimeStock from "@/components/real-time-stock"
import { ArrowRight, BarChart3, PieChart, TrendingUp, Wallet } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, mounted, router])

  if (!mounted || isLoading || !user) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Here's an overview of your financial situation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-emerald-600" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Monthly Income</div>
                <div className="text-2xl font-bold">₹50,000</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Monthly Expenses</div>
                <div className="text-2xl font-bold">₹30,000</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Savings</div>
                <div className="text-2xl font-bold text-emerald-600">₹20,000</div>
              </div>
              <Link href="/advisor">
                <Button className="w-full mt-2" variant="outline">
                  Update Financial Info
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-emerald-600" />
              Investment Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Equity Mutual Funds</span>
                <span className="font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Debt Mutual Funds</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>PPF/EPF</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span>Fixed Deposits</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>

              <Link href="/advisor/results">
                <Button className="w-full mt-2" variant="outline">
                  View Full Breakdown
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <RealTimeStock />
      </div>

      <div className="mb-8">
        <Tabs defaultValue="insights">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Financial Insights</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="insights" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Insights</CardTitle>
                <CardDescription>Personalized insights based on your financial situation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-emerald-50">
                    <h3 className="font-medium text-emerald-800 mb-1">Savings Rate: Excellent</h3>
                    <p className="text-sm text-emerald-700">
                      You're saving 40% of your income, which is well above the recommended 20%. Keep it up!
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <h3 className="font-medium text-yellow-800 mb-1">Emergency Fund: Building</h3>
                    <p className="text-sm text-yellow-700">
                      Your emergency fund covers 3 months of expenses. Aim for 6 months for better security.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h3 className="font-medium text-blue-800 mb-1">Investment Tip</h3>
                    <p className="text-sm text-blue-700">
                      Consider increasing your equity allocation to 50% for potentially higher long-term returns.
                    </p>
                  </div>

                  <Link href="/advisor/chat">
                    <Button className="w-full">
                      Get More Insights <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="goals" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Goals</CardTitle>
                <CardDescription>Track your progress towards your financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Emergency Fund</h3>
                        <p className="text-sm text-gray-500">₹1,80,000 / ₹3,00,000</p>
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Down Payment for Home</h3>
                        <p className="text-sm text-gray-500">₹5,00,000 / ₹15,00,000</p>
                      </div>
                      <span className="text-sm font-medium">33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Vacation Fund</h3>
                        <p className="text-sm text-gray-500">₹75,000 / ₹1,00,000</p>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  <Button className="w-full">Add New Goal</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent financial activities and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 p-2 rounded-full mr-3">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">SIP Investment</p>
                        <p className="text-sm text-gray-500">HDFC Equity Fund</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹10,000</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Wallet className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Salary Credit</p>
                        <p className="text-sm text-gray-500">HDFC Bank</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹50,000</p>
                      <p className="text-xs text-gray-500">5 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-2 rounded-full mr-3">
                        <BarChart3 className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Fixed Deposit</p>
                        <p className="text-sm text-gray-500">SBI Bank</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹25,000</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <TrendingUp className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Stock Purchase</p>
                        <p className="text-sm text-gray-500">Reliance Industries</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹15,000</p>
                      <p className="text-xs text-gray-500">2 weeks ago</p>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    View All Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
              Investment Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">HDFC Equity Fund</h3>
                  <span className="text-green-600">+12.5% YTD</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Large Cap | Moderate Risk</p>
                <div className="flex justify-between text-sm">
                  <span>Recommended: ₹5,000/month</span>
                  <span className="text-emerald-600 font-medium">Strong Buy</span>
                </div>
              </div>

              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">Axis Bluechip Fund</h3>
                  <span className="text-green-600">+9.8% YTD</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Large Cap | Low Risk</p>
                <div className="flex justify-between text-sm">
                  <span>Recommended: ₹3,000/month</span>
                  <span className="text-emerald-600 font-medium">Buy</span>
                </div>
              </div>

              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">SBI Small Cap Fund</h3>
                  <span className="text-green-600">+15.2% YTD</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Small Cap | High Risk</p>
                <div className="flex justify-between text-sm">
                  <span>Recommended: ₹2,000/month</span>
                  <span className="text-yellow-600 font-medium">Hold</span>
                </div>
              </div>

              <Link href="/advisor/chat">
                <Button className="w-full">Get Personalized Recommendations</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-emerald-600" />
              Tax Saving Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium">Section 80C Investments</h3>
                <div className="flex justify-between my-2">
                  <span className="text-sm text-gray-500">Used: ₹75,000</span>
                  <span className="text-sm text-gray-500">Limit: ₹1,50,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>
                <p className="text-sm text-gray-600">Potential tax savings: ₹23,400 if fully utilized</p>
              </div>

              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium">Health Insurance Premium (80D)</h3>
                <div className="flex justify-between my-2">
                  <span className="text-sm text-gray-500">Used: ₹15,000</span>
                  <span className="text-sm text-gray-500">Limit: ₹25,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <p className="text-sm text-gray-600">Potential tax savings: ₹3,120 if fully utilized</p>
              </div>

              <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium">Home Loan Interest (24B)</h3>
                <div className="flex justify-between my-2">
                  <span className="text-sm text-gray-500">Used: ₹0</span>
                  <span className="text-sm text-gray-500">Limit: ₹2,00,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <p className="text-sm text-gray-600">Potential tax savings: ₹62,400 if fully utilized</p>
              </div>

              <Link href="/advisor/chat">
                <Button className="w-full">Get Tax Saving Advice</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
