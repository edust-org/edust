import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

import { useCallback, useEffect } from "react";
import { setTheme } from "@/app/features";
import { updateThemeOnDocument } from "@/utils";
import { Theme } from "@/types";

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    updateThemeOnDocument(theme);
  }, [theme]);

  const changeTheme = useCallback(
    (newTheme: Theme) => {
      dispatch(setTheme(newTheme));
    },
    [dispatch],
  );

  return { theme, setTheme: changeTheme };
};
