import React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ScrollArea,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui"
import {
  Blocks as BlocksIcon,
  Check,
  ChevronRight,
  Paintbrush,
  Settings,
} from "lucide-react"
import { RightPanel } from "../right-panel"
import { useRightPanelContext } from "@/context/right-panel"
import { ActivePanel } from "@/types"
import { Blocks } from "./blocks"
import { BlocksProvider } from "@grapesjs/react"
const calendars = [
  {
    name: "My Calendars",
    items: ["Personal", "Work", "Family"],
  },
  {
    name: "Favorites",
    items: ["Holidays", "Birthdays"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
]
export const RightArea = () => {
  const { state, dispatch } = useRightPanelContext()
  return (
    <>
      <Sidebar collapsible="none" className="eg-w-full">
        <ScrollArea>
          <SidebarContent>
            <RightPanel />
            <div className="eg-flex eg-items-center eg-justify-center eg-bg-white">
              <div className="eg-flex eg-h-7 eg-w-full eg-items-center eg-gap-1.5 eg-border eg-p-[2px] eg-shadow-none">
                <ToggleGroup
                  defaultValue={state.activePanel}
                  type="single"
                  className="eg-w-full eg-justify-between"
                >
                  <ToggleGroupItem
                    value={ActivePanel.SELECTORS}
                    className="eg-h-[22px] eg-w-[22px] eg-rounded-sm eg-p-0"
                    onClick={() => dispatch({ type: ActivePanel.SELECTORS })}
                  >
                    <Paintbrush className="eg-h-3.5 eg-w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value={ActivePanel.TRAITS}
                    className="eg-h-[22px] eg-w-[22px] eg-rounded-sm eg-p-0"
                    onClick={() => dispatch({ type: ActivePanel.TRAITS })}
                  >
                    <Settings className="eg-h-3.5 eg-w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value={ActivePanel.BLOCKS}
                    className="eg-h-[22px] eg-w-[22px] eg-rounded-sm eg-p-0"
                    onClick={() => dispatch({ type: ActivePanel.BLOCKS })}
                  >
                    <BlocksIcon className="eg-h-3.5 eg-w-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {state.activePanel === ActivePanel.SELECTORS && <>SELECTORS</>}
            {state.activePanel === ActivePanel.TRAITS && <>TRAITS</>}
            {state.activePanel === ActivePanel.BLOCKS && (
              <BlocksProvider>
                {(props) => <Blocks {...props} />}
              </BlocksProvider>
            )}

            {calendars.map((calendar, index) => (
              <React.Fragment key={calendar.name}>
                <SidebarGroup key={calendar.name} className="eg-py-0">
                  <Collapsible
                    defaultOpen={index === 0}
                    className="eg-group/collapsible"
                  >
                    <SidebarGroupLabel
                      asChild
                      className="eg-group/label eg-w-full eg-text-sm eg-text-sidebar-foreground hover:eg-bg-sidebar-accent hover:eg-text-sidebar-accent-foreground"
                    >
                      <CollapsibleTrigger>
                        {calendar.name}
                        <ChevronRight className="eg-ml-auto eg-transition-transform group-data-[state=open]/collapsible:eg-rotate-90" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {calendar.items.map((item, index) => (
                            <SidebarMenuItem key={item}>
                              <SidebarMenuButton>
                                <div
                                  data-active={index < 2}
                                  className="eg-group/calendar-item eg-flex eg-aspect-square eg-size-4 eg-shrink-0 eg-items-center eg-justify-center eg-rounded-sm eg-border eg-border-sidebar-border eg-text-sidebar-primary-foreground data-[active=true]:eg-border-sidebar-primary data-[active=true]:eg-bg-sidebar-primary"
                                >
                                  <Check className="eg-hidden eg-size-3 group-data-[active=true]/calendar-item:eg-block" />
                                </div>
                                {item}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroup>
                <SidebarSeparator className="eg-mx-0" />
              </React.Fragment>
            ))}
          </SidebarContent>
        </ScrollArea>
      </Sidebar>
    </>
  )
}
