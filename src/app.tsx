import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./app/features/auth";
import { useAppSelector } from "./app/hooks";
import Loading from "./components/loading";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { useUserGetQuery } from "./app/api/v0/user";
import { Toaster } from "./components/ui/toaster";

const useAccessToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  return token ? token.split("=")[1] : null;
};

const App: React.FC = () => {
  const routeElements = useRoutes(routes);
  const dispatch = useDispatch();
  const token = useAccessToken();
  const [enabled, setEnabled] = useState(false);
  const auth = useAppSelector((state) => state.auth.authentication);

  useEffect(() => {
    setEnabled(!!token);
  }, [token]);

  const { data, error, isLoading } = useUserGetQuery(undefined, {
    skip: !enabled,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data?.data.user.email) {
      dispatch(
        setAuthentication({ isAuthenticated: true, user: data?.data.user })
      );
    }

    if (!token) {
      dispatch(setAuthentication({ isLoading: false }));
    }
  }, [data, error, isLoading, dispatch, token]);

  return (
    <>
      {isLoading && auth.isLoading ? (
        <Loading.Spinner />
      ) : (
        <Suspense fallback={<Loading.Spinner />}>
          {/* Render hole component in routerElements */}
          {routeElements}

          {/* shadncn-ui: Toaster start  */}
          <Toaster />
        </Suspense>
      )}
    </>
  );
};

export default App;
