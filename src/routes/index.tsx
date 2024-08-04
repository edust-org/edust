import { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import { ErrorPage, Home, Playground } from "@/pages";

import { organizationRoutes } from "./organization-routes";

import Authentication from "@/features/authentication";
import { Sites } from "@/features/sites";
// Define the type for the route configuration

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={"LOADING"}>
        <Home />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={"LOADING"}>
        <ErrorPage />
      </Suspense>
    ),
  },
  {
    path: "/playground",
    element: (
      <Suspense fallback={"LOADING"}>
        <Playground />
      </Suspense>
    ),
  },
  {
    path: "/auth/sign-up",
    element: (
      <Suspense fallback={"LOADING"}>
        <Authentication.SignUp />
      </Suspense>
    ),
  },
  {
    path: "/auth/verify/:token",
    element: <Authentication.VerifyEmailByToken />,
  },
  {
    path: "/auth/sign-in",
    element: (
      <Suspense fallback={"LOADING"}>
        <Authentication.SignIn />
      </Suspense>
    ),
  },
  {
    path: "/:orgId/sites",
    element: (
      <Suspense fallback={"LOADING"}>
        <Sites />
      </Suspense>
    ),
  },
  ...organizationRoutes,
];

// Explicitly type the router using ReturnType
const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export default router;
