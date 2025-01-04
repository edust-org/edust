import axios from "@/utils/axios"

export default async (orgId: string) => {
  try {
    const res = await axios.get(
      `/api/v0/organizations/${orgId}/site-builder/images`,
    )

    return res.data
  } catch (error) {
    console.log(error)
    return []
  }
}
