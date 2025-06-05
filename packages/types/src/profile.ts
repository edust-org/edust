import type { ApiResponse, Gender, User } from "@edust/types"

type Academic = {
  id: string
  name: string
  orgUsername: string
  profilePic: string | null
  studentId: string
  orgStudentId: string
}

type UserType = Pick<User, "id" | "name" | "username" | "profilePic"> & {
  gender: Gender | null
  academics: null | Academic[]
}
export type ProfileResponse = ApiResponse<UserType>
