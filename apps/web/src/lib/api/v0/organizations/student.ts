import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { ApiResponse } from "@edust/types"

import {
  GetStudentUsersQuery,
  GetStudentUsersResponse,
  GetStudentsResponse,
  PostStudentsBody,
  PostStudentsResponse,
} from "./organization-types"

const baseUrl = `${defaultValues.apiV0URL}/orgs`

export const student = {
  getStudentUsers: async ({
    orgId,
    query,
  }: {
    orgId: string
    query?: GetStudentUsersQuery
  }): Promise<ApiResponse<GetStudentUsersResponse>> => {
    const response = await axios.get(`${baseUrl}/${orgId}/students/users`, {
      params: query,
    })
    return response.data
  },

  getStudents: async ({
    orgId,
  }: {
    orgId: string
  }): Promise<ApiResponse<GetStudentsResponse>> => {
    const response = await axios.get(`${baseUrl}/${orgId}/students`)
    return response.data
  },

  postStudent: async ({
    orgId,
    body,
  }: {
    orgId: string
    body: PostStudentsBody
  }): Promise<ApiResponse<PostStudentsResponse>> => {
    const response = await axios.post(`${baseUrl}/${orgId}/students`, body)
    return response.data
  },

  deleteStudentById: async ({
    orgId,
    orgStudentId,
  }: {
    orgId: string
    orgStudentId: string
  }): Promise<ApiResponse<null>> => {
    const response = await axios.delete(
      `${baseUrl}/${orgId}/students/${orgStudentId}`,
    )
    return response.data
  },
}
