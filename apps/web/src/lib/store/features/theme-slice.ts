import { Theme } from "@/types"
import { updateThemeOnDocument } from "@/utils"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ThemeState {
  theme: Theme
}

const initialTheme: Theme = "light"

const initialState: ThemeState = {
  theme: initialTheme,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      updateThemeOnDocument(state.theme)
    },
  },
})

export const { setTheme } = themeSlice.actions
export const themeReducers = themeSlice.reducer
