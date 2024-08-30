import { useEffect, useMemo, useState } from "react";
import { useEditor } from "@grapesjs/react";
import { SlSizeFullscreen } from "react-icons/sl";
import { Button } from "@/components/ui";
import { FaCode, FaRedo, FaSave, FaUndo } from "react-icons/fa";
import { MdBorderClear, MdDelete } from "react-icons/md";
import { PiExportBold } from "react-icons/pi";

export const RightButtons = () => {
  const editor = useEditor();
  const [, setUpdateCounter] = useState(0);
  const { UndoManager, Commands } = editor;

  const cmdButtons = useMemo(
    () => [
      {
        id: "core:redo",
        icon: <FaRedo />,
        disabled: () => !UndoManager.hasRedo(),
      },
      {
        id: "core:undo",
        icon: <FaUndo />,
        disabled: () => !UndoManager.hasUndo(),
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
      {
        id: "save-db",
        icon: <FaSave />,
      },
    ],
    [UndoManager],
  );

  useEffect(() => {
    const cmdEvent = "run stop";
    const updateEvent = "update";
    const updateCounter = () => setUpdateCounter((value) => value + 1);
    const onCommand = (id: string) => {
      cmdButtons.find((btn) => btn.id === id) && updateCounter();
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    // Set 'core:component-outline' to true by default
    Commands.run("core:component-outline");

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  }, [Commands, cmdButtons, editor]);

  const handleButtons = ({ Commands, id, options }) => {
    if (id == "core:canvas-clear") {
      const isConfirm = confirm("Do you want do delete it?");

      if (!isConfirm) return;
    }
    Commands.isActive(id) ? Commands.stop(id) : Commands.run(id, options);
  };

  return (
    <>
      <div
        className="panel__top ml-auto flex flex-wrap gap-3 px-2"
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
      </div>
    </>
  );
};
