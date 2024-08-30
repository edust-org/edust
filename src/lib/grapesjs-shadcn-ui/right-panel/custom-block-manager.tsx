import { BlocksResultProps, useEditor } from "@grapesjs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";

export type CustomBlockManagerProps = Pick<
  BlocksResultProps,
  "mapCategoryBlocks" | "dragStart" | "dragStop"
>;

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlockManagerProps) {
  const editor = useEditor();
  return (
    <div className="gjs-custom-block-manager text-left">
      <Accordion
        type="multiple"
        className="w-full pb-12"
        defaultValue={["Basic"]}
      >
        {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="bg-slate-100 px-2 py-2 hover:no-underline">
              {category}
            </AccordionTrigger>
            <AccordionContent className="bg-white pb-0">
              <div className="grid grid-cols-2 gap-2 p-2">
                {blocks.map((block) => (
                  <div
                    key={block.getId()}
                    draggable
                    className={
                      "flex min-h-20 cursor-pointer flex-col items-center gap-1 rounded border border-slate-100 bg-slate-50 px-1 py-2 shadow transition-colors hover:bg-white"
                    }
                    onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                    onDragEnd={() => dragStop(false)}
                    // Click able block add
                    onClick={() => {
                      const selected = editor.getSelected();

                      const content = block.get("content");
                      if (selected) {
                        if (content) {
                          selected.append(content);
                        }
                      } else {
                        if (content) {
                          editor?.getWrapper()?.append(content);
                        }
                      }
                    }}
                  >
                    <div
                      className={`${
                        !block.getLabel().includes("<svg") &&
                        "min-h-10 min-w-10"
                      } flex max-h-40 w-full max-w-40 items-center justify-center overflow-hidden object-cover p-2`}
                      dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                    />
                    {block?.getLabel() && (
                      <div className="w-full text-center text-sm">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: block.getLabel().includes("<svg ")
                              ? block.getLabel()
                              : "",
                          }}
                        />
                        {!block.getLabel().includes("<svg ") &&
                          block.getLabel()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
