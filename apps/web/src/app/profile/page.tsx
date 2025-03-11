"use client"

import { useSearchParams } from "next/navigation"

export default function Profile() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Profile ID: {id}</p>
    </div>
  )
}
