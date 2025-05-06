import { Organization } from "@/types"

export type AuthMe = {
  id: string
  name: string
  username: string
  email: string
  profilePic: string | null
  hasRoles?: {
    system?: boolean
    organization?: boolean
  }
  systemRole: null | string
  organizations: null | Array<Organization>
  createdAt: string
  updatedAt: string
}
