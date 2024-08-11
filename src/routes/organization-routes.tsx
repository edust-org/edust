import { SitesBuilder } from "@/organizations/features/sites-builder";
import { CreateOrganization, CustomizeSite } from "@/organizations/features";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";

const organizationRoutes = (
  <Route>
    <Route path="sites-builder" element={<SitesBuilder />}>
      <Route
        path=":pageId"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <CustomizeSite />
          </Suspense>
        }
      />
    </Route>
    <Route path="organizations" element={<div>Organizations</div>}>
      <Route
        path="create"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <CreateOrganization />
          </Suspense>
        }
      />
    </Route>
  </Route>
);

export default organizationRoutes;
