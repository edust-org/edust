import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui"
import { BlocksResultProps, useEditor } from "@/edust-grapesjs/_react-wrapper"
import { ChevronRight } from "lucide-react"

import { FC } from "react"

export type BlockProps = Pick<
  BlocksResultProps,
  "mapCategoryBlocks" | "dragStart" | "dragStop"
>

export const Blocks: FC<BlockProps> = ({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}) => {
  const editor = useEditor()
  return (
    <div className="gjs-custom-block-manager">
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => {
        return (
          <SidebarGroup className="eg:py-0" key={category}>
            <Collapsible className="eg:group/collapsible">
              <SidebarGroupLabel
                asChild
                className="eg:group/label eg:w-full eg:text-sm eg:text-sidebar-foreground eg:hover:bg-sidebar-accent eg:hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {category}
                  <ChevronRight className="eg:ml-auto eg:transition-transform eg:group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="eg:grid eg:grid-cols-2 eg:gap-2 eg:p-2">
                    {blocks.map((block) => (
                      <SidebarMenuItem key={block.getId()}>
                        <SidebarMenuButton
                          draggable
                          className="eg:flex eg:min-h-20 eg:cursor-pointer eg:flex-col eg:items-center eg:gap-1 eg:rounded eg:border eg:border-slate-100 eg:bg-slate-50 eg:px-1 eg:py-2 eg:shadow eg:transition-colors eg:hover:bg-white"
                          onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                          onDragEnd={() => dragStop(false)}
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
                              "eg:min-h-10 eg:min-w-10"
                            } eg:max-h-18 eg:max-w-18 eg:flex eg:w-12 eg:items-center eg:justify-center eg:overflow-hidden eg:object-cover eg:p-2`}
                            dangerouslySetInnerHTML={{
                              __html: block.getMedia()!,
                            }}
                          />
                          {block?.getLabel() && (
                            <div className="eg:w-full eg:text-center eg:text-sm">
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
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )
      })}
    </div>
  )
}
