import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router"

import { RootRoutes } from "./root-routes"

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<RootRoutes />} />),
)

export default router
