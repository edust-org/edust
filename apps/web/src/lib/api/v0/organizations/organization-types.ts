export type GetStudentUsersQuery = {
  search?: {
    name?: string
    email?: string
  }
}

export type StudentUser = {
  id: string
  name: string
  profilePic: string | null
  studentId: string | null
  orgStudentId: string | null
}

export type GetStudentUsersResponse = {
  items: StudentUser[]
}


export type Student = {
  id: string
  name: string
  profilePic: string | null
  studentId: string
  orgStudentId: string
}

export type GetStudentsResponse = {
  items: Student[]
}

export type PostStudentsRequest = {
  userIds: string[]
}

export type PostStudentsResponse = {
  items: Student[]
}
