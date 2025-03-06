import { useAppSelector } from "@/lib/store/hooks"
import { updateThemeOnDocument } from "@/utils"

import { JSX, ReactNode, useEffect } from "react"

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const theme = useAppSelector((state) => state.theme.theme)

  useEffect(() => {
    updateThemeOnDocument(theme)
  }, [theme])

  return <>{children}</>
}
