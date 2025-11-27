import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Zap, FileText, Edit3, Cloud, Rocket, Github, ExternalLink, Globe } from "lucide-react"
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

      {/* Creator Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Created by Sameer</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Full-stack developer passionate about building beautiful, functional web applications. 
                Explore my work and connect with me through the platforms below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* GitHub Card */}
              <a
                href="https://github.com/rexfedec"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-slate-900/10 dark:from-slate-100/5 dark:to-slate-100/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Github className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">GitHub</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Check out my open-source projects, contributions, and development work. 
                    Follow me for updates on new projects and collaborations.
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span>github.com/rexfedec</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </a>

              {/* Portfolio Card */}
              <a
                href="https://sameer.goneto.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-slate-900/10 dark:from-slate-100/5 dark:to-slate-100/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">Portfolio</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Explore my portfolio website to see my latest projects, 
                    design work, and professional experience. Get in touch for collaborations!
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span>sameer.goneto.space</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </a>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                Let's build something amazing together! Feel free to reach out for collaborations or just to say hi.
              </p>
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
