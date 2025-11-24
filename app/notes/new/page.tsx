import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { NoteEditor } from "@/components/note-editor"

export default async function NewNotePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create New Note</h1>
          <p className="mt-2 text-muted-foreground">Write your note with markdown support</p>
        </div>
        <NoteEditor />
      </main>
    </div>
  )
}
