import api from "@/lib/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetOrgMe = () => {
  return useQuery({
    queryKey: ["org", "me"],
    queryFn: () => api.v0.getOrgMe(),
  })
}

export const useGetOrgLists = () => {
  return useQuery({
    queryKey: ["orgs"],
    queryFn: () => api.v0.getOrgLists(),
  })
}

export const usePostOrganization = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.v0.postOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orgs"] })
    },
  })
}

export const useGetSiteBuilderImages = (orgId: string) => {
  return useQuery({
    queryKey: ["siteBuilderImages", orgId],
    queryFn: () => api.v0.getSiteBuilderImages(orgId),
    enabled: !!orgId,
  })
}

export const useUploadSiteBuilderImage = () => {
  return useMutation({
    mutationFn: api.v0.uploadSiteBuilderImage,
  })
}

export const useEditSiteBuilderImageById = () => {
  return useMutation({
    mutationFn: api.v0.editSiteBuilderImagesById,
  })
}

export const useDeleteSiteBuilderImageById = () => {
  return useMutation({
    mutationFn: api.v0.deleteSiteBuilderImagesById,
  })
}

export const usePostSitePage = () => {
  return useMutation({
    mutationFn: api.v0.postSitePage,
  })
}

export const useUpdateSitePageName = () => {
  return useMutation({
    mutationFn: api.v0.updateSitePageName,
  })
}

export const useDeleteSitePage = () => {
  return useMutation({
    mutationFn: api.v0.deleteSitePage,
  })
}

export const usePostSiteBuilder = () => {
  return useMutation({
    mutationFn: api.v0.postSiteBuilder,
  })
}

export const useGetSiteBuilder = (orgId: string) => {
  return useQuery({
    queryKey: ["siteBuilder", orgId],
    queryFn: () => api.v0.getSiteBuilder(orgId),
    enabled: !!orgId,
  })
}

export const useEditSiteBuilder = () => {
  return useMutation({
    mutationFn: api.v0.editSiteBuilder,
  })
}

export * from "./student"
