"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ChatInterface from "@/components/chat-interface"
import RealTimeStock from "@/components/real-time-stock"
import ProtectedRoute from "@/components/protected-route"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const [salary, setSalary] = useState<number | undefined>(undefined)
  const [expenses, setExpenses] = useState<number | undefined>(undefined)

  useEffect(() => {
    const salaryParam = searchParams.get("salary")
    const expensesParam = searchParams.get("expenses")

    if (salaryParam) {
      setSalary(Number.parseInt(salaryParam))
    }
    if (expensesParam) {
      setExpenses(Number.parseInt(expensesParam))
    }
  }, [searchParams])

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/advisor">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Form
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Chat with Your AI Financial Advisor</h1>
          <p className="text-gray-600">
            Ask questions about your finances and get personalized advice
            {salary && expenses
              ? ` based on your income of ₹${salary.toLocaleString()} and expenses of ₹${expenses.toLocaleString()}`
              : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface salary={salary} expenses={expenses} />
          </div>

          <div>
            <RealTimeStock />

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-medium mb-3">Suggested Questions</h2>
              <ul className="space-y-2">
                <li className="text-sm p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                  How should I allocate my savings?
                </li>
                <li className="text-sm p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                  What are the best tax-saving investments?
                </li>
                <li className="text-sm p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                  How much should I invest in mutual funds?
                </li>
                <li className="text-sm p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                  What's a good emergency fund size?
                </li>
                <li className="text-sm p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                  Should I invest in stocks or mutual funds?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
