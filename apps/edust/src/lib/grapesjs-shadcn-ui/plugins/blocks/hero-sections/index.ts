import { Editor } from "grapesjs";
import { hero1 } from "./hero-1";
import { hero2 } from "./hero-2";

// Add your new items
const items = [hero1, hero2];

export const heroSections = (editor: Editor) => {
  const bm = editor.BlockManager;

  return items.map((item, index) => {
    bm.add(`hero-sections-${index + 1}`, {
      category: "Hero Sections",
      label: ``,
      content: item.content,
      media: `<img src="${item.thumbnail}" draggable="false"/>`,
    });
  });
};
