import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { RootRoutes } from "./root-routes";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<RootRoutes />} />),
);

export default router;
