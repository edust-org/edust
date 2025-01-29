import { useEditor } from "@grapesjs/react"
import { Copy, Redo2, Undo2 } from "lucide-react"
import { Button, Input, Label } from "@/components/ui"
import { useEffect, useMemo, useState } from "react"

import { FaCode } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { PiExportBold } from "react-icons/pi"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Commands {
  isActive: (id: string) => boolean
  stop: (id: string) => void
  run: (id: string, options?: Record<string, unknown>) => void
}

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
      // disable for modal and top hidden menus
      // {
      //   id: "core:fullscreen",
      //   icon: <SlSizeFullscreen />,
      //   options: { target: "#root" },
      // },
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
      const cmdButton = cmdButtons.find((btn) => btn.id === id)
      if (cmdButton) updateCounter()
    }
    editor.on(cmdEvent, onCommand)
    editor.on(updateEvent, updateCounter)

    return () => {
      editor.off(cmdEvent, onCommand)
      editor.off(updateEvent, updateCounter)
    }
  }, [Commands, cmdButtons, editor])

  const handleButtons = ({
    Commands,
    id,
    options,
  }: {
    Commands: Commands
    id: string
    options: Record<string, unknown>
  }) => {
    if (id == "core:canvas-clear") {
      const isConfirm = confirm("Do you want do delete it?")

      if (!isConfirm) return
    }
    if (Commands.isActive(id)) {
      Commands.stop(id)
    } else {
      Commands.run(id, options)
    }
  }

  return (
    <>
      <div
        className="panel__top eg-flex eg-items-center eg-justify-end eg-gap-2"
        id="panel-top"
      >
        {cmdButtons.map(({ id, icon, disabled, options = {} }) => (
          <Button
            key={id}
            type="button"
            size={"sm"}
            variant={Commands.isActive(id) ? "default" : "ghost"}
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
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size={"sm"}>
              Share
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="eg-w-[450px]">
            <div className="eg-flex eg-flex-col eg-space-y-2 eg-text-center sm:eg-text-left">
              <h3 className="eg-text-lg eg-font-semibold">
                Share current page
              </h3>
              <p className="eg-text-sm eg-text-muted-foreground">
                Anyone who has this link will be able to view this page.
              </p>
            </div>
            <div className="eg-flex eg-items-center eg-space-x-2 eg-pt-4">
              <div className="eg-grid eg-flex-1 eg-gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  defaultValue="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
                  readOnly
                  className="eg-h-9"
                />
              </div>
              <Button type="submit" size="sm" className="eg-px-3">
                <span className="sr-only">Copy</span>
                <Copy />
              </Button>
            </div>
          </PopoverContent>
        </Popover> */}

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
