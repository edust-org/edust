import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginNewsLetter from "grapesjs-preset-newsletter";
import { useRef } from "react";
import uploadImage from "./upload-image";
import { useEditPageByIdMutation } from "@/app/api/v0/organizations";
import { toast } from "@/hooks/shadcn-ui";

export const GrapesJs = ({
  pageId,
  content,
}: {
  pageId: string | null;
  content: string;
}) => {
  const [editPage] = useEditPageByIdMutation();
  const editorRef = useRef<Editor | null>(null); // Create a ref to store the editor instance

  const onEditor = async (editor: Editor) => {
    // Must add this reference
    editorRef.current = editor;

    // Fetch the page content on load
    const data = JSON.parse(content);
    editor.setComponents(data.html);
    editor.setStyle(data.css);

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
        const content = JSON.stringify({
          html: editor.getHtml(),
          css: editor.getCss(),
        });

        editPage({ pageId, content })
          .unwrap()
          .then((res) => {
            if (res?.status) {
              toast({
                variant: "success",
                title: res?.message,
              });
            }
          })
          .catch((error) => {
            if (error?.data?.status) {
              toast({
                variant: "destructive",
                title: error?.data?.message,
              });
            }
          });
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
        // grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css" // css cdn
        grapesjsCss="/public//css/grapes.min.css?v=0.1.0" // css downloaded
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
