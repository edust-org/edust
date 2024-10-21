import { Theme } from "@/types";

export const updateThemeOnDocument = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark", "system");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};
