import { CreateOrganization } from "@/organizations";

export const organizationRoutes = [
  {
    path: "/organizations",
    element: <div>Organizations</div>,
  },
  {
    path: "/organizations/create",
    element: <CreateOrganization />,
  },
];
