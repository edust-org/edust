import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { ApiResponse } from "@/types"

import {
  AccessControlUser,
  AccessControlUserQuery,
  PatchRoleBody,
  PostRoleAssignmentBody,
  PostRoleBody,
  PostRolePermissionsBody,
  Role,
  RoleAssignmentResponse,
  RoleListItem,
  RolePermission,
  RoleUser,
} from "./organization-types"

const baseUrl = `${defaultValues.apiV0URL}/orgs`

export const accessControl = {
  postRole: async ({
    orgId,
    body,
  }: {
    orgId: string
    body: PostRoleBody
  }): Promise<ApiResponse<Role>> => {
    const res = await axios.post(
      `${baseUrl}/${orgId}/access-control/roles`,
      body,
    )
    return res.data
  },

  getRoles: async ({
    orgId,
  }: {
    orgId: string
  }): Promise<ApiResponse<{ items: RoleListItem[] }>> => {
    const res = await axios.get(`${baseUrl}/${orgId}/access-control/roles`)
    return res.data
  },

  getRoleById: async ({
    orgId,
    roleId,
  }: {
    orgId: string
    roleId: string
  }): Promise<ApiResponse<Role>> => {
    const res = await axios.get(
      `${baseUrl}/${orgId}/access-control/roles/${roleId}`,
    )
    return res.data
  },

  patchRoleById: async ({
    orgId,
    roleId,
    body,
  }: {
    orgId: string
    roleId: string
    body: PatchRoleBody
  }): Promise<ApiResponse<Role>> => {
    const res = await axios.patch(
      `${baseUrl}/${orgId}/access-control/roles/${roleId}`,
      body,
    )
    return res.data
  },

  deleteRoleById: async ({
    orgId,
    roleId,
  }: {
    orgId: string
    roleId: string
  }): Promise<ApiResponse<null>> => {
    const res = await axios.delete(
      `${baseUrl}/${orgId}/access-control/roles/${roleId}`,
    )
    return res.data
  },

  bulkDeleteRolePermissions: async ({
    orgId,
    roleId,
    body,
  }: {
    orgId: string
    roleId: string
    body: { permissionIds: string[] }
  }): Promise<ApiResponse<null>> => {
    const res = await axios.post(
      `${baseUrl}/${orgId}/access-control/roles/${roleId}/permissions/bulk-delete`,
      body,
    )
    return res.data
  },

  postRolePermissions: async ({
    orgId,
    roleId,
    body,
  }: {
    orgId: string
    roleId: string
    body: PostRolePermissionsBody
  }): Promise<ApiResponse<RolePermission>> => {
    const res = await axios.post(
      `${baseUrl}/${orgId}/access-control/roles/${roleId}/permissions`,
      body,
    )
    return res.data
  },

  getRolePermissions: async ({
    orgId,
    roleId,
  }: {
    orgId: string
    roleId: string
  }): Promise<ApiResponse<{ items: RolePermission[] }>> => {
    const res = await axios.get(
      `${baseUrl}/${orgId}/access-control/roles/${roleId}/permissions`,
    )
    return res.data
  },

  getRoleUsers: async ({
    orgId,
    roleId,
  }: {
    orgId: string
    roleId: string
  }): Promise<ApiResponse<{ items: RoleUser[] }>> => {
    const res = await axios.get(
      `${baseUrl}/${orgId}/access-control/roles/${roleId}/users`,
    )
    return res.data
  },

  getAccessControlUsers: async ({
    orgId,
    query,
  }: {
    orgId: string
    query?: AccessControlUserQuery
  }): Promise<ApiResponse<{ items: AccessControlUser[] }>> => {
    const res = await axios.get(`${baseUrl}/${orgId}/access-control/users`, {
      params: query,
    })
    return res.data
  },
  postRoleAssignments: async ({
    orgId,
    body,
  }: {
    orgId: string
    body: PostRoleAssignmentBody
  }): Promise<ApiResponse<RoleAssignmentResponse>> => {
    const res = await axios.post(
      `${baseUrl}/${orgId}/access-control/users/role-assignments`,
      body,
    )
    return res.data
  },

  deleteRoleAssignmentById: async ({
    orgId,
    userId,
    assignId,
  }: {
    orgId: string
    userId: string
    assignId: string
  }): Promise<ApiResponse<null>> => {
    const res = await axios.delete(
      `${baseUrl}/${orgId}/access-control/users/${userId}/role-assignments/${assignId}`,
    )
    return res.data
  },
}
