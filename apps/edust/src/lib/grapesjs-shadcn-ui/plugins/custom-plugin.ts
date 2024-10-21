import { Editor } from "grapesjs";

export const customPlugin = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  // blockManager.add("custom-image", {
  //   label: "Image",
  //   category: "Custom",
  //   activate: true,
  //   content: {
  //     type: "image",
  //     name: "Image",
  //     alt: "Alternative Image Text",
  //     src: "",
  //   },
  // });

  // editor.DomComponents.addType("image", {
  //   model: {
  //     defaults: {
  //       traits: [
  //         {
  //           type: "text",
  //           label: "alt",
  //           name: "alt",
  //         },
  //         {
  //           type: "text",
  //           label: "title",
  //           name: "title",
  //         },
  //         {
  //           type: "text",
  //           label: "src",
  //           name: "src",
  //         },
  //       ],
  //     },
  //   },
  // });

  blockManager.add("custom-video", {
    label: "Video",
    category: "Custom",
    content: {
      type: "video",
      tagName: "video",
      attributes: {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        autoplay: false,
        loop: false,
        controls: true,
      },
      style: { width: "615px" },
      name: "Video",
    },
  });

  blockManager.add("custom-map", {
    label: "Map",
    category: "Custom",
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M19,17.54L16,18.55V6.86L19,5.7V17.54Z" />
    </svg>`,
    content: {
      type: "map",
      style: { height: "350px" },
    },
  });
};
