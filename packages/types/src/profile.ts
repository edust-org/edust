
import { ApiResponse } from "./api-response"
import { User } from "./user"
import { Gender } from "./common"


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
