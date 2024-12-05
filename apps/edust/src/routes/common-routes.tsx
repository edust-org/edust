import { Site } from "@/features"
import { Route } from "react-router-dom"

export const commonRoutes = (
  <Route>
    <Route path="/u/:orgIdOrUsername/site" element={<Site />} />
  </Route>
)
