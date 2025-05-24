"use client"

import { Typography } from "@edust/ui"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { useEffect } from "react"

export default function Callback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const errorMessage = searchParams.get("error")

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
    router.push("/auth/login")
  }, [errorMessage, router])

  return (
    <>
      <Typography variant="h2" className="text-destructive">
        Some thing went wrang Please change login way!
      </Typography>
    </>
  )
}
