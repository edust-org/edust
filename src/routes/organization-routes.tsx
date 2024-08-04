import { Suspense } from "react";
import { SitesBuilder } from "@/organizations/features/sites-builder";
import { CreateOrganization, CustomizeSite } from "@/organizations/features";

export const organizationRoutes = [
  {
    path: "/sites-builder",
    element: (
      <Suspense fallback={"LOADING"}>
        <SitesBuilder />
      </Suspense>
    ),
  },
  {
    path: "/sites-builder/:pageId",
    element: (
      <Suspense fallback={"LOADING"}>
        <CustomizeSite />
      </Suspense>
    ),
  },
  {
    path: "/organizations",
    element: <div>Organizations</div>,
  },
  {
    path: "/organizations/create",
    element: (
      <Suspense fallback={"LOADING"}>
        <CreateOrganization />
      </Suspense>
    ),
  },
];
