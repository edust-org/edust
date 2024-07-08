import grapesjs, { Editor } from "grapesjs";
import GjsEditor from "@grapesjs/react";

import gsPluginBlocksBasic from "grapesjs-blocks-basic";
import gsPluginNewsLetter from "grapesjs-preset-newsletter";

export const GrapesJs = ({ pageId }) => {
  const onEditor = async (editor: Editor) => {
    console.log("Editor loaded", { editor });

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
          console.log(data);
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
        }}
        onEditor={onEditor}
        plugins={[gsPluginBlocksBasic, gsPluginNewsLetter]}
      />
    </>
  );
};
