import { Editor } from "grapesjs";
import { eduCrafets001 } from "./001-edu-crafters";
import { eduEducation003 } from "./003-edu-education";
import { polyNova002 } from "./002-poly-nova";
import { studyNest004 } from "./004-study-nest";
import { eduford005 } from "./005-eduford";
import { lifeSchool006 } from "./006-lifeschool";

// Import your template and add here [t1, t2, t3, ...]
const items = [
  eduCrafets001,
  polyNova002,
  eduEducation003,
  studyNest004,
  eduford005,
  lifeSchool006,
];

export const templatesPlugins = (editor: Editor) => {
  const bm = editor.BlockManager;

  return items.map((item, index) => {
    bm.add(`templates-${item.id}-${index + 1}`, {
      category: "Templates",
      label: ``,
      content: item.content,
      media: `<img src="${item.thumbnail}" draggable="false" class="m-auto" />`,
    });
  });
};
