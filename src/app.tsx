import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./app/features/authentication";
import { useGetProfileQuery } from "./app/api/v0/profile";
import { useAppSelector } from "./app/hooks";

type AppProps = {
  children: ReactNode;
};
const App: React.FC<AppProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProfileQuery();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
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

  return <>{isLoading ? <p>Loading</p> : children}</>;
};

export default App;
