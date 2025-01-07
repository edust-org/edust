import { Site } from "@/features"
import { Route } from "react-router"

export const commonRoutes = (
  <Route>
    <Route path="/u/:orgIdOrUsername/site" element={<Site />} />
  </Route>
)
