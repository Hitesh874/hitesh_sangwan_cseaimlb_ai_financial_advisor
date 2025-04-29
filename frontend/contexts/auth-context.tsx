"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("financeUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // This is a dummy login that accepts any credentials
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a user with the email and a default name
    const newUser = {
      name: email.split("@")[0],
      email,
    }

    // Store in localStorage
    localStorage.setItem("financeUser", JSON.stringify(newUser))
    setUser(newUser)
    setIsLoading(false)
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a user with the provided details
    const newUser = {
      name,
      email,
    }

    // Store in localStorage
    localStorage.setItem("financeUser", JSON.stringify(newUser))
    setUser(newUser)
    setIsLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("financeUser")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
