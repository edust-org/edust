export type User = {
  id: string
  name: string
  username: string | null
  email: string
  profilePic: string | null
  userFlags: null | Partial<{
    system: boolean
    organization: boolean
    student: boolean
  }>
  createdAt: string
  updatedAt: string
}
