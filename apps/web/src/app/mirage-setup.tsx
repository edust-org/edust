"use client"

import { defaultValues } from "@/configs"
import { makeServer } from "@/mocks"

import { useEffect } from "react"

export function MirageSetup() {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      defaultValues.isMocksApiEnable
    ) {
      makeServer()
    }
  }, [])

  return null // No UI needed
}
