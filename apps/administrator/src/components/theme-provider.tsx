"use client"

import { useThemeStore } from "@/store"
import { updateThemeOnDocument } from "@/utils"

import { JSX, ReactNode, useEffect } from "react"

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    updateThemeOnDocument(theme)
  }, [theme])

  return <>{children}</>
}
