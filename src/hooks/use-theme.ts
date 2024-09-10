// src/hooks/useTheme.ts
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

import { useCallback } from "react";
import { setTheme } from "@/app/features";

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const changeTheme = useCallback(
    (newTheme: "dark" | "light" | "system") => {
      dispatch(setTheme(newTheme));
    },
    [dispatch],
  );

  return { theme, setTheme: changeTheme };
};
