import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { ApiResponse } from "@/types"

export type GetCloudinarySignatureQuery = {
  folderPrefixes?: string
}

type CloudinarySignatureResponse = {
  signature: string
  timestamp: number
  folder: string
  apiKey: string
  cloudName: string
}

export const getCloudinarySignature = async (
  query?: GetCloudinarySignatureQuery,
): Promise<ApiResponse<CloudinarySignatureResponse>> => {
  const response = await axios.get(
    `${defaultValues.apiV0URL}/cloudinary/signature`,
    {
      params: query,
    },
  )
  return response.data
}
