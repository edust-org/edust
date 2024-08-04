import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

interface IsAuthenticatedProps {
  children: React.ReactNode;
}

const IsAuthenticated: React.FC<IsAuthenticatedProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default IsAuthenticated;
