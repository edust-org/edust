export interface User {
  id: string
  name: string
  username: string | null
  email: string
  profilePic: string | null
  hasRoles: null | { system: boolean; organization: boolean }
}
