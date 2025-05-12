import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { ApiResponse } from "@/types"

const baseUrl = `${defaultValues.apiV0URL}/public`

export interface GetInstitutesQuery {
  search?: { name?: string }
  filter?: {
    instituteCategoryId?: string
    codeType?: string
    code?: string
    countryName?: string
  }
  foundedDate?: { from?: Date; to?: Date }
  sortBy?: "foundedDate" | "name" | "country"
  order?: "ASC" | "DESC"
  page?: string
  limit?: string
}

export const getInstitutes = async (
  query?: GetInstitutesQuery,
): Promise<ApiResponse<null>> => {
  const response = await axios.get(`${baseUrl}/institutes/`, { params: query })
  return response.data
}

export const getInstituteById = async (
  instituteId: string,
): Promise<ApiResponse<null>> => {
  const response = await axios.get(`${baseUrl}/institutes/${instituteId}`)
  return response.data
}

export const getInstitutesCategories = async (query?: {
  limit?: number
}): Promise<ApiResponse<null>> => {
  const response = await axios.get(`${baseUrl}/institutes/categories`, {
    params: query,
  })
  return response.data
}
