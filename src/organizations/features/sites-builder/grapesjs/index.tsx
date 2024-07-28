import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";

import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginNewsLetter from "grapesjs-preset-newsletter";
import axios from "axios";
import { useRef } from "react";
import fetchPageContent from "./fetch-page-content";
import savePageContent from "./save-page-content";

export const GrapesJs = ({ pageId }: { pageId: string }) => {
  const editorRef = useRef<Editor | null>(null); // Create a ref to store the editor instance

  const onEditor = async (editor: Editor) => {
    // Fetch the page content on load
    await fetchPageContent(editor, pageId);

    // Add a save button to the editor
    editor.Panels.addButton("options", {
      id: "save-db",
      className: "fa fa-floppy-o",
      command: "save-db",
      attributes: { title: "Save" },
    });

    // Define the save command
    editor.Commands.add("save-db", {
      run: async () => {
        await savePageContent(editor, pageId);
        alert("Page saved successfully!");
      },
    });
  };

  return (
    <>
      <GjsEditor
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        // GrapesJS init options
        options={{
          height: "100vh",
          storageManager: false,
          assetManager: {
            autoAdd: true,
            upload: "http://localhost:3001/api/v0/upload-image",
            uploadName: "file",
            uploadFile: (e) => {
              const files = e.dataTransfer
                ? e.dataTransfer.files
                : e.target?.files;
              const formData = new FormData();
              formData.append("file", files[0]);

              axios
                .post("http://localhost:3001/api/v0/upload-image", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((data) => {
                  // Add uploaded image to the asset manager
                  if (editorRef.current) {
                    console.log(data.data.imageUrl);
                    const assetManager = editorRef.current.AssetManager;
                    assetManager.add([data.data.imageUrl]);
                    assetManager.render();
                  }
                })
                .catch((err) => console.error("Upload failed:", err));
            },
          },
        }}
        onEditor={onEditor}
        plugins={[gsPluginBlocksBasic, gsPluginNewsLetter]}
      />
    </>
  );
};
