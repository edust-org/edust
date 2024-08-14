import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginNewsLetter from "grapesjs-preset-newsletter";
import { useEffect, useRef, useState } from "react";
import {
  useEditPageByIdMutation,
  useGetAllImagesQuery,
  usePostImagesMutation,
} from "@/app/api/v0/organizations";
import { toast } from "@/hooks/shadcn-ui";

import gsPluginTailwind from "grapesjs-tailwind";

export const GrapesJs = ({
  pageId,
  content,
}: {
  pageId: string | null;
  content: string;
}) => {
  const [editPage] = useEditPageByIdMutation();
  const [uploadImages] = usePostImagesMutation();
  const { data: loadedImages } = useGetAllImagesQuery();
  const editorRef = useRef<Editor | null>(null); // Create a ref to store the editor instance

  const onEditor = async (editor: Editor) => {
    console.log(editor.getWrapper()?.head.toHTML());
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

  // Load uploaded images
  useEffect(() => {
    if (loadedImages?.data) {
      const images = loadedImages?.data?.reduce((acc, curr) => {
        acc.push(
          `${import.meta.env.VITE_BACKEND_URL}/images/sites/${curr.image_path}`
        );
        return acc;
      }, []);

      if (images.length > 0) {
        const editor = editorRef.current;

        const assetManager = editor?.AssetManager;
        assetManager?.add(images);
        assetManager?.render();
      }
    }
  }, [loadedImages?.data]);
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
            upload:
              "http://localhost:3000/api/v0/organizations/sites/pages/upload-images",
            uploadName: "file",
            uploadFile: (e: any) => {
              const files = e.dataTransfer
                ? e.dataTransfer.files
                : e.target?.files;
              const formData = new FormData();
              formData.append("image", files[0]);
              uploadImages(formData)
                .unwrap()
                .then((res) => {
                  const image_path = res?.data?.image_path;

                  if (image_path) {
                    const editor = editorRef.current;

                    if (editor) {
                      const assetManager = editor?.AssetManager;
                      assetManager.add([
                        image_path,
                        "http://localhost:3000/images/sites/2024-08-1022-46-1723611861759.png",
                      ]);
                      assetManager.render();
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            },
          },
        }}
        onEditor={onEditor}
        plugins={[gsPluginBlocksBasic, gsPluginNewsLetter, gsPluginTailwind]}
      />
    </>
  );
};
