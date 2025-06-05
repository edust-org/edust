import api from "@/lib/api"
import {
  GetStudentUsersQuery,
  GetStudentUsersResponse,
  GetStudentsResponse,
  PostStudentsBody,
  PostStudentsResponse,
} from "@/lib/api/v0/organizations/organization-types"
import { ApiResponse } from "@edust/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const studentHooks = {
  useGetStudentUsers: (orgId: string, query: GetStudentUsersQuery) => {
    return useQuery<ApiResponse<GetStudentUsersResponse>>({
      queryKey: ["studentUsers", orgId, query],
      queryFn: () => api.v0.student.getStudentUsers({ orgId, query }),
      enabled: !!orgId,
    })
  },

  useGetStudents: (orgId: string | null) => {
    return useQuery<ApiResponse<GetStudentsResponse>>({
      queryKey: ["students", orgId],
      queryFn: () => api.v0.student.getStudents({ orgId: orgId! }),
      enabled: !!orgId,
    })
  },
  usePostStudent: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<PostStudentsResponse>,
      unknown,
      { orgId: string; body: PostStudentsBody }
    >({
      mutationFn: api.v0.student.postStudent,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["students", variables.orgId],
        })
        queryClient.invalidateQueries({
          queryKey: ["studentUsers", variables.orgId],
        })
      },
    })
  },
  useDeleteStudentById: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<null>,
      unknown,
      { orgId: string; orgStudentId: string }
    >({
      mutationFn: api.v0.student.deleteStudentById,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["students", variables.orgId],
        })
        queryClient.invalidateQueries({
          queryKey: ["studentUsers", variables.orgId],
        })
      },
    })
  },
}
