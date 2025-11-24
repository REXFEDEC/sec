import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Not Found</h2>
      <p className="mb-4 text-muted-foreground">Could not find the requested resource</p>
      <Button asChild>
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  )
}
