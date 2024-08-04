import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setAuthentication } from "./app/features/authentication";
import { useGetProfileQuery } from "./app/api/v0/profile";

type AppProps = {
  children: ReactNode;
};
const App: React.FC<AppProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProfileQuery();

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
