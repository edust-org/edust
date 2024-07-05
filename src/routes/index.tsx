import { ErrorPage, Home } from "@/pages";

import { createBrowserRouter, RouteObject } from "react-router-dom";

// Define the type for the route configuration
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
];

// Explicitly type the router using ReturnType
const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export default router;
