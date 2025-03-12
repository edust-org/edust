"use client"

import { setTheme } from "@/lib/store/features"
import { AppDispatch, RootState } from "@/lib/store/store"
import { Theme } from "@/types"
import { updateThemeOnDocument } from "@/utils"
import { useDispatch, useSelector } from "react-redux"

import { useCallback, useEffect } from "react"

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useSelector((state: RootState) => state.theme.theme)

  useEffect(() => {
    updateThemeOnDocument(theme)
  }, [theme])

  const changeTheme = useCallback(
    (newTheme: Theme) => {
      dispatch(setTheme(newTheme))
    },
    [dispatch],
  )

  return { theme, setTheme: changeTheme }
}
