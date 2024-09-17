import { Theme } from "@/types";
import { updateThemeOnDocument } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: Theme;
}

const storageKey = "vite-ui-theme";
const initialTheme: Theme =
  (localStorage.getItem(storageKey) as Theme) || "light";

const initialState: ThemeState = {
  theme: initialTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem(storageKey, action.payload);
      updateThemeOnDocument(action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeReducers = themeSlice.reducer;
