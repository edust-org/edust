import api from "@/lib/api"
import {
  AccessControlUser,
  PatchRoleBody,
  PostRoleAssignmentBody,
  PostRoleBody,
  PostRolePermissionsBody,
  Role,
  RoleAssignmentResponse,
  RoleListItem,
  RolePermission,
  RoleUser,
} from "@/lib/api/v0/organizations/organization-types"
import { ApiResponse } from "@edust/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const accessControlHooks = {
  usePostRole: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<Role>,
      unknown,
      { orgId: string; body: PostRoleBody }
    >({
      mutationFn: api.v0.accessControl.postRole,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["roles", variables.orgId],
        })
      },
    })
  },

  useGetRoles: (orgId: string | null) =>
    useQuery<ApiResponse<{ items: RoleListItem[] }>>({
      queryKey: ["roles", orgId],
      queryFn: () => api.v0.accessControl.getRoles({ orgId: orgId! }),
      enabled: !!orgId,
    }),

  useGetRoleById: (orgId: string | null, roleId: string | null) =>
    useQuery<ApiResponse<Role>>({
      queryKey: ["role", orgId, roleId],
      queryFn: () =>
        api.v0.accessControl.getRoleById({ orgId: orgId!, roleId: roleId! }),
      enabled: !!orgId && !!roleId,
    }),

  usePatchRoleById: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<Role>,
      unknown,
      { orgId: string; roleId: string; body: PatchRoleBody }
    >({
      mutationFn: api.v0.accessControl.patchRoleById,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["role", variables.orgId, variables.roleId],
        })
        queryClient.invalidateQueries({
          queryKey: ["roles", variables.orgId],
        })
      },
    })
  },

  useDeleteRoleById: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<null>,
      unknown,
      { orgId: string; roleId: string }
    >({
      mutationFn: api.v0.accessControl.deleteRoleById,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["role", variables.orgId, variables.roleId],
        })
        queryClient.invalidateQueries({
          queryKey: ["roles", variables.orgId],
        })
      },
    })
  },
  useBulkDeleteRolePermissions: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<null>,
      unknown,
      { orgId: string; roleId: string; body: { permissionIds: string[] } }
    >({
      mutationFn: api.v0.accessControl.bulkDeleteRolePermissions,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["rolePermissions", variables.orgId, variables.roleId],
        })
      },
    })
  },
  usePostRolePermissions: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<RolePermission>,
      unknown,
      { orgId: string; roleId: string; body: PostRolePermissionsBody }
    >({
      mutationFn: api.v0.accessControl.postRolePermissions,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["rolePermissions", variables.orgId, variables.roleId],
        })
      },
    })
  },

  useGetRolePermissions: (orgId: string | null, roleId: string | null) =>
    useQuery<ApiResponse<{ items: RolePermission[] }>>({
      queryKey: ["rolePermissions", orgId, roleId],
      queryFn: () =>
        api.v0.accessControl.getRolePermissions({
          orgId: orgId!,
          roleId: roleId!,
        }),
      enabled: !!orgId && !!roleId,
    }),

  useGetRoleUsers: (orgId: string | null, roleId: string | null) =>
    useQuery<ApiResponse<{ items: RoleUser[] }>>({
      queryKey: ["roleUsers", orgId, roleId],
      queryFn: () =>
        api.v0.accessControl.getRoleUsers({ orgId: orgId!, roleId: roleId! }),
      enabled: !!orgId && !!roleId,
    }),

  useGetAccessControlUsers: (
    orgId: string | null,
    query: { search?: { name?: string; email?: string } },
  ) =>
    useQuery<ApiResponse<{ items: AccessControlUser[] }>>({
      queryKey: ["accessControlUsers", orgId, query],
      queryFn: () =>
        api.v0.accessControl.getAccessControlUsers({ orgId: orgId!, query }),
      enabled: !!orgId,
    }),

  usePostRoleAssignments: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<RoleAssignmentResponse>,
      unknown,
      { orgId: string; body: PostRoleAssignmentBody }
    >({
      mutationFn: api.v0.accessControl.postRoleAssignments,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["accessControlUsers", variables.orgId],
        })
      },
    })
  },

  useDeleteRoleAssignmentById: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<null>,
      unknown,
      { orgId: string; userId: string; assignId: string }
    >({
      mutationFn: api.v0.accessControl.deleteRoleAssignmentById,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["roleUsers", variables.orgId, null],
        })
        queryClient.invalidateQueries({
          queryKey: ["accessControlUsers", variables.orgId],
        })
      },
    })
  },
}
