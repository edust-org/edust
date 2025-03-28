import { Feedback as FeedbackFrom } from "@/components"
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui"

import React from "react"

export const Feedback = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Shear your feedback</DialogTitle>
        <FeedbackFrom />
      </DialogContent>
    </Dialog>
  )
}
