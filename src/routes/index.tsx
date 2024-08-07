import { ErrorPage, Home, Playground } from "@/pages";

import { organizationRoutes } from "./organization-routes";

import Authentication from "@/features/authentication";
import { Sites } from "@/features";
import IsAuthenticated from "./is-authenticated";
// Define the type for the route configuration

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/playground",
    element: (
      <IsAuthenticated>
        <Playground />
      </IsAuthenticated>
    ),
  },
  // start Auth routes
  {
    path: "/auth/sign-up",
    element: <Authentication.SignUp />,
  },
  {
    path: "/auth/verify/:token",
    element: <Authentication.VerifyEmailByToken />,
  },
  {
    path: "/auth/sign-in",
    element: <Authentication.SignIn />,
  },
  // end Auth routes
  {
    path: "/:orgId/sites",
    element: <Sites />,
  },
  ...organizationRoutes,
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
