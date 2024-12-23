import { useEditor } from "@grapesjs/react"
import {
  CodeXml,
  FileArchive,
  Fullscreen,
  Redo2,
  Trash,
  Undo2,
} from "lucide-react"
import { Button, ToggleGroup, ToggleGroupItem } from "@/components/ui"
import { useEffect, useMemo, useState } from "react"

import { FaCode, FaRedo, FaSave, FaUndo } from "react-icons/fa"
import { MdBorderClear, MdDelete } from "react-icons/md"
import { PiExportBold } from "react-icons/pi"
import { SlSizeFullscreen } from "react-icons/sl"

export const RightButtons = () => {
  const editor = useEditor()
  const [, setUpdateCounter] = useState(0)
  const { UndoManager: UndoRedoManager, Commands } = editor

  const cmdButtons = useMemo(
    () => [
      {
        id: "core:undo",
        icon: <Undo2 className="h-4 w-4" />,
        disabled: () => !UndoRedoManager.hasUndo(),
      },
      {
        id: "core:redo",
        icon: <Redo2 className="h-4 w-4" />,
        disabled: () => !UndoRedoManager.hasRedo(),
      },
      {
        id: "core:component-outline",
        icon: <MdBorderClear />,
      },
      {
        id: "core:fullscreen",
        icon: <SlSizeFullscreen />,
        options: { target: "#root" },
      },
      {
        id: "core:open-code",
        icon: <FaCode />,
      },
      {
        id: "core:canvas-clear",
        icon: <MdDelete />,
      },
      {
        id: "custom:grapesjs-plugin-export",
        icon: <PiExportBold />,
      },
      // {
      //   id: "save-db",
      //   icon: <FaSave />,
      // },
    ],
    [UndoRedoManager],
  )

  useEffect(() => {
    const cmdEvent = "run stop"
    const updateEvent = "update"
    const updateCounter = () => setUpdateCounter((value) => value + 1)
    const onCommand = (id: string) => {
      cmdButtons.find((btn) => btn.id === id) && updateCounter()
    }
    editor.on(cmdEvent, onCommand)
    editor.on(updateEvent, updateCounter)

    // Set 'core:component-outline' to true by default
    // Commands.run("core:component-outline")

    return () => {
      editor.off(cmdEvent, onCommand)
      editor.off(updateEvent, updateCounter)
    }
  }, [Commands, cmdButtons, editor])

  const handleButtons = ({ Commands, id, options }) => {
    if (id == "core:canvas-clear") {
      const isConfirm = confirm("Do you want do delete it?")

      if (!isConfirm) return
    }
    Commands.isActive(id) ? Commands.stop(id) : Commands.run(id, options)
  }

  return (
    <>
      <div
        className="panel__top flex items-center justify-end gap-2"
        id="panel-top"
      >
        {cmdButtons.map(({ id, icon, disabled, options = {} }) => (
          <Button
            key={id}
            type="button"
            variant={Commands.isActive(id) ? "default" : "ghost"}
            className={`h-9 px-2 text-lg`}
            onClick={() => handleButtons({ Commands, id, options })}
            disabled={disabled?.()}
          >
            {icon}
          </Button>
        ))}

        {/* <ToggleGroup type="multiple">
          <ToggleGroupItem
            size={"sm"}
            value="underline"
            aria-label="Toggle underline"
          >
            <Fullscreen className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            size={"sm"}
            value="underline"
            aria-label="Toggle underline"
          >
            <CodeXml className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            size={"sm"}
            value="underline"
            aria-label="Toggle underline"
          >
            <FileArchive className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            size={"sm"}
            value="underline"
            aria-label="Toggle underline"
          >
            <Trash className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem size={"sm"} value="bold" aria-label="Toggle bold">
            <Undo2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            size={"sm"}
            value="italic"
            aria-label="Toggle italic"
          >
            <Redo2 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup> */}
        <Button
          size={"sm"}
          onClick={() =>
            handleButtons({ Commands, id: "save-db", options: {} })
          }
        >
          Save
        </Button>
      </div>
    </>
  )
}
