import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import Loading from "@/components/loading";

interface IsAuthenticatedProps {
  children: React.ReactNode;
}

const IsAuthenticated: React.FC<IsAuthenticatedProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.authentication);
  const location = useLocation();

  if (isAuth.isLoading) {
    return <Loading.Spinner />;
  }

  if (!isAuth.isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default IsAuthenticated;
