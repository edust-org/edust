import { Route } from "react-router"
import { ProtectedRoute } from "./protected-route"
import Dashboard from "@/features/dashboard"

export default (
  <>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard.DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="" element={<Dashboard.DashboardMain />}></Route>
      <Route path="institutes" element={<Dashboard.InstitutesLists />}></Route>
      <Route path="institutes/lists" element={<Dashboard.InstitutesLists />} />
      <Route
        path="institutes/create"
        element={<Dashboard.InstitutesCreate />}
      />
      <Route
        path="institutes/edit/:instituteId"
        element={<Dashboard.InstitutesEdit />}
      />
    </Route>
  </>
)
