import { Editor } from "grapesjs";
import appendTailwindCss from "./hooks/use-append-tailwindCss";

export default async (editor: Editor) => {
  {
    editor.Commands.add("save-db", {
      run: async () => {
        const content = JSON.stringify({
          html: editor.getHtml(),
          css: editor.getCss(),
        });
        console.log(content);
      },
    });

    editor.Commands.add("custom:grapesjs-plugin-export", () => {
      return editor.runCommand("gjs-export-zip");
    });

    /*
    editor.on("component:add", (e) => {
      console.log("component:add");
    });
    editor.on("component:remove", (e) => {
      console.log("component:remove");
    });
    editor.on("component:update", (e) => {
      console.log("component:update");
    });
    editor.on("style:update", (e) => {
      console.log("style:update");
    });
    editor.on("component:change", (e) => {
      console.log("component:change");
    });
    */
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
