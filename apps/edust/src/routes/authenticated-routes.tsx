import { Route } from "react-router-dom"
import Dashboard from "@/features/dashboard"
import { CreateOrganization } from "@/organizations/features"
import { Protector } from "./protector"
import { Roles } from "@/types"
import { Home } from "@/pages/home"

export const authenticatedRoutes = (
  <Route>
    <Route
      path="/"
      element={
        <Protector roles={[Roles.USER]}>
          <Home.PrivateHome />
        </Protector>
      }
    />

    <Route
      path="/dashboard"
      element={
        <Protector roles={[Roles.USER]}>
          <Dashboard.DashboardLayout />
        </Protector>
      }
    >
      <Route path="" element={<Dashboard.DashboardMain />}></Route>
      <Route path="institutes" element={<Dashboard.InstitutesLists />}></Route>
      <Route
        path="institutes/create"
        element={<Dashboard.InstitutesCreate />}
      />
      <Route path="institutes/lists" element={<Dashboard.InstitutesLists />} />
    </Route>

    <Route
      path="/organizations/create"
      element={
        <Protector roles={[Roles.USER]}>
          <CreateOrganization />
        </Protector>
      }
    />
  </Route>
)
