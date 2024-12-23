import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui"
import { cn } from "@/utils"
import type { Component } from "@edust/grapesjs"
import { useEditor } from "@grapesjs/react"
import { ChevronRight, Eye, EyeClosed } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

export declare interface LayerItemProps
  extends React.HTMLProps<HTMLDivElement> {
  component: Component
  level: number
  draggingCmp?: Component
  dragParent?: Component
}

const itemStyle = { maxWidth: `100%` }
export const LayerItem = ({
  component,
  draggingCmp,
  dragParent,
  ...props
}: LayerItemProps) => {
  const editor = useEditor()
  const { Layers } = editor
  const layerRef = useRef<HTMLDivElement>(null)
  const [layerData, setLayerData] = useState(Layers.getLayerData(component))
  const { open, selected, hovered, components, visible, name } = layerData
  const componentsIds = components.map((cmp) => cmp.getId())
  const isDragging = draggingCmp === component
  const cmpHash = componentsIds.join("-")
  const level = props.level + 1
  const isHovered = hovered || dragParent === component

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component))
    if (layerRef.current) {
      ;(layerRef.current as any).__cmp = component
    }
  }, [Layers, component, level])

  useEffect(() => {
    const up = (cmp: Component) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp))
    }
    const ev = Layers.events.component
    editor.on(ev, up)

    return () => {
      editor.off(ev, up)
    }
  }, [editor, Layers, component])

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <CollapsibleContent key={cmp.getId()}>
        <SidebarMenuSub>
          <LayerItem
            component={cmp}
            level={level}
            draggingCmp={draggingCmp}
            dragParent={dragParent}
          />
        </SidebarMenuSub>
      </CollapsibleContent>
    ))
  }, [components, level, draggingCmp, dragParent])

  const toggleOpen = (ev: MouseEvent) => {
    ev.stopPropagation()
    Layers.setLayerData(component, { open: !open })
  }

  const toggleVisibility = (ev: MouseEvent) => {
    ev.stopPropagation()
    Layers.setLayerData(component, { visible: !visible })
  }

  const select = (event: MouseEvent) => {
    event.stopPropagation()
    Layers.setLayerData(component, { selected: true }, { event })
  }

  const hover = (hovered: boolean) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered })
    }
  }

  const wrapperCls = `layer-item flex flex-col ${
    selected ? "bg-slate-100" : ""
  } ${!visible || isDragging ? "opacity-50" : ""}`

  return (
    <SidebarMenuItem className={wrapperCls}>
      <Collapsible
        className="group/collapsible group max-w-full [&[data-state=open]>button>svg:first-child]:rotate-90"
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        data-layer-item
        ref={layerRef}
      >
        <SidebarMenuButton>
          <CollapsibleTrigger asChild onClick={toggleOpen}>
            <ChevronRight
              className={cn(
                "transition-transform",
                !components.length ? "pointer-events-none opacity-0" : "",
              )}
            />
          </CollapsibleTrigger>
          {name}
          {visible ? (
            <button onClick={toggleVisibility}>
              <Eye className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={toggleVisibility}>
              <EyeClosed className="h-4 w-4" />
            </button>
          )}
        </SidebarMenuButton>
      </Collapsible>
      {!!(open && components.length) && (
        <div className={`max-w-full ${!open ? "hidden" : ""}`}>
          {cmpToRender}
        </div>
      )}
    </SidebarMenuItem>
  )
}
