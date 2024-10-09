import { AccountType } from "./account-type";
import { RoleTypes } from "./role-types";

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
  role_types: null | RoleTypes;
  created_at: Date;
  updated_at: Date;
}
