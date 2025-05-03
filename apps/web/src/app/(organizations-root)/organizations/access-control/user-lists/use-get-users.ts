import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const useGetUsers = (activeOrgId: string | null, search: string) => {
  const emailSchema = z.string().email()
  const isEmail = emailSchema.safeParse(search).success

  return useQuery({
    queryKey: ["users", activeOrgId, search],
    queryFn: async () => {
      const res = await axios.get(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/users`,
        {
          params: {
            ...(isEmail && { "search[email]": search }),
            ...(!isEmail && { "search[name]": search }),
          },
        },
      )

      return res.data?.data?.items || []
    },
    enabled: !!activeOrgId,
  })
}
