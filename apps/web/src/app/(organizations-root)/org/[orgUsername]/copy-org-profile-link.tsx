"use client"

import { Button } from "@/components/ui"
import { Share2 } from "lucide-react"
import { toast } from "sonner"
import { useCopyToClipboard } from "usehooks-ts"

export default function CopyOrgProfileLink({ username }: { username: string }) {
  const [, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Copied!")
      })
      .catch(() => {
        toast.error("Failed to copy!")
      })
  }

  return (
    <Button
      variant={"link"}
      onClick={handleCopy(`${window.origin}/org/${username}`)}
    >
      <Share2 />
    </Button>
  )
}
