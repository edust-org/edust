import { Organization, User } from "@/types"

export type Academics = Pick<
  Organization,
  "id" | "name" | "orgUsername" | "profilePic"
> & { studentId: string; orgId: string }

export type AuthMe = User & {
  systemRole: null
  organizations: null | Array<Organization>
  academics: null | Array<Academics>
}
