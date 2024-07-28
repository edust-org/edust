import axios from "axios";
import { Editor } from "grapesjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (e: any, editor: Editor | null) => {
  const files = e.dataTransfer ? e.dataTransfer.files : e.target?.files;
  const formData = new FormData();
  formData.append("file", files[0]);

  console.log({
    formData,
    f: files[0],
  });

  try {
    const data = await axios.post(
      "http://localhost:3001/api/v0/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Add uploaded image to the asset manager
    if (editor) {
      const assetManager = editor.AssetManager;
      assetManager.add([data.data.imageUrl]);
      assetManager.render();
    }
  } catch (err) {
    console.error("Upload failed:", err);
  }
};
