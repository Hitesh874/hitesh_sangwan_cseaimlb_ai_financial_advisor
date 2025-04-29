"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { SendIcon, User, Bot, RefreshCw } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  salary?: number
  expenses?: number
}

export default function ChatInterface({ salary, expenses }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI financial advisor. How can I help you with your finances today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          salary,
          expenses,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.advice }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg flex items-center">
          <Bot className="h-5 w-5 mr-2 text-emerald-600" />
          AI Financial Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="flex-shrink-0 mr-2">
                <Avatar className={message.role === "assistant" ? "bg-emerald-600" : "bg-gray-500"}>
                  {message.role === "assistant" ? (
                    <Bot className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </Avatar>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.content.split("\n").map((line, i) => {
                  if (line.startsWith("-")) {
                    return (
                      <p key={i} className="flex items-start mb-1">
                        <span className="mr-2">•</span>
                        <span>{line.substring(2)}</span>
                      </p>
                    )
                  } else if (line.startsWith("##")) {
                    return (
                      <p key={i} className="font-semibold mt-2 mb-1">
                        {line.replace("##", "")}
                      </p>
                    )
                  } else {
                    return <p key={i}>{line}</p>
                  }
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex">
              <div className="flex-shrink-0 mr-2">
                <Avatar className="bg-emerald-600">
                  <RefreshCw className="h-5 w-5 text-white animate-spin" />
                </Avatar>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">Thinking...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
