import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui"
import { useEditor } from "@/edust-grapesjs/_react-wrapper"
import { cn } from "@/utils"
import type { Component } from "grapesjs"
import { ChevronRight, Eye, EyeClosed } from "lucide-react"

import { useEffect, useMemo, useRef, useState } from "react"

export declare interface LayerItemProps
  extends React.HTMLProps<HTMLDivElement> {
  component: Component
  level: number
  draggingCmp?: Component
  dragParent?: Component
}

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
  const { open, selected, components, visible, name } = layerData
  const isDragging = draggingCmp === component
  const level = props.level + 1

  useEffect(() => {
    if (level === 0) {
      setLayerData(Layers.getLayerData(component))
    }

    if (layerRef.current) {
      ;(layerRef.current as any).__cmp = component
    }
  }, [Layers, component, level])

  useEffect(() => {
    const up = (cmp: Component) => {
      if (cmp === component) {
        setLayerData(Layers.getLayerData(cmp))
      }
    }
    const ev = Layers.events.component
    editor.on(ev, up)

    return () => {
      editor.off(ev, up)
    }
  }, [editor, Layers, component])

  const cmpToRender = useMemo(() => {
    return components.map((cmp: Component) => (
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

  const toggleOpen: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation()
    Layers.setLayerData(component, { open: !open })
  }

  const toggleVisibility: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation()
    Layers.setLayerData(component, { visible: !visible })
  }

  const select: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    Layers.setLayerData(component, { selected: true }, { event })
  }

  const hover = (hovered: boolean) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered })
    }
  }

  const wrapperCls = `layer-item eg:flex eg:flex-col ${
    selected ? "eg:bg-slate-100" : ""
  } ${!visible || isDragging ? "eg:opacity-50" : ""}`

  return (
    <SidebarMenuItem className={wrapperCls}>
      <Collapsible
        className="eg:group/collapsible eg:group eg:max-w-full eg:[&[data-state=open]>button>svg:first-child]:rotate-90"
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
                "eg:transition-transform",
                !components.length ? "eg:pointer-events-none eg:opacity-0" : "",
              )}
            />
          </CollapsibleTrigger>
          <span className="eg:text-xs">{name}</span>
          {visible ? (
            <span role="button" onClick={toggleVisibility}>
              <Eye className="eg:h-3.5 eg:w-3.5" />
            </span>
          ) : (
            <span role="button" onClick={toggleVisibility}>
              <EyeClosed className="eg:h-3.5 eg:w-3.5" />
            </span>
          )}
        </SidebarMenuButton>
      </Collapsible>
      {!!(open && components.length) && (
        <div className={`eg:max-w-full ${!open ? "eg:hidden" : ""}`}>
          {cmpToRender}
        </div>
      )}
    </SidebarMenuItem>
  )
}
