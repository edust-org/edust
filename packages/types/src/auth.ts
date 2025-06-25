import type { Organization, Roles, User } from "@edust/types"

export type Academics = Pick<
  Organization,
  "id" | "name" | "orgUsername" | "profilePic"
> & { studentId: string; orgId: string }

export type AuthMe = User & {
  systemRole: null
  organizations: null | Array<Organization>
  academics: null | Array<Academics>
  profiles: null | Array<{
    id: string
    role: Roles.student
    orgStudentId: string
    organization: Pick<
      Organization,
      "id" | "name" | "orgUsername" | "profilePic"
    >
  }>
}
