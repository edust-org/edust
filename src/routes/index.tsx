import { Authentication } from "@/features";
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
    element: <Authentication compMode="signUp" />,
  },
  {
    path: "/auth/sign-in",
    element: <Authentication compMode="signIn" />,
  },
];

// Explicitly type the router using ReturnType
const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export default router;
