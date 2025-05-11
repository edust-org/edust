"use client"

import { Typography } from "@/components/ui"
import { authService } from "@/services"
import { useAuthStore } from "@/store"

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
