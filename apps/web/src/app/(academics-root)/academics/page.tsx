"use client"

import { authService } from "@/services"
import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"

export default function Organizations() {
  const state = useAuthStore((state) => state)
  const academy = authService.findActiveAcademy(
    state.academics,
    state.activeAcademyId,
  )
  return (
    <>
      <title>Academies</title>

      <div>
        <Typography variant="h1">{academy?.name}</Typography>
      </div>
    </>
  )
}
