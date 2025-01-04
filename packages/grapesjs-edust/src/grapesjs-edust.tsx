import React, { useRef } from "react"
import { Toaster } from "sonner"
import grapesjs, { Editor } from "@edust/grapesjs"
import GjsEditor, { Canvas } from "@grapesjs/react"
import { RightPanel } from "./right-panel"
import options from "./options"
import { default as customOnEditor } from "./on-editor"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  ScrollBar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui"
import { LeftPanel } from "./left-panel"
import useWindowSize from "./hooks/use-window-resize"

import "./index.css"
// import grapesjs css
import "@edust/grapesjs/css/grapes.min.css"
import { TopArea } from "./top-area"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { cn } from "./utils"
import { Blocks, Check, ChevronRight, Paintbrush, Settings } from "lucide-react"
import { CounterApp } from "./counter-app"
import { ContextProviders } from "./context"
import { LeftArea } from "./left-area"

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
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
  {
    name: "Other",
    items: ["Travel", "Reminders", "Deadlines"],
  },
]
const GrapesjsEdust = (props) => {
  const { onEditor, optionsCustomize } = props
  const { width: windowWidth } = useWindowSize()
  const editorRef = useRef<Editor | null>(null)

  async function gsOnEditor(editor: Editor) {
    if (!editor) {
      console.error("Editor is not initialized")
      return
    }

    editorRef.current = editor

    await onEditor(editor)

    return customOnEditor(editor)
  }

  const sideAreaStyle =
    "bg-sidebar text-sidebar-foreground border-sidebar-border w-36 md:w-48 lg:w-52 2xl:w-56"

  const newOptions = { ...options(editorRef), ...optionsCustomize(editorRef) }
  console.log({
    options: options(editorRef),
    cop: optionsCustomize(editorRef),
    newOptions,
  })
  return (
    <ContextProviders>
      <TooltipProvider>
        {/* <CounterApp /> */}
        <Toaster richColors />

        <GjsEditor
          className="gjs-custom-editor"
          // Pass the core GrapesJS library to the wrapper (required).
          // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
          grapesjs={grapesjs}
          // Load the GrapesJS CSS file asynchronously from URL.
          // This is an optional prop, you can always import the CSS directly in your JS if you wish.
          options={newOptions}
          onEditor={gsOnEditor}
        >
          <TopArea />
          <SidebarProvider
            className={cn(
              "max-h-[calc(100svh-38px)] min-h-[calc(100svh-38px)]",
            )}
          >
            <div className={cn(sideAreaStyle, "flex flex-col border-r")}>
              <LeftArea />
            </div>
            <SidebarInset
              className={cn(
                "max-h-[calc(100svh-38px)] min-h-[calc(100svh-38px)] bg-slate-100 p-2",
              )}
            >
              <Canvas className="border-transparent" />
            </SidebarInset>
            <div className={cn(sideAreaStyle, "border-l")}>
              <Sidebar collapsible="none" className="w-full">
                <ScrollArea>
                  <SidebarContent>
                    <RightPanel />
                    <div className="flex items-center justify-center bg-white">
                      <div className="flex h-7 w-full items-center gap-1.5 border p-[2px] shadow-none">
                        <ToggleGroup
                          type="single"
                          className="w-full justify-between"
                        >
                          <ToggleGroupItem
                            value="30"
                            className="h-[22px] w-[22px] rounded-sm p-0"
                            title="Mobile"
                          >
                            <Paintbrush className="h-3.5 w-3.5" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="100"
                            className="h-[22px] w-[22px] rounded-sm p-0"
                            title="Desktop"
                          >
                            <Settings className="h-3.5 w-3.5" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="60"
                            className="h-[22px] w-[22px] rounded-sm p-0"
                            title="Tablet"
                          >
                            <Blocks className="h-3.5 w-3.5" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>
                    {calendars.map((calendar, index) => (
                      <React.Fragment key={calendar.name}>
                        <SidebarGroup key={calendar.name} className="py-0">
                          <Collapsible
                            defaultOpen={index === 0}
                            className="group/collapsible"
                          >
                            <SidebarGroupLabel
                              asChild
                              className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                              <CollapsibleTrigger>
                                {calendar.name}{" "}
                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
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
                                          className="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                                        >
                                          <Check className="hidden size-3 group-data-[active=true]/calendar-item:block" />
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
                        <SidebarSeparator className="mx-0" />
                      </React.Fragment>
                    ))}
                  </SidebarContent>
                </ScrollArea>
              </Sidebar>
            </div>
          </SidebarProvider>
        </GjsEditor>
      </TooltipProvider>
    </ContextProviders>
  )
}
export default GrapesjsEdust
