import { Editor } from "grapesjs";
import appendTailwindCss from "./hooks/use-append-tailwindCss";

export default async (editor: Editor) => {
  {
    editor.Commands.add("save-db", {
      run: async () => {
        await editor.store();
      },
    });

    editor.Commands.add("custom:grapesjs-plugin-export", () => {
      return editor.runCommand("gjs-export-zip");
    });

    // Customize image default type
    editor.DomComponents.addType("image", {
      model: {
        defaults: {
          traits: [
            {
              type: "text",
              label: "alt",
              name: "alt",
            },
            {
              type: "text",
              label: "title",
              name: "title",
            },
            {
              type: "text",
              label: "src",
              name: "src",
            },
          ],
        },
      },
    });

    // Loaded TailwindCSS
    editor.Canvas.getModel()["on"]("change:frames", (_m, frames) => {
      frames.forEach((frame) =>
        frame.once("loaded", () => appendTailwindCss(frame))
      );
    });
  }
};
