import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui"
import { useEditor } from "@/edust-grapesjs/_react-wrapper"
import { Editor } from "grapesjs"

import { useState } from "react"

export const Edit = () => {
  const editor: Editor = useEditor()
  const { UndoManager: UndoRedoManager, Commands } = editor

  const [activeLists, setActiveLists] = useState({
    hasUndo: UndoRedoManager.hasUndo(),
    hasRedo: UndoRedoManager.hasRedo(),
  })

  const handleUndo = () => {
    const id = "core:undo"

    setActiveLists((prev) => {
      let hasUndo = false

      if (Commands.isActive(id)) {
        Commands.stop(id)
        hasUndo = false
      } else {
        Commands.run(id)
        hasUndo = true
      }

      return {
        ...prev,
        hasUndo,
      }
    })
  }

  const handleRedo = () => {
    const id = "core:redo"

    setActiveLists((prev) => {
      let hasRedo = false

      if (Commands.isActive(id)) {
        Commands.stop(id)
        hasRedo = false
      } else {
        Commands.run(id)
        hasRedo = true
      }

      return {
        ...prev,
        hasRedo,
      }
    })
  }

  return (
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled={activeLists.hasUndo} onClick={handleUndo}>
          Undo <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled={activeLists.hasRedo} onClick={handleRedo}>
          Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
        </MenubarItem>
        {/* <MenubarSeparator />
        <MenubarItem disabled>
          Cut <MenubarShortcut>⌘X</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Copy <MenubarShortcut>⌘C</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Paste <MenubarShortcut>⌘V</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem disabled>
          Select All <MenubarShortcut>⌘A</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem disabled>
          Smart Dictation...{" "}
          <MenubarShortcut>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
              <circle cx="17" cy="7" r="5" />
            </svg>
          </MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Emoji & Symbols
          <MenubarShortcut>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </MenubarShortcut>
        </MenubarItem> */}
      </MenubarContent>
    </MenubarMenu>
  )
}
