import api from "@/lib/api"
import { GetCloudinarySignatureQuery } from "@/lib/api/v0/_others"
import axios from "axios"

type CloudinaryUploadResponse = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  access_mode: string
  original_filename: string
  api_key: string
}

async function uploadImage(
  image: File,
  query?: GetCloudinarySignatureQuery,
): Promise<CloudinaryUploadResponse> {
  try {
    // Get signature and related data from your API
    const signatureResponse = await api.v0.getCloudinarySignature(query)

    const { signature, timestamp, apiKey, cloudName, folder } =
      signatureResponse.data

    // Prepare form data for upload
    const formData = new FormData()
    formData.append("file", image)
    formData.append("api_key", apiKey)
    formData.append("signature", signature)
    formData.append("timestamp", timestamp.toString())
    formData.append("folder", folder)

    // Perform the upload request
    const uploadResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
    )

    // Return the upload result
    return uploadResponse.data
  } catch (error) {
    console.error("Upload failed:", error)
    throw error
  }
}

export const cloudinary = {
  uploadImage,
}
