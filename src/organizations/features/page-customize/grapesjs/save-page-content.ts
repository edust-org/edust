import { Editor } from "grapesjs";

export default async (editor: Editor, pageId: string) => {
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
