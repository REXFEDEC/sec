import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { PasswordAuthProvider } from "@/hooks/use-password-auth"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Space Notes App - Your Private Note-Taking Solution",
  description: "Create, edit, and manage your notes with enterprise-grade security. Built with Next.js and Supabase.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg", 
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <PasswordAuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="space-notes-theme" attribute="class">
            {children}
            <Toaster />
          </ThemeProvider>
        </PasswordAuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
