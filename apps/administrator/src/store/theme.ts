import { updateThemeOnDocument } from "@/utils"
import { Theme } from "@edust/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: Theme) => {
        updateThemeOnDocument(theme)
        set({ theme })
      },
    }),
    {
      name: "theme-storage",
    },
  ),
)
