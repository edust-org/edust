import { Editor } from "@edust/grapesjs"

export default async (editor: Editor) => {
  {
    editor.Commands.add("custom:grapesjs-plugin-export", () => {
      return editor.runCommand("gjs-export-zip")
    })

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
    })
  }
}
