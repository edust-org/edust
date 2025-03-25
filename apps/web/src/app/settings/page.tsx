"use client"

import { useRouter } from "next/navigation"

export default function Settings() {
  const router = useRouter()

  router.push("/settings/profile")
  return null
}
