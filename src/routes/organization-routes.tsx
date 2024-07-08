import {
  CreateOrganization,
  CustomizeSite,
  SitesBuilder,
} from "@/organizations";

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
