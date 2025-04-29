"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ProtectedRoute from "@/components/protected-route"

const formSchema = z.object({
  salary: z.coerce.number().min(1000, {
    message: "Salary must be at least ₹1,000",
  }),
  expenses: z.coerce
    .number()
    .min(0, {
      message: "Expenses cannot be negative",
    })
    .refine((val) => val >= 0, {
      message: "Expenses must be a positive number",
    }),
  riskTolerance: z.number().min(1).max(10),
})

export default function AdvisorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: 50000,
      expenses: 30000,
      riskTolerance: 5,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      // In a real app, we would send this data to our API
      // For now, we'll just redirect to the results page with the data
      const params = new URLSearchParams({
        salary: values.salary.toString(),
        expenses: values.expenses.toString(),
        riskTolerance: values.riskTolerance.toString(),
      })

      router.push(`/advisor/results?${params.toString()}`)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Your Personal Finance Advisor</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Fill in your financial details below to receive personalized advice on savings, investments, and financial
          planning.
        </p>

        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
            <CardDescription>
              We need some basic information to provide you with personalized financial advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Monthly Income (₹)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">Enter your total monthly income after tax</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Your monthly salary or income from all sources.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Monthly Expenses (₹)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">
                                Include all regular monthly expenses like rent, utilities, groceries, etc.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Your total monthly expenses.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="riskTolerance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Risk Tolerance
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">1 = Very conservative, 10 = Highly aggressive</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Conservative</span>
                            <span>Moderate</span>
                            <span>Aggressive</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>How comfortable are you with investment risk?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                    {loading ? "Processing..." : "Get Financial Advice"}
                    {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      const formValues = form.getValues()
                      const params = new URLSearchParams({
                        salary: formValues.salary.toString(),
                        expenses: formValues.expenses.toString(),
                      })
                      router.push(`/advisor/chat?${params.toString()}`)
                    }}
                  >
                    Chat with AI Advisor
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 flex justify-center">
            All information is processed securely and not stored permanently.
          </CardFooter>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
