import { useUserGetQuery } from "@/app/api/v0/user";
import { setAuthentication } from "@/app/features/auth";
import { getToken } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useCheckingAuth = () => {
  const dispatch = useDispatch();
  const token = getToken("access_token");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!!token);
  }, [token]);

  const { data, error, isLoading } = useUserGetQuery(undefined, {
    skip: !enabled,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data?.data?.user) {
      dispatch(
        setAuthentication({
          isAuthenticated: true,
          user: data.data.user,
          organization: data.data.organization || null,
        })
      );
    } else if (error) {
      dispatch(setAuthentication({ isAuthenticated: false, user: null }));
    } else {
      dispatch(setAuthentication({ isLoading: false, isAuthenticated: false }));
    }
  }, [data, error, isLoading, dispatch]);
};
