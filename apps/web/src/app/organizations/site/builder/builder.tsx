"use client"

import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import {
  useDeleteSiteBuilderImagesByIdMutation,
  useEditSiteBuilderMutation,
  useGetSiteBuilderImagesQuery,
  useLazyGetSiteBuilderImagesQuery,
  useLazyGetSiteBuilderQuery,
} from "@/lib/store/api/v0/organizations"
import { useAppSelector } from "@/lib/store/hooks"
import EdustGrapesjs, { Configs } from "@edust/grapesjs"
import { toast } from "sonner"

// import getImages from "./get-images"
import { handleGetAssetsWithPage } from "./handle-get-assets-with-page"

export const Builder = () => {
  const [getImages] = useLazyGetSiteBuilderImagesQuery()
  const [deleteImage] = useDeleteSiteBuilderImagesByIdMutation()
  const [loadProjectData] = useLazyGetSiteBuilderQuery()

  const { orgId } = useAppSelector((state) => state.authentication)
  const { refetch: refaceGetImages } = useGetSiteBuilderImagesQuery(orgId)

  const [saveGsData] = useEditSiteBuilderMutation()

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
    },
    async handleSave(editor) {
      const { page, assets } = handleGetAssetsWithPage(editor)
      saveGsData({
        orgId,
        body: {
          assets: assets,
          page,
        },
      })
        .unwrap()
        .then((res) => {
          if (res?.status) {
            toast.success(res?.message)
          }
        })
        .catch((error) => {
          toast.error(error?.data?.message)
        })
    },
    async handleLoadProjectData() {
      try {
        const data = await loadProjectData(orgId).unwrap()
        return data?.data?.assets
      } catch (error) {
        console.log(error)
        return {}
      }
    },
    async handleLoadAssetImages() {
      try {
        const data = await getImages(orgId)

        const images = data?.data?.items?.map((item) => ({
          id: item.id,
          src: item.src,
        }))
        return images
      } catch (error) {
        console.error(error)
        return []
      }
    },
    async handleRemoveAssetImage(id) {
      try {
        const res = await deleteImage({ imageId: id, orgId })
        toast.success(res?.data?.message)
        await refaceGetImages()
      } catch (error) {
        console.log(error)
      }
    },
  }

  return (
    <div>
      <EdustGrapesjs optionsCustomize={optionsCustomize} configs={configs} />
    </div>
  )
}
