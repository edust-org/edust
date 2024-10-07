import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootRoutes } from "./root-routes";
import { NotFound } from "@/pages";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<RootRoutes />}>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default router;
