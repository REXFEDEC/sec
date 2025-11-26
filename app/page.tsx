import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Zap, FileText, Edit3, Cloud, Rocket } from "lucide-react"
import { LandingNav } from "@/components/landing-nav"

export default function Home() {
  return (
      <div className="min-h-screen bg-background">
        <LandingNav />
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
                Your Notes, <span className="text-primary">Space</span>-Ready and <span className="text-primary">Secure</span>
              </h1>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Create, edit, and manage your notes with enterprise-grade security. Built with modern technology for a
                seamless experience across all devices.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden blur-3xl">
            <div className="relative h-full w-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need in a notes app</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed for productivity and security
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Enterprise Security</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your notes are encrypted and protected with industry-leading security standards.
              </p>
            </Card>

            <Card className="p-6 transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Edit3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Markdown Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Write in Markdown with live preview for beautifully formatted notes.
              </p>
            </Card>

            <Card className="p-6 transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Cloud Sync</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access your notes anywhere with automatic cloud synchronization.
              </p>
            </Card>

            <Card className="p-6 transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Private by Default</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your data belongs to you. We never share or sell your information.
              </p>
            </Card>

            <Card className="p-6 transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Lightning Fast</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Optimized performance for instant loading and smooth editing.
              </p>
            </Card>

            <Card className="p-6 transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Organized</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep all your notes organized with a clean, intuitive interface.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of users who trust Space Notes with their important information.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/register">Create your account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2025 Space Notes App. Built with Next.js and Supabase.
          </p>
        </div>
      </footer>
      </div>
  )
}
