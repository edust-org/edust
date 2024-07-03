import Home from "@/pages/home";
import { createBrowserRouter, RouteObject } from "react-router-dom";

// Define the type for the route configuration
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

// Explicitly type the router using ReturnType
const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export default router;
