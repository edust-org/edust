import { Authentication, Sites } from "@/features";
import { ErrorPage, Home } from "@/pages";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import { organizationRoutes } from "./organization-routes";

// Define the type for the route configuration
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/sign-up",
    element: <Authentication component="signUp" />,
  },
  {
    path: "/auth/sign-in",
    element: <Authentication component="signIn" />,
  },
  {
    path: "/:orgId/sites",
    element: <Sites />,
  },
  ...organizationRoutes,
];

// Explicitly type the router using ReturnType
const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export default router;
