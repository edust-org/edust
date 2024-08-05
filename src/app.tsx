import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./app/features/authentication";
import { useGetProfileQuery } from "./app/api/v0/profile";
import { useAppSelector } from "./app/hooks";
import Loading from "./components/loading";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

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
  const auth = useAppSelector((state) => state.authentication);

  useEffect(() => {
    setEnabled(!!token);
  }, [token]);

  const { data, error, isLoading } = useGetProfileQuery(undefined, {
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
        <Suspense fallback={<Loading.Spinner />}>{routeElements}</Suspense>
      )}
    </>
  );
};

export default App;
