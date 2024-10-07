/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import router from "@/routes";
import { ErrorBoundary, GlobalLoading } from "@/components";
import { TooltipProvider } from "@/components/ui";
import { localStore } from "./utils";
import { useGetUserQuery } from "./app/api/v0/user";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setAuthentication, setProfileMode } from "./app/features";

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.authentication.isAuthenticated,
  );
  const profileSwitch = useAppSelector((state) => state.auth.profileSwitch);
  const dispatch = useAppDispatch();
  const token = localStore.accessToken.get();

  const { data, refetch } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data) {
      // forcing it to refetch and getting the latest userdata instead of cached data
      refetch();

      dispatch(
        setAuthentication({
          isAuthenticated: true,
          user: data?.data.user,
          organization: data?.data.organization,
        }),
      );

      dispatch(
        setProfileMode({
          authenticated: data?.data?.user ? "user" : undefined,
          organizationRole: data?.data?.organization?.role,
          activeMode: profileSwitch?.activeMode
            ? profileSwitch?.activeMode
            : "user",
        }),
      );
    }
  }, [data, dispatch, isAuthenticated, profileSwitch?.activeMode, refetch]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<GlobalLoading />}>
        <Toaster />
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default React.memo(App);
