import { Editor } from "grapesjs";

/**
 * @param editor
 *
 * Category: Typography
 *
 * Items:
 *   - Heading 1
 *   - Heading 2
 *   - Heading 3
 *   - Heading 4
 *   - Heading 5
 *   - Heading 6
 *   - Paragraph
 *   - Blockquote
 */

export const typographyPlugin = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  // Heading 1
  blockManager.add("typography-h1", {
    label: "Heading 1",
    category: "Typography",
    activate: true,
    content: {
      tagName: "h1",
      type: "text",
      name: "H1",
      attributes: {
        class: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      },
      content: "This is a Heading 1",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>',
  });

  // Heading 2
  blockManager.add("typography-h2", {
    label: "Heading 2",
    category: "Typography",
    activate: true,
    content: {
      tagName: "h2",
      type: "text",
      name: "H2",
      attributes: {
        class:
          "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      },
      content: "This is a Heading 2",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>',
  });

  // Heading 3
  blockManager.add("typography-h3", {
    label: "Heading 3",
    category: "Typography",
    activate: true,
    content: {
      tagName: "h3",
      type: "text",
      name: "H3",
      attributes: {
        class: "scroll-m-20 text-2xl font-semibold tracking-tight",
      },
      content: "This is a Heading 3",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>',
  });

  // Heading 4
  blockManager.add("typography-h4", {
    label: "Heading 4",
    category: "Typography",
    activate: true,
    content: {
      tagName: "h4",
      type: "text",
      name: "H4",
      attributes: {
        class: "scroll-m-20 text-xl font-semibold tracking-tight",
      },
      content: "This is a Heading 4",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>',
  });

  // Heading 5
  blockManager.add("typography-h5", {
    label: "Heading 5",
    category: "Typography",
    activate: true,
    content: {
      tagName: "h5",
      type: "text",
      name: "H5",
      attributes: {
        class: "scroll-m-20 text-lg font-semibold tracking-tight",
      },
      content: "This is a Heading 5",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>',
  });

  // Heading 6
  blockManager.add("typography-h6", {
    label: "Heading 6",
    category: "Typography",
    activate: true,
    content: {
      tagName: "h6",
      type: "text",
      name: "H6",
      attributes: {
        class: "scroll-m-20 text-base font-semibold tracking-tight",
      },
      content: "This is a Heading 6",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"></path></svg>',
  });

  // Paragraph
  blockManager.add("typography-p", {
    label: "Paragraph",
    category: "Typography",
    activate: true,
    content: {
      tagName: "p",
      type: "text",
      name: "Paragraph",
      attributes: {
        class: "leading-7 [&:not(:first-child)]:mt-6",
      },
      content: "This is a paragraph.",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 48v32a16 16 0 0 1-16 16h-48v368a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V96h-32v368a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V352h-32a160 160 0 0 1 0-320h240a16 16 0 0 1 16 16z"></path></svg>',
  });

  // Blockquote
  blockManager.add("typography-blockquote", {
    label: "Blockquote",
    category: "Typography",
    activate: true,
    content: {
      tagName: "blockquote",
      type: "text",
      name: "Blockquote",
      attributes: {
        class: "mt-6 border-l-2 pl-6 italic",
      },
      content: "This is a Blockquote.",
      editable: true,
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>',
  });
};
