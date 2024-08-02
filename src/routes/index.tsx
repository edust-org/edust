import { Sites } from "@/features";
import { ErrorPage, Home, Playground } from "@/pages";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import { organizationRoutes } from "./organization-routes";
import { SignIn, SignUp, VerifyEmailByToken } from "@/features/authentication";

// Define the type for the route configuration
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/playground",
    element: <Playground />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/auth/verify/:token",
    element: <VerifyEmailByToken />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
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
