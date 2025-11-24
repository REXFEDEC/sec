"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye, Edit3 } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface NoteEditorProps {
  noteId?: string
  initialTitle?: string
  initialContent?: string
}

export function NoteEditor({ noteId, initialTitle = "", initialContent = "" }: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      const fileName = `${user.id}/${Date.now()}.txt`
      const file = new Blob([content], { type: "text/plain" })

      if (noteId) {
        // Update existing note
        const { data: existingNote } = await supabase.from("notes").select("file_path").eq("id", noteId).single()

        if (existingNote) {
          // Update file in storage
          const { error: storageError } = await supabase.storage.from("notes").update(existingNote.file_path, file, {
            contentType: "text/plain",
            upsert: true,
          })

          if (storageError) throw storageError

          // Update note metadata
          const { error: dbError } = await supabase
            .from("notes")
            .update({
              title,
              updated_at: new Date().toISOString(),
            })
            .eq("id", noteId)

          if (dbError) throw dbError
        }

        toast({
          title: "Success",
          description: "Note updated successfully",
        })
      } else {
        // Create new note
        const { error: storageError } = await supabase.storage.from("notes").upload(fileName, file, {
          contentType: "text/plain",
        })

        if (storageError) throw storageError

        // Create note metadata
        const { error: dbError } = await supabase.from("notes").insert({
          user_id: user.id,
          title,
          file_path: fileName,
        })

        if (dbError) throw dbError

        toast({
          title: "Success",
          description: "Note created successfully",
        })
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save note",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Note"}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold"
          />
        </div>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="edit">
              <Edit3 className="mr-2 h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit" className="mt-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                placeholder="Write your note here... Supports Markdown formatting."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] font-mono"
              />
            </div>
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                {content ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Nothing to preview yet. Start writing in the Edit tab.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
