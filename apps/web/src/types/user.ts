export interface User {
  id: string
  name: string
  username: string | null
  email: string
  profilePic: string | null
  userFlags: null | { system: boolean; organization: boolean }
}
