import { useAppSelector } from "@/app/hooks"
import { updateThemeOnDocument } from "@/utils"
import { ReactNode, useEffect } from "react"

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
