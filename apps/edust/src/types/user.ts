import { AccountType } from "./account-type";
import { OrganizationRoles } from "./organization";
import { Roles } from "./roles";

export interface User {
  id: string;
  name: string;
  username: null | string;
  email: string;
  password: string;
  account_type: AccountType;
  account_details: null | object;
  is_verified: boolean;
  is_profile_verified: boolean;
  system_role: Roles;
  organization_roles: null | OrganizationRoles[];
  created_at: Date;
  updated_at: Date;
}
