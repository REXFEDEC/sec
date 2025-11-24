"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, FileText } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface Note {
  id: string
  title: string
  file_path: string
  created_at: string
  updated_at: string
}

interface NotesListProps {
  notes: Note[]
}

export function NotesList({ notes }: NotesListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (note: Note) => {
    setDeletingId(note.id)
    const supabase = createClient()

    try {
      // Delete file from storage
      const { error: storageError } = await supabase.storage.from("notes").remove([note.file_path])

      if (storageError) throw storageError

      // Delete note record from database
      const { error: dbError } = await supabase.from("notes").delete().eq("id", note.id)

      if (dbError) throw dbError

      toast({
        title: "Success",
        description: "Note deleted successfully",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete note",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (notes.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">No notes yet</h3>
        <p className="mb-4 text-sm text-muted-foreground">Get started by creating your first note</p>
        <Button asChild>
          <Link href="/notes/new">Create Note</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id} className="group transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="line-clamp-1 text-balance">{note.title}</CardTitle>
            <p className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                <Link href={`/notes/${note.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={deletingId === note.id}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete note?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your note.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(note)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
