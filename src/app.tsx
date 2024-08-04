import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./app/features/authentication";
import { useGetProfileQuery } from "./app/api/v0/profile";

type AppProps = {
  children: ReactNode;
};
const useAccessToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  return token ? token.split("=")[1] : null;
};

const App: React.FC<AppProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useAccessToken();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!!token);
  }, [token]);

  const { data, error, isLoading } = useGetProfileQuery(undefined, {
    skip: !enabled,
  });

  React.useEffect(() => {
    if (isLoading) return;
    if (error) {
      dispatch(setAuthentication({ isAuthenticated: false }));
    } else if (data) {
      dispatch(setAuthentication({ isAuthenticated: true }));
    } else {
      dispatch(setAuthentication({ isAuthenticated: false }));
    }
  }, [data, error, isLoading, dispatch]);

  return (
    <>
      {isLoading ? (
        <p className="text-7xl font-bold text-blue-600">Loading</p>
      ) : (
        children
      )}
    </>
  );
};

export default App;
