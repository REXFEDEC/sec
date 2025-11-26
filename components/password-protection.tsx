"use client"

import { usePasswordAuth } from "@/hooks/use-password-auth"
import { PasswordInput } from "@/components/password-input"

interface PasswordProtectionProps {
  children: React.ReactNode
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const { isAuthenticated } = usePasswordAuth()

  if (!isAuthenticated) {
    return <PasswordInput />
  }

  return <>{children}</>
}
