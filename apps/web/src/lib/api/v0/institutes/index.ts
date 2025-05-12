import { defaultValues } from "@/configs"
import axios from "@/lib/axios"

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

export const getInstitutesId = async (arg: {
  instituteId: string
  query?: InstituteFilters
}): Promise<any> => {
  const response = await axios.get(`${BASE_URL}/${arg.instituteId}`, {
    params: arg.query,
  })
  return response.data
}

export const editInstitutesById = async (arg: {
  id: string
  body: any
}): Promise<any> => {
  const response = await axios.patch(`${BASE_URL}/${arg.id}`, arg.body)
  return response.data
}

export const deleteInstituteById = async (id: string): Promise<any> => {
  const response = await axios.delete(`${BASE_URL}/${id}`)
  return response.data
}
