import { Roles } from "./roles";

export interface Organization {
  id: string;
  name: string;
  org_username: string;
  is_profile_verified: boolean;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationRoles {
  id: string;
  name: string;
  role: Roles;
}
