import api from "@/lib/api"
import { GetCloudinarySignatureQuery } from "@/lib/api/v0/_others"
import { CloudinaryUploadResponse } from "@/types"
import axios from "axios"

type UploadCategory = "support"

const handleUploadCategory = (uploadCategory: UploadCategory) => {
  const query: GetCloudinarySignatureQuery = {}

  switch (uploadCategory) {
    case "support":
      query.folderSuffixes = "/support"
      break

    default:
      query.folderSuffixes = "/others"
      break
  }

  return query
}

async function uploadImage(
  image: File,
  uploadCategory: UploadCategory,
): Promise<CloudinaryUploadResponse> {
  const query = handleUploadCategory(uploadCategory)
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
