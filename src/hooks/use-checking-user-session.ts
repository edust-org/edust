import { useGetUserQuery } from "@/app/api/v0/user";
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

  // TODO: main problem is here
  //! When I refresh browser it's shows problems and redirect signin page still user authenticated
  // const { data, isLoading } = useGetUserQuery(undefined, {
  //   skip: !enabled,
  // });
  // ? It will show error
  const { data, isLoading } = useGetUserQuery();

  const checkAuthStatus = useCallback(() => {
    if (isLoading) return;
    const user = data?.data?.user || null;
    const organization = data?.data?.organization || null;

    dispatch(
      setAuthentication({
        isAuthenticated: !!user,
        user: user,
        organization,
        isLoading: false,
      })
    );
  }, [data, isLoading, dispatch]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
};
