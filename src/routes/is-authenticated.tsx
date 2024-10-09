import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import Loading from "@/components/loading";
import { Role } from "@/types";

/**
 * Props for the IsAuthenticated component.
 */
interface IsAuthenticatedProps {
  /** Child components to render if authentication and role requirements are met. */
  children: React.ReactNode;

  /** Optional role required for role-based access control. */
  role?: Role;
}

/**
 * Component to protect routes based on authentication and optional role-based access.
 *
 * @param {IsAuthenticatedProps} props - The component props.
 * @param {React.ReactNode} props.children - The children components to render if authenticated.
 * @param {Role} [props.role] - Optional role for role-based access control.
 * @returns {JSX.Element} - The rendered component or a redirect based on authentication and role.
 */

const IsAuthenticated: React.FC<IsAuthenticatedProps> = ({
  children,
  role,
}) => {
  const auth = useAppSelector((state) => state.auth.authentication);

  const location = useLocation();

  if (auth.isLoading) {
    return <Loading.Spinner />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  // if (role && organization?.role !== role) {
  //   return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  // }

  return <>{children}</>;
};

export default IsAuthenticated;
