"use client"

import { Button } from "@edust/ui"
import { ArrowLeft } from "lucide-react"

export const BackButton = () => {
  return (
    <Button
      variant="ghost"
      className="mb-8"
      onClick={() => window.history.back()}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Help Center
    </Button>
  )
}
