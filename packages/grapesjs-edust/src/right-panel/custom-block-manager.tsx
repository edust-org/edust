import { BlocksResultProps, useEditor } from "@grapesjs/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui"

export type CustomBlockManagerProps = Pick<
  BlocksResultProps,
  "mapCategoryBlocks" | "dragStart" | "dragStop"
>

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlockManagerProps) {
  const editor = useEditor()
  return (
    <div className="gjs-custom-block-manager eg-text-left">
      <Accordion
        type="multiple"
        className="eg-w-full eg-pb-12"
        defaultValue={["Basic"]}
      >
        {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="eg-bg-slate-100 eg-px-2 eg-py-2 hover:eg-no-underline">
              {category}
            </AccordionTrigger>
            <AccordionContent className="eg-bg-white eg-pb-0">
              <div className="eg-grid eg-grid-cols-2 eg-gap-2 eg-p-2">
                {blocks.map((block) => (
                  <div
                    key={block.getId()}
                    draggable
                    className={
                      "eg-flex eg-min-h-20 eg-cursor-pointer eg-flex-col eg-items-center eg-gap-1 eg-rounded eg-border eg-border-slate-100 eg-bg-slate-50 eg-px-1 eg-py-2 eg-shadow eg-transition-colors hover:eg-bg-white"
                    }
                    onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                    onDragEnd={() => dragStop(false)}
                    // Click able block add
                    onClick={() => {
                      const selected = editor.getSelected()

                      const content = block.get("content")
                      if (selected) {
                        if (content) {
                          selected.append(content)
                        }
                      } else {
                        if (content) {
                          editor?.getWrapper()?.append(content)
                        }
                      }
                    }}
                  >
                    <div
                      className={`${
                        !block.getLabel().includes("<svg") &&
                        "eg-min-h-10 eg-min-w-10"
                      } eg-max-h-18 eg-max-w-18 eg-flex eg-w-12 eg-items-center eg-justify-center eg-overflow-hidden eg-object-cover eg-p-2`}
                      dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                    />
                    {block?.getLabel() && (
                      <div className="eg-w-full eg-text-center eg-text-sm">
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
  )
}
