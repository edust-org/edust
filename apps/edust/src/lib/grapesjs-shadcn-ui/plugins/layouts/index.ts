import { Editor } from "grapesjs";

/**
 * @param editor
 *
 * Category: Layout
 *
 * Items:
 *   - Section
 *   - Container
 *   - Col-1
 *   - Col-2
 *   - Col-3
 *   - Col-4
 *   - Div
 */

export const layoutPlugin = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  // Section
  blockManager.add("layout-section", {
    label: "Section",
    category: "Layout",
    activate: true,
    content: {
      tagName: "section",
      name: "Section",
      attributes: { class: "w-full px-4 min-h-12" },
    },
    media: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12.5" y="21" width="175" height="94" stroke="#0F172A" stroke-width="9"/>
<rect x="12" y="131.5" width="176" height="48" stroke="#0F172A" stroke-width="8"/>
</svg>
`,
  });

  // Container
  blockManager.add("layout-container", {
    label: "Container",
    category: "Layout",
    activate: true,
    content: {
      tagName: "div",
      name: "Container",
      attributes: { class: "container mx-auto px-4 min-h-12" },
    },
    media: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12" y="44.5" width="176" height="111" stroke="#0F172A" stroke-width="8"/>
</svg>
`,
  });

  // Col-1
  blockManager.add("layout-col-1", {
    label: "Col 1",
    category: "Layout",
    activate: true,
    content: {
      tagName: "div",
      name: "Col 1",
      components: [
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
      ],
      attributes: { class: "grid gap-4 grid-cols-1" },
    },
    media: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="58" y="12" width="84" height="176" stroke="#0F172A" stroke-width="8"/>
</svg>`,
  });

  // Col-2
  blockManager.add("layout-col-2", {
    label: "Col 2",
    category: "Layout",
    activate: true,
    content: {
      tagName: "div",
      name: "Col 2",
      components: [
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
      ],
      attributes: { class: "grid gap-4 grid-cols-1 md:grid-cols-2" },
    },
    media: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12" y="12" width="80" height="176" stroke="#0F172A" stroke-width="8"/>
<rect x="108" y="12" width="80" height="176" stroke="#0F172A" stroke-width="8"/>
</svg>
`,
  });

  // Col-3
  blockManager.add("layout-col-3", {
    label: "Col 3",
    category: "Layout",
    activate: true,
    content: {
      tagName: "div",
      name: "Col 3",
      components: [
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
      ],
      attributes: {
        class: "grid gap-4 grid-cols-1 md:grid-cols-3",
      },
    },
    media: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12" y="12" width="48" height="176" stroke="#0F172A" stroke-width="8"/>
<rect x="76" y="12" width="48" height="176" stroke="#0F172A" stroke-width="8"/>
<rect x="140" y="12" width="48" height="176" stroke="#0F172A" stroke-width="8"/>
</svg>
`,
  });

  // Col-4
  blockManager.add("layout-col-4", {
    label: "Col 4",
    category: "Layout",
    activate: true,
    content: {
      tagName: "div",
      name: "Col 4",
      components: [
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
        {
          tagName: "div",
          attributes: { class: "min-h-12" },
        },
      ],
      attributes: {
        class: "grid gap-4 grid-cols-1 md:grid-cols-4",
      },
    },
    media: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12" y="12" width="32" height="176" stroke="#0F172A" stroke-width="8"/>
<rect x="60" y="12" width="32" height="176" stroke="#0F172A" stroke-width="8"/>
<rect x="108" y="12" width="32" height="176" stroke="#0F172A" stroke-width="8"/>
<rect x="156" y="12" width="32" height="176" stroke="#0F172A" stroke-width="8"/>
</svg>
`,
  });

  // Div
  blockManager.add("layout-div", {
    label: "Div",
    category: "Layout",
    activate: true,
    content: {
      tagName: "div",
      name: "Div",
      attributes: { class: "min-h-12" },
    },
    media: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 17 17" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><g></g><path d="M1 0h3v17h-3v-17zM5 17h3v-17h-3v17zM9 17h3v-17h-3v17zM13 0v17h3v-17h-3z"></path></svg>`,
  });
};
