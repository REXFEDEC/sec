"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileText } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { MobileMenuButton } from "@/components/mobile-menu-button"

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold tracking-tight">Secure Notes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="h-9">
              <Link href="#features">Features</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="h-9">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="h-9">
              <Link href="/register">Get Started</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileMenuButton 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "absolute left-0 right-0 top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b md:hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
          <div className="px-4 py-6 space-y-4">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start h-11">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start h-11">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full h-11">
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
