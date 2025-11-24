import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { NoteEditor } from "@/components/note-editor"

export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  // Fetch the note
  const { data: note, error: noteError } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (noteError || !note) {
    notFound()
  }

  // Fetch note content from storage
  const { data: fileData, error: storageError } = await supabase.storage.from("notes").download(note.file_path)

  let content = ""
  if (!storageError && fileData) {
    content = await fileData.text()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav user={user} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Note</h1>
          <p className="mt-2 text-muted-foreground">Update your note with markdown support</p>
        </div>
        <NoteEditor noteId={id} initialTitle={note.title} initialContent={content} />
      </main>
    </div>
  )
}
