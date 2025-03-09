import { FullSpinner } from "@/components/full-spinner"
import { SidebarInset, SidebarProvider, TooltipProvider } from "@/components/ui"
import GjsEditor, { Canvas, WithEditor } from "@/edust-grapesjs/_react-wrapper"
import { ActivePanel } from "@/types"
import grapesjs, { Assets, Component, Editor } from "grapesjs"
import "grapesjs/css/grapes.min.css"
import { Toaster } from "sonner"

import React, { useRef } from "react"

import "../index.css"
import { Configs } from "../types"
import { useRightPanelContext } from "./context/right-panel"
import { LeftArea } from "./left-area"
import { default as customOnEditor } from "./on-editor"
import options from "./options"
import { RightArea } from "./right-area"
import { TopArea } from "./top-area"
import { cn } from "./utils"

interface GrapesjsEdustProps {
  optionsCustomize: (editor: React.RefObject<Editor | null>) => object
  configs: Configs
}

const EdustGrapesjs: React.FC<GrapesjsEdustProps> = (props) => {
  const { dispatch } = useRightPanelContext()

  const { optionsCustomize, configs } = props
  const editorRef = useRef<Editor | null>(null)

  async function gsOnEditor(editor: Editor) {
    if (!editor) {
      console.error("Editor is not initialized")
      return
    }

    editorRef.current = editor

    editor.Commands.add("save-db", {
      run: async () => {
        try {
          await configs.handleSave(editor)
        } catch (error) {
          console.error(error)
        }
      },
    })

    editor.Storage.add("remote", {
      async load() {
        return await configs.handleLoadProjectData()
      },
      async store(assets) {
        const selectedComponent = editor?.Pages?.getSelected()
        const page = {
          pageName: selectedComponent?.getName(),
          html: editor.getHtml({
            component: selectedComponent?.getMainComponent(),
          }),
          css: editor.getCss({
            component: selectedComponent?.getMainComponent(),
          }),
        }
        try {
          await configs.handleStore(assets, page)
        } catch (error) {
          console.error(error)
        }
      },
    })

    editor.on("load", async () => {
      try {
        const images = await configs.handleLoadAssetImages()
        editor.AssetManager.add(images)
      } catch (error) {
        console.error(error)
      }
    })

    editor.on("asset:remove", async (asset: Assets) => {
      const id = asset?.attributes?.id

      if (id) {
        try {
          await configs.handleRemoveAssetImage(id)
          editor.AssetManager.render()
        } catch (error) {
          console.log("ID not found", id)
          console.error(error)
        }
      }
    })

    editor.on(
      "canvas:drop",
      (_DataTransfer: DataTransfer, model: Component) => {
        dispatch({ type: ActivePanel.SELECTORS })
        editor.select(model)
      },
    )
    editor.on("component:selected", (model: Component) => {
      dispatch({ type: ActivePanel.SELECTORS })
      editor.select(model)
    })

    return customOnEditor(editor)
  }

  return (
    <TooltipProvider>
      <Toaster richColors />

      <GjsEditor
        className="gjs-custom-editor"
        // grapesjsCss={"/css/grapes.min.css"}
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.
        options={{ ...options(), ...optionsCustomize(editorRef) }}
        onEditor={gsOnEditor}
        waitReady={<FullSpinner />}
      >
        <TopArea />
        <SidebarProvider
          className={cn(
            "eg:max-h-[calc(100svh-40px)] eg:!min-h-[calc(100svh-40px)]",
          )}
        >
          <div
            className={cn(
              "eg:border-sidebar-border eg:bg-sidebar eg:text-sidebar-foreground eg:w-36 eg:md:w-48 eg:lg:w-52 eg:2xl:w-56",
              "eg:flex eg:flex-col eg:border-r",
            )}
          >
            <LeftArea />
          </div>
          <SidebarInset
            className={cn(
              "eg:max-h-[calc(100svh-40px)] eg:!min-h-[calc(100svh-40px)] eg:bg-slate-100 eg:p-2",
            )}
          >
            <Canvas className="eg:border-transparent" />
          </SidebarInset>
          <div
            className={cn(
              "eg:border-sidebar-border eg:bg-sidebar eg:text-sidebar-foreground eg:w-36 eg:md:w-48 eg:lg:w-52 eg:2xl:w-56",
              "eg:border-l",
            )}
          >
            <WithEditor>
              <RightArea />
            </WithEditor>
          </div>
        </SidebarProvider>
      </GjsEditor>
    </TooltipProvider>
  )
}

export default EdustGrapesjs
