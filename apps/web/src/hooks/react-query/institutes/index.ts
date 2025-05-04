import api from "@/lib/api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const usePostInstitute = () =>
  useMutation({
    mutationFn: api.v0.postInstitute,
  })

export const useGetMeInstitutesLists = () =>
  useQuery({
    queryKey: ["institutes", "me"],
    queryFn: api.v0.getMeInstitutesLists,
  })

export const useGetInstitutesId = (instituteId: string, filters?: any) =>
  useQuery({
    queryKey: ["institutes", instituteId, filters],
    queryFn: () => api.v0.getInstitutesId({ instituteId, filters }),
    enabled: !!instituteId,
  })

export const useEditInstitutesById = () =>
  useMutation({
    mutationFn: api.v0.editInstitutesById,
  })

export const useDeleteInstituteById = () =>
  useMutation({
    mutationFn: api.v0.deleteInstituteById,
  })
