import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router"

import { Home, NotFound } from "@/pages"

import guestRoutes from "./guest-routes"
import authenticatedRoutes from "./authenticated-routes"
import organizationRoutes from "./organization-routes"
import playgroundRoutes from "./playground-routes"

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" index element={<Home />} />
      {guestRoutes}
      {authenticatedRoutes}
      {organizationRoutes}
      {playgroundRoutes}
      <Route path="*" index element={<NotFound />} />
    </Route>,
  ),
)

export default router
