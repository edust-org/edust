import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./app/features/auth";
import Loading from "./components/loading";
import { RouterProvider } from "react-router-dom";
import { useUserGetQuery } from "@/app/api/v0/user";
import { Toaster } from "@/components/ui/toaster";
import router from "@/routes";
import { ErrorBoundary } from "@/components";

const useAccessToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  return token ? token.split("=")[1] : null;
};

const App: React.FC = () => {
  // const routeElements = useRoutes(routes);
  const dispatch = useDispatch();
  const token = useAccessToken();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!!token);
  }, [token]);

  const { data, error, isLoading } = useUserGetQuery(undefined, {
    skip: !enabled,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data?.data.user.email) {
      if (data?.data?.organization) {
        dispatch(
          setAuthentication({
            isAuthenticated: true,
            user: data?.data.user,
            organization: data?.data?.organization,
          })
        );
      } else {
        dispatch(
          setAuthentication({ isAuthenticated: true, user: data?.data.user })
        );
      }
    }

    if (!token) {
      dispatch(setAuthentication({ isLoading: false }));
    }
  }, [data, error, isLoading, dispatch, token]);

  return (
    <Suspense fallback={<Loading.Spinner />}>
      <ErrorBoundary>
        <Toaster />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
