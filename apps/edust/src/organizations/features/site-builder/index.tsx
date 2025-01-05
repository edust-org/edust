import { ContextProviders } from "@edust/grapesjs-edust"
import { Builder } from "./builder"
import { toast } from "sonner"

export const SiteBuilder = () => {
  return (
    <>
      <ContextProviders
        pageOptions={{
          addANewPage: (data, editor) => {
            console.log({ data, editor })

            const pages = editor.Pages
            const pageName = data.pageName.toLocaleLowerCase()

            const pg = editor.Pages
            const pgs = pg.getAll().map((p) => {
              return p?.attributes?.name?.toLowerCase()
            })

            if (pgs.includes(pageName)) {
              return toast.error("Already have this page name.")
            }

            pages.add({
              name: pageName,
              component: `<h1>Page content ${pageName}</h1>`,
            })

            toast.success("successfully new page created!")

            return true
          },
        }}
      >
        <Builder />
      </ContextProviders>
    </>
  )
}
