import api from "@/lib/api"
import { GetInstitutesQuery } from "@/lib/api/v0/public"
import { useQuery } from "@tanstack/react-query"

export const useGetInstitutes = (query?: GetInstitutesQuery) => {
  return useQuery({
    queryKey: ["institutes", query],
    queryFn: () => api.v0.getInstitutes(query),
  })
}

export const useGetInstituteById = (instituteId: string) => {
  return useQuery({
    queryKey: ["institute", instituteId],
    queryFn: () => api.v0.getInstituteById(instituteId),
    enabled: !!instituteId,
  })
}

export const useGetInstitutesCategories = (query?: { limit?: number }) => {
  return useQuery({
    queryKey: ["institute-categories", query],
    queryFn: () => api.v0.getInstitutesCategories(query),
  })
}

export const useGetQuizResultByResultToken = (resultToken: string) => {
  return useQuery({
    queryKey: ["quiz-result", resultToken],
    queryFn: () => api.v0.getQuizResultByResultToken(resultToken),
    enabled: !!resultToken,
  })
}
