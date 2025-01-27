import {
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui"
import { Editor } from "@edust/grapesjs"
import { useEditor } from "@grapesjs/react"
import { useState } from "react"

export const View = () => {
  const editor: Editor = useEditor()
  const { Commands } = editor

  const [activeLists, setActiveLists] = useState({
    hasOutline: Commands.isActive("core:component-outline"),
  })

  const handleFullscreen = () => {
    const id = "core:component-outline"

    setActiveLists((prev) => {
      let hasOutline = false
      if (Commands.isActive(id)) {
        Commands.stop(id)
        hasOutline = false
      } else {
        Commands.run(id)
        hasOutline = true
      }

      return {
        ...prev,
        hasOutline,
      }
    })
  }

  return (
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem
          checked={activeLists.hasOutline}
          onClick={handleFullscreen}
        >
          Outline
        </MenubarCheckboxItem>
        {/* <MenubarCheckboxItem
          checked={Commands.isActive("core:fullscreen")}
          onClick={() => Commands.run("core:fullscreen", { target: "#root" })}
        >
          Full Screen <MenubarShortcut>F11</MenubarShortcut>
        </MenubarCheckboxItem> */}
        {/* <MenubarSeparator />
        <MenubarItem inset disabled>
          Show Status Bar
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset>Hide Sidebar</MenubarItem>
        <MenubarItem disabled inset>
          Enter Full Screen
        </MenubarItem> */}
      </MenubarContent>
    </MenubarMenu>
  )
}
