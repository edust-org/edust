import GrapesjsEdust from "@edust/grapesjs-edust"
import "@edust/grapesjs-edust/style.css"

import {
  useDeleteSiteBuilderImagesByIdMutation,
  useEditSiteBuilderMutation,
  useLazyGetSiteBuilderQuery,
} from "@/app/api/v0/organizations"
import { useAppSelector } from "@/app/hooks"
import { toast } from "sonner"
import getImages from "./get-images"
import { handleGetAssetsWithPage } from "./handle-get-assets-with-page"

export const Builder = () => {
  const [deleteImage] = useDeleteSiteBuilderImagesByIdMutation()
  const [loadProjectData] = useLazyGetSiteBuilderQuery()

  const {
    orgId,
    auth: { token },
  } = useAppSelector((state) => state.authentication)

  const [saveGsData] = useEditSiteBuilderMutation()

  async function onEditor(editor: any) {
    editor.Commands.add("save-db", {
      run: async () => {
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
    })
    editor.on("asset:remove", async (asset) => {
      const id = asset?.attributes?.id
      if (!id) return
      try {
        const res = await deleteImage({ imageId: id, orgId })
        toast.success(res?.data?.message)
      } catch (error) {
        console.log(error)
      } finally {
        let images = await getImages(orgId)
        images = images?.data?.items?.map((item) => ({
          id: item.id,
          src: item.src,
        }))
        editor.AssetManager.add(images)
      }
    })
    editor.on("storage:start:load", async () => {
      try {
        const data = await loadProjectData(orgId).unwrap()
        editor.loadProjectData(JSON.parse(data?.data?.assets || "{}"))
      } catch (error) {
        console.error(error)
      }
    })

    editor.on("load", async (some, argument) => {
      try {
        let images = await getImages(orgId)
        images = images?.data?.items?.map((item) => ({
          id: item.id,
          src: item.src,
        }))
        editor.AssetManager.add(images)
      } catch (error) {
        console.error(error)
      }
    })
  }

  const optionsCustomize = (editorRef) => ({
    storageManager: {
      type: "remote", // Storage type. Available: local | remote
      autosave: true, // Store data automatically
      autoload: true, // Autoload stored data on init
      stepsBeforeSave: 10, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
      options: {
        remote: {
          // Load project data
          // urlLoad: `${
          //   import.meta.env.VITE_BACKEND_URL
          // }/api/v0/organizations/${orgId}/site-builder`,

          // onLoad: (result) => {
          //   return editorRef?.current?.loadProjectData(
          //     JSON.parse(result?.data?.assets || "{}"),
          //   )
          // },
          headers: {
            Authorization: `Bearer ${token}`,
          },

          // Store project data
          urlStore: `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v0/organizations/${orgId}/site-builder`,

          fetchOptions: (opts) =>
            opts.method === "POST" ? { ...opts, method: "PATCH" } : opts,

          onStore: (assets, editor) => {
            const { page } = handleGetAssetsWithPage(editor)
            return {
              assets,
              page,
            }
          },
        },
      },
    },

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
          const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v0/organizations/${orgId}/site-builder/images`

          // Perform the upload
          const response = await fetch(apiUrl, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Upload failed: ${errorText}`)
          }

          const responseData = await response.json()

          // Validate and process the response data
          const imagePaths = responseData?.data?.items.map((item) => item.src)
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

  return (
    <div>
      <GrapesjsEdust onEditor={onEditor} optionsCustomize={optionsCustomize} />
    </div>
  )
}
