import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, PieChart, TrendingUp, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Financial Planning Made Simple</h1>
            <p className="text-xl mb-8">
              Get personalized financial advice powered by AI to help you save, invest, and grow your wealth.
            </p>
            <Link href="/advisor">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our AI Finance Advisor Helps You</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<PieChart className="h-10 w-10 text-emerald-600" />}
              title="Budgeting & Savings"
              description="Get personalized budgeting advice based on your income and expenses."
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-emerald-600" />}
              title="Investment Guidance"
              description="Discover the best investment options based on your risk tolerance and goals."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-emerald-600" />}
              title="Market Insights"
              description="Track stock market data and get real-time insights on potential investments."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-emerald-600" />}
              title="Secure Planning"
              description="Plan for your future with retirement and long-term wealth building strategies."
            />
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Chat with Our AI Financial Advisor</h3>
                <p className="text-gray-600 mb-4">
                  Have questions about your finances? Our AI advisor is available 24/7 to provide personalized guidance
                  and answer your financial questions in real-time.
                </p>
                <Link href="/advisor/chat">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Start Chatting Now</Button>
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="bg-white rounded-lg p-3 mb-3 text-left">
                    <p className="text-sm font-medium">AI Advisor</p>
                    <p className="text-gray-700">How can I help with your financial planning today?</p>
                  </div>
                  <div className="bg-emerald-600 rounded-lg p-3 mb-3 text-white text-right">
                    <p className="text-sm font-medium">You</p>
                    <p>How much should I save each month?</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-left">
                    <p className="text-sm font-medium">AI Advisor</p>
                    <p className="text-gray-700">
                      Based on your income, I recommend saving 20% of your monthly salary...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI-powered advisor analyzes your financial situation and provides actionable advice tailored to your
            needs.
          </p>
          <Link href="/advisor">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Start Your Financial Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">AI Finance Advisor</h3>
              <p className="text-gray-400">Smart financial planning for everyone</p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} AI Finance Advisor. All rights reserved.</p>
              <p>Disclaimer: This is an AI tool and not a substitute for professional financial advice.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
