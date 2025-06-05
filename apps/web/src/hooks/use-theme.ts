"use client"

import { useThemeStore } from "@/store"
import { updateThemeOnDocument } from "@/utils"
import { Theme } from "@edust/types"

import { useCallback, useEffect } from "react"

export const useTheme = () => {
  const { setTheme, theme } = useThemeStore((state) => state)

  useEffect(() => {
    updateThemeOnDocument(theme)
  }, [theme])

  const changeTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme)
    },
    [setTheme],
  )

  return { theme, setTheme: changeTheme }
}
