"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface PasswordAuthContextType {
  isAuthenticated: boolean
  authenticate: (password: string) => boolean
  logout: () => void
}

const PasswordAuthContext = createContext<PasswordAuthContextType | undefined>(undefined)

const CORRECT_PASSWORD = "pk2space"

export function PasswordAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated on mount
    const auth = localStorage.getItem("space-notes-auth")
    if (auth === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
    }
  }, [])

  const authenticate = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("space-notes-auth", CORRECT_PASSWORD)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("space-notes-auth")
  }

  return (
    <PasswordAuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </PasswordAuthContext.Provider>
  )
}

export function usePasswordAuth() {
  const context = useContext(PasswordAuthContext)
  if (context === undefined) {
    throw new Error("usePasswordAuth must be used within a PasswordAuthProvider")
  }
  return context
}
