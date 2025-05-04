"use client"

import { defaultValues } from "@/configs"
import {
  useDeleteSiteBuilderImageById,
  useEditSiteBuilder,
  useGetSiteBuilder,
  useGetSiteBuilderImages,
} from "@/hooks/react-query"
import axios from "@/lib/axios"
import { useAuthStore } from "@/lib/store"
import EdustGrapesjs, { Configs } from "@edust/grapesjs"
import { toast } from "sonner"

// import getImages from "./get-images"
import { handleGetAssetsWithPage } from "./handle-get-assets-with-page"

export const BuilderProvider = () => {
  const orgId = useAuthStore((state) => state.activeOrgId)
  const { data: imagesData, refetch: refaceGetImages } =
    useGetSiteBuilderImages(orgId || "")
  const { mutateAsync: deleteImage } = useDeleteSiteBuilderImageById()
  const { data: loadProjectData } = useGetSiteBuilder(orgId || "")

  const { mutateAsync: saveGsData } = useEditSiteBuilder()

  const optionsCustomize = (editorRef) => ({
    assetManager: {
      uploadFile: async (event) => {
        try {
          const files = event.dataTransfer
            ? event.dataTransfer.files
            : event.target?.files

          if (!files || files.length === 0) {
            throw new Error("No files selected for upload.")
          }

          // Prepare FormData with all selected files
          const formData = new FormData()
          Array.from(files).forEach((file) => formData.append("images", file))

          // API endpoint for image upload
          const apiUrl = `${defaultValues.backendURL}/api/v0/organizations/${orgId}/site-builder/images`

          const response = await axios.post(apiUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          // Validate and process the response data

          const imagePaths = response?.data?.data?.items.map((item) => item.src)
          if (!imagePaths || imagePaths.length === 0) {
            throw new Error("No valid image paths returned from the server.")
          }

          // Add images to the editor's Asset Manager
          const editor = editorRef?.current
          if (editor) {
            const assetManager = editor.AssetManager
            assetManager.add(imagePaths)
            assetManager.render()
          } else {
            console.warn("Editor instance is not available.")
          }
        } catch (error) {
          console.error("Error during image upload:", error.message)
        }
      },
    },
  })

  const configs: Configs = {
    async handleStore(assets, page) {
      if (orgId) {
        try {
          const response = await saveGsData({
            orgId,
            body: {
              assets: assets,
              page,
            },
          })
          toast.success(response?.data?.message)
        } catch (error) {
          console.error(error)
        }
      }
    },
    async handleSave(editor) {
      const { page, assets } = handleGetAssetsWithPage(editor)
      if (orgId) {
        try {
          const response = await saveGsData({
            orgId,
            body: {
              assets: assets,
              page,
            },
          })
          toast.success(response?.data?.message)
        } catch (error) {
          console.error(error)
        }
      }
    },
    async handleLoadProjectData() {
      const data = loadProjectData
      return data?.data?.assets || {}
    },
    async handleLoadAssetImages() {
      return (
        imagesData?.data?.items?.map((item) => ({
          id: item.id,
          src: item.src,
        })) || []
      )
    },
    async handleRemoveAssetImage(id) {
      if (orgId) {
        try {
          const res = await deleteImage({ imageId: id, orgId })
          toast.success(res?.data?.message)
          await refaceGetImages()
        } catch (error) {
          console.error(error)
        }
      }
    },
  }

  return (
    <div>
      <EdustGrapesjs optionsCustomize={optionsCustomize} configs={configs} />
    </div>
  )
}
