import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { ApiResponse } from "@/types"

const baseUrl = `${defaultValues.apiV0URL}/organizations`

export const getOrgMe = async (): Promise<ApiResponse<any>> => {
  const response = await axios.get(`${baseUrl}/me`)
  return response.data
}

export const postOrganization = async (
  body: any,
): Promise<ApiResponse<any>> => {
  const response = await axios.post(`${baseUrl}/`, body)
  return response.data
}

export const getOrgLists = async (): Promise<ApiResponse<any>> => {
  const response = await axios.get(`${baseUrl}/`)
  return response.data
}

export const uploadSiteBuilderImage = async ({
  orgId,
  body,
}: {
  orgId: string
  body: any
}): Promise<ApiResponse<any>> => {
  const response = await axios.post(
    `${baseUrl}/${orgId}/site-builder/images`,
    body,
  )
  return response.data
}

export const getSiteBuilderImages = async (
  orgId: string,
): Promise<ApiResponse<any>> => {
  const response = await axios.get(`${baseUrl}/${orgId}/site-builder/images`)
  return response.data
}

export const editSiteBuilderImagesById = async ({
  orgId,
  imageId,
  body,
}: {
  orgId: string
  imageId: string
  body: any
}): Promise<ApiResponse<any>> => {
  const response = await axios.patch(
    `${baseUrl}/${orgId}/site-builder/images/${imageId}`,
    body,
  )
  return response.data
}

export const deleteSiteBuilderImagesById = async ({
  orgId,
  imageId,
}: {
  orgId: string
  imageId: string
}): Promise<ApiResponse<any>> => {
  const response = await axios.delete(
    `${baseUrl}/${orgId}/site-builder/images/${imageId}`,
  )
  return response.data
}

export const postSitePage = async ({
  orgId,
  body,
}: {
  orgId: string
  body: { id: string; pageName: string; html: string; css: string }
}): Promise<ApiResponse<any>> => {
  const response = await axios.post(
    `${baseUrl}/${orgId}/site-builder/pages`,
    body,
  )
  return response.data
}

export const updateSitePageName = async ({
  orgId,
  pageId,
  pageName,
}: {
  orgId: string
  pageId: string
  pageName: string
}): Promise<ApiResponse<any>> => {
  const response = await axios.patch(
    `${baseUrl}/${orgId}/site-builder/pages/${pageId}`,
    { pageName },
  )
  return response.data
}

export const deleteSitePage = async ({
  orgId,
  pageId,
}: {
  orgId: string
  pageId: string
}): Promise<ApiResponse<any>> => {
  const response = await axios.delete(
    `${baseUrl}/${orgId}/site-builder/pages/${pageId}`,
  )
  return response.data
}

export const postSiteBuilder = async ({
  orgId,
  body,
}: {
  orgId: string
  body: any
}): Promise<ApiResponse<any>> => {
  const response = await axios.post(`${baseUrl}/${orgId}/site-builder`, body)
  return response.data
}

export const getSiteBuilder = async (
  orgId: string,
): Promise<ApiResponse<any>> => {
  const response = await axios.get(`${baseUrl}/${orgId}/site-builder`)
  return response.data
}

export const editSiteBuilder = async ({
  orgId,
  body,
}: {
  orgId: string
  body: any
}): Promise<ApiResponse<any>> => {
  const response = await axios.patch(`${baseUrl}/${orgId}/site-builder`, body)
  return response.data
}

export * from "./access-control"
export * from "./student"
