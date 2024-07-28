import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginNewsLetter from "grapesjs-preset-newsletter";
import { useRef } from "react";
import fetchPageContent from "./fetch-page-content";
import savePageContent from "./save-page-content";
import uploadImage from "./upload-image";

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
        // grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        grapesjsCss="/public/css/grapes.min.css"
        // GrapesJS init options
        options={{
          height: "100vh",
          storageManager: false,
          assetManager: {
            autoAdd: true,
            upload: "http://localhost:3001/api/v0/upload-image",
            uploadName: "file",
            uploadFile: (e) => uploadImage(e, editorRef.current),
          },
        }}
        onEditor={onEditor}
        plugins={[gsPluginBlocksBasic, gsPluginNewsLetter]}
      />
    </>
  );
};
