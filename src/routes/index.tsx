import { Authentication, CreateAnOrganization, Site } from "@/features";
import { ErrorPage, Home } from "@/pages";

import { createBrowserRouter, RouteObject } from "react-router-dom";

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
    path: "/create-an-organization",
    element: <CreateAnOrganization />,
  },
  {
    path: "/:orgId/site",
    element: <Site />,
  },
];

// Explicitly type the router using ReturnType
const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export default router;
