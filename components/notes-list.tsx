"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, FileText, MoreHorizontal } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

interface Note {
  id: string
  title: string
  file_path: string
  created_at: string
  updated_at: string
  content?: string
}

interface NotesListProps {
  notes: Note[]
}

export function NotesList({ notes }: NotesListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [notesWithContent, setNotesWithContent] = useState<Note[]>([])
  const [loadingContent, setLoadingContent] = useState(true)

  // Fetch content for all notes
  useEffect(() => {
    const fetchNotesContent = async () => {
      const supabase = createClient()
      const notesWithContentData = await Promise.all(
        notes.map(async (note) => {
          try {
            const { data, error } = await supabase.storage
              .from("notes")
              .download(note.file_path)
            
            if (error) throw error
            
            const content = await data.text()
            return { ...note, content }
          } catch (error) {
            console.error(`Failed to fetch content for note ${note.id}:`, error)
            return { ...note, content: "Content unavailable" }
          }
        })
      )
      
      setNotesWithContent(notesWithContentData)
      setLoadingContent(false)
    }

    if (notes.length > 0) {
      fetchNotesContent()
    } else {
      setLoadingContent(false)
    }
  }, [notes])

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

  if (loadingContent && notes.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
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
    <div className="space-y-6">
      {notesWithContent.map((note) => (
        <Card key={note.id} className="group transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl line-clamp-1 text-balance mb-2">{note.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Updated {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={`/notes/${note.id}`} className="flex items-center">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {note.content ? (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: note.content.length > 300 
                        ? note.content.substring(0, 300) + '...' 
                        : note.content 
                    }} 
                  />
                ) : (
                  <span className="italic">No content available</span>
                )}
              </div>
            </div>
            {note.content && note.content.length > 300 && (
              <Button 
                asChild 
                variant="ghost" 
                size="sm" 
                className="mt-3 h-8 px-0 text-xs text-primary hover:text-primary hover:bg-primary/5"
              >
                <Link href={`/notes/${note.id}`}>
                  Read more →
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
