import { Editor } from "grapesjs";

export default async (editor: Editor, pageId: string) => {
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
