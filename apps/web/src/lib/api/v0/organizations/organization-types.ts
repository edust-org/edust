export type Role = {
  id: string
  name: string
  description: string | null
  orgId: string
  createdAt: string
  updatedAt: string
}

export type RoleListItem = {
  id: string
  name: string
}

export type PostRoleBody = {
  name: string
  description?: string | null
}

export type PatchRoleBody = PostRoleBody

export type PostRolePermissionsBody = {
  permissionIds: string[]
}

export type RolePermission = {
  id: string
  name: string
  label: string
  description: string | null
  hasAccess: boolean
  createdAt: string
  updatedAt: string
}

export type RoleUser = {
  id: string
  name: string
  profilePic: string | null
  roleId: string
  roleName: string
  assignId: string
}
export type AccessControlUserQuery = {
  search?: {
    name?: string
    email?: string
  }
}

export type AccessControlUser = {
  id: string
  name: string
  profilePic: string | null
  roles: {
    id: string
    name: string
  }[]
}

export type PostRoleAssignmentBody = {
  userId: string
  roleId: string
}

export type RoleAssignmentResponse = {
  id: string
  name: string
  description: string | null
  orgId: string
  createdAt: string
  updatedAt: string
}

export type GetStudentUsersQuery = AccessControlUserQuery

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

export type PostStudentsBody = {
  userIds: string[]
}

export type PostStudentsResponse = {
  items: Student[]
}
