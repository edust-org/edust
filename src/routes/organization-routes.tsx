import { SitesBuilder } from "@/organizations/features/sites-builder";
import { CreateOrganization, CustomizeSite } from "@/organizations/features";

export const organizationRoutes = [
  {
    path: "/sites-builder",
    element: <SitesBuilder />,
  },
  {
    path: "/sites-builder/:pageId",
    element: <CustomizeSite />,
  },
  {
    path: "/organizations",
    element: <div>Organizations</div>,
  },
  {
    path: "/organizations/create",
    element: <CreateOrganization />,
  },
];
