"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardNavProps {
  user: {
    email?: string
    id: string
  }
}

export function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "You've been signed out successfully",
    })

    router.push("/")
    router.refresh()
  }

  const getInitials = (email?: string) => {
    if (!email) return "U"
    return email.charAt(0).toUpperCase()
  }

  return (
    <nav className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Secure Notes</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">My Account</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
