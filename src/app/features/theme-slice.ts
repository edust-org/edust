// src/features/theme/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";

export interface ThemeState {
  theme: Theme;
}

const storageKey = "vite-ui-theme";
const initialTheme: Theme =
  (localStorage.getItem(storageKey) as Theme) || "system";

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

// Helper function to update the document's theme class
function updateThemeOnDocument(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}
