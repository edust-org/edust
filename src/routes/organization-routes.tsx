import { CreateOrganization, SitesBuilder } from "@/organizations";

export const organizationRoutes = [
  {
    path: "/sites-builder",
    element: <SitesBuilder />,
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
