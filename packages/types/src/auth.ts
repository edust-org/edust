import { User } from './schemas/user';

import { Organization } from './organization';




export type Academics = Pick<
  Organization,
  "id" | "name" | "orgUsername" | "profilePic"
> & { studentId: string; orgId: string }

export type AuthMe = User & {

  systemRole: null
  organizations: null | Array<Organization>
  academics: null | Array<Academics>
}

