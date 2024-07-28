import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";

import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginNewsLetter from "grapesjs-preset-newsletter";
import axios from "axios";
import { useRef } from "react";

export const GrapesJs = ({ pageId }) => {
  const editorRef = useRef<Editor | null>(null); // Create a ref to store the editor instance

  const onEditor = async (editor: Editor) => {
    // Fetch the saved page content from the backend
    const fetchPageContent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/organization_page/${pageId}`
        ); // Replace with your page ID
        const data = await response.json();
        if (data.html && data.css) {
          editor.setComponents(data.html);
          editor.setStyle(data.css);
        }
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    // Save the customized page
    const savePageContent = async () => {
      const html = editor.getHtml();
      const css = editor.getCss();
      const payload = { organization_id: "1", html, css };

      try {
        const response = await fetch(
          `http://localhost:3000/organization_page/${pageId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save page content");
        }

        console.log("Page content saved successfully");
      } catch (error) {
        console.error("Error saving page content:", error);
      }
    };

    // Fetch the page content on load
    await fetchPageContent();

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
        await savePageContent();
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

              console.log({
                formData,
                f: files[0],
              });
              axios
                .post("http://localhost:3001/api/v0/upload-image", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((data) => {
                  // Add uploaded image to the asset manager
                  if (editorRef.current) {
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
