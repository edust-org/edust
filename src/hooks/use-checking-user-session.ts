import { useUserGetQuery } from "@/app/api/v0/user";
import { setAuthentication } from "@/app/features/auth";
import { getToken } from "@/utils";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export const useCheckingUserSession = () => {
  const dispatch = useDispatch();
  const token = getToken("access_token");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!!token);
  }, [token]);

  const { data, error, isLoading } = useUserGetQuery(undefined, {
    skip: !enabled,
  });

  const checkAuthStatus = useCallback(() => {
    if (isLoading) return;
    const user = data?.data?.user || null;
    const organization = data?.data?.organization || null;

    if (user) {
      dispatch(
        setAuthentication({
          isAuthenticated: true,
          user: user,
          organization,
          isLoading: false,
        })
      );
    } else if (error) {
      dispatch(setAuthentication({ isAuthenticated: false, user: null }));
    } else {
      dispatch(setAuthentication({ isLoading: false, isAuthenticated: false }));
    }
  }, [data, error, isLoading, dispatch]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
};
