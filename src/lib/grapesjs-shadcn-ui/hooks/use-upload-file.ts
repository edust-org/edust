const uploadFile = (e: any, editorRef: any) => {
  const files = e.dataTransfer ? e.dataTransfer.files : e.target?.files;
  const formData = new FormData();
  formData.append("image", files[0]);

  fetch("http://localhost:3000/api/v0/upload-images", {
    method: "POST",
    body: formData,
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const image_path = data?.data?.image_path;
      console.log(image_path);
      if (image_path) {
        const editor = editorRef?.current;

        if (editor) {
          const assetManager = editor?.AssetManager;
          assetManager.add([image_path]);
          assetManager.render();
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default uploadFile;
