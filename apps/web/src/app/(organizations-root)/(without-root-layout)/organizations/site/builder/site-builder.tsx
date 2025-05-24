"use client"

import {
  useDeleteSitePage,
  useEditSiteBuilder,
  usePostSitePage,
  useUpdateSitePageName,
} from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { convertSlug } from "@/utils"
import { ContextProviders, Editor } from "@edust/grapesjs"
import { Typography } from "@edust/ui"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

import { BuilderProvider } from "./builder-provider"
import { handleGetAssetsWithPage } from "./handle-get-assets-with-page"

function SiteBuilder() {
  const orgId = useAuthStore((state) => state.activeOrgId)

  const { mutate: saveNewPage } = usePostSitePage()
  const { mutate: saveGsData } = useEditSiteBuilder()
  const { mutate: deletePageByName } = useDeleteSitePage()
  const { mutate: editPageName } = useUpdateSitePageName()

  if (!orgId) {
    return (
      <Typography variant="h2" className="text-destructive">
        orgId not found!
      </Typography>
    )
  }

  return (
    <>
      <title>Build Your Site</title>
      <ContextProviders
        pageOptions={{
          addANewPage: async (data: { pageName: string }, editor: Editor) => {
            const pages = editor.Pages
            const pageName = convertSlug(data.pageName)

            const html =
              '<body><section class="px-4 min-h-10 h-screen flex items-center flex-col justify-center"><img src="https://res.cloudinary.com/dmiewayfu/image/upload/v1724572263/edust-org/logo/logo_zcaqtt.svg" class="mt-10 mx-auto w-[300px]"/><h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4">\n  Drop your new ideas!\n</h1><!-- delete this --><!-- deleted end --></section></body>'

            const css = "* { box-sizing: border-box; } body {margin: 0;}"

            const pg = editor.Pages
            const pgs = pg.getAll().map((p) => {
              return p?.attributes?.name?.toLowerCase()
            })

            if (pgs.includes(pageName)) {
              return toast.error("Already have this page name.")
            }

            const id = uuidv4()

            try {
              saveNewPage({
                orgId,
                body: { id, pageName, html, css },
              })

              pages.add({
                name: pageName,
                component: html,
                css,
                id,
              })

              const { page: htmlPages, assets } =
                handleGetAssetsWithPage(editor)
              try {
                saveGsData({
                  orgId,
                  body: {
                    assets: assets,
                    page: htmlPages,
                  },
                })

                toast.success("successfully new page created!")
                return true
              } catch (error) {
                console.error(error)
                return false
              }
            } catch (error) {
              console.error(error)
              return false
            }
          },
          deletePage: async ({ page, editor, removePage }) => {
            const pageId = page?.id

            try {
              deletePageByName({ orgId, pageId })

              removePage(page)

              const { page: htmlPages, assets } =
                handleGetAssetsWithPage(editor)
              try {
                saveGsData({
                  orgId,
                  body: {
                    assets: assets,
                    page: htmlPages,
                  },
                })

                toast.success("successfully page deleted!")
                return true
              } catch (error) {
                console.error(error)
                return false
              }
            } catch (error) {
              console.error(error)
              return false
            }
          },
          editPageName: async ({ pageName, page, pages, editor }) => {
            const pageId = page?.id
            const pageNames = pages.map((page) => page?.attributes?.name) || []
            const filteredPageName = convertSlug(pageName)

            const isExist = pageNames.includes(filteredPageName)

            if (isExist) {
              toast.error("Already this page name is exist!")
              return false
            }

            if (
              page?.attributes?.name.toLocaleLowerCase() === filteredPageName
            ) {
              toast.error("Same name provided!")
              return false
            }
            page.set("name", filteredPageName)

            try {
              editPageName({
                orgId,
                pageId,
                pageName: filteredPageName,
              })

              const { page: htmlPages, assets } =
                handleGetAssetsWithPage(editor)
              try {
                saveGsData({
                  orgId,
                  body: {
                    assets: assets,
                    page: htmlPages,
                  },
                })

                toast.success("successfully new page created!")
                return true
              } catch (error) {
                console.error(error)
                return false
              }
            } catch (error) {
              console.error(error)
              return false
            }
          },
        }}
      >
        <BuilderProvider />
      </ContextProviders>
    </>
  )
}
export default SiteBuilder
