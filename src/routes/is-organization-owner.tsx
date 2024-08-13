import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import Loading from "@/components/loading";
import { Role } from "@/types";

interface IsAuthenticatedProps {
  children: React.ReactNode;
}

const IsOrganizationOwner: React.FC<IsAuthenticatedProps> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.authentication);
  const location = useLocation();

  if (isAuth.isLoading) {
    return <Loading.Spinner />;
  }

  if (!isAuth.isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (isAuth?.organization?.role === Role.OWNER) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};

export default IsOrganizationOwner;
