import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import QueryString from "qs"

const BASE_URL = `${defaultValues.apiV0URL}/institutes`

export interface InstituteFilters {
  [key: string]: string
}

export const postInstitute = async (body: any): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/`, body)
  return response.data
}

export const getMeInstitutesLists = async (): Promise<any[]> => {
  const response = await axios.get(`${BASE_URL}/me`)
  return response.data?.data?.items || []
}

export const getInstitutesId = async (params: {
  instituteId: string
  filters?: InstituteFilters
}): Promise<any> => {
  const queryString = QueryString.stringify(params.filters)
    ? `/?${QueryString.stringify(params.filters)}`
    : ""

  const response = await axios.get(
    `${BASE_URL}/${params.instituteId}${queryString}`,
  )
  return response.data
}

export const editInstitutesById = async (params: {
  id: string
  body: any
}): Promise<any> => {
  const response = await axios.patch(`${BASE_URL}/${params.id}`, params.body)
  return response.data
}

export const deleteInstituteById = async (id: string): Promise<any> => {
  const response = await axios.delete(`${BASE_URL}/${id}`)
  return response.data
}
