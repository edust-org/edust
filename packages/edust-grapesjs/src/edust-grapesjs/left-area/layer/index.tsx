import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui"
import { LayersResultProps, useEditor } from "@/edust-grapesjs/_react-wrapper"
import { Component, Editor } from "grapesjs"
import { ChevronRight, Layers } from "lucide-react"

import { useRef, useState } from "react"

import { LayerItem } from "./layer-item"

type DragRect = {
  y: number
  h: number
  pointerInside: boolean
}

const getDragTarget = (ev: React.PointerEvent) => {
  const el = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement
  const elLayer = el?.closest("[data-layer-item]") as HTMLElement
  return {
    el: elLayer,
    cmp: (elLayer as any)?.__cmp as Component,
  }
}
type CanMoveResult = ReturnType<Editor["Components"]["canMove"]>

interface CanMove extends Partial<Omit<CanMoveResult, "source">> {
  canMoveInside?: CanMoveResult
  source?: Component | null
  index?: number
}

const LAYER_PAD = 5
export const Layer = ({ root }: Omit<LayersResultProps, "Container">) => {
  const editor = useEditor()
  const { Components } = editor
  const [pointerDown, setPointerDown] = useState(false)

  const [canMoveRes, setCanMoveRes] = useState<CanMove>({})
  const [dragging, setDragging] = useState<Component>()
  const [cmpPointerOver, setCmpPointerOver] = useState<Component>()
  const [dragParent, setDragParent] = useState<Component>()
  const [dragRect, setDragRect] = useState<DragRect>()
  const indicatorRef = useRef<HTMLDivElement>(null)

  const onDragStart = () => {
    setPointerDown(true)
  }
  const onDragMove = (ev: React.PointerEvent) => {
    if (!pointerDown) return
    const { cmp, el: elLayer } = getDragTarget(ev)
    if (!elLayer || !cmp) return
    const layerRect = elLayer.getBoundingClientRect()
    const layerH = elLayer.offsetHeight
    const layerY = elLayer.offsetTop
    const pointerY = ev.clientY
    const isBefore = pointerY < layerRect.y + layerH / 2
    const cmpSource = !dragging ? cmp : dragging
    const cmpTarget = cmp.parent()

    const cmpIndex = cmp.index() + (isBefore ? 0 : 1)
    !dragging && setDragging(cmp)
    setCmpPointerOver(cmp)

    const canMove = Components.canMove(cmpTarget!, cmpSource, cmpIndex)
    const canMoveInside = Components.canMove(cmp, cmpSource)
    const canMoveRes: CanMove = {
      ...canMove,
      canMoveInside,
      index: cmpIndex,
    }
    let pointerInside = false
    if (
      canMoveInside.result &&
      pointerY > layerRect.y + LAYER_PAD &&
      pointerY < layerRect.y + layerH - LAYER_PAD
    ) {
      pointerInside = true
      canMoveRes.target = cmp
      delete canMoveRes.index
    }
    setDragParent(pointerInside ? cmp : undefined)
    setCanMoveRes(canMoveRes)
    setDragRect({
      pointerInside,
      y: layerY + (isBefore ? 0 : layerH),
      h: layerH,
    })
  }

  const onDragEnd = () => {
    if (canMoveRes?.result) {
      canMoveRes.source?.move(canMoveRes.target!, { at: canMoveRes.index })
    }
    setCanMoveRes({})
    setPointerDown(false)
    setDragging(undefined)
    setCmpPointerOver(undefined)
    setDragParent(undefined)
    setDragRect(undefined)
  }

  const dragLevel = (cmpPointerOver ? cmpPointerOver.parents() : []).length
  const showIndicator = !!(
    dragging &&
    dragRect &&
    canMoveRes?.result &&
    !dragRect.pointerInside
  )
  const indicatorStyle = showIndicator
    ? { top: dragRect.y, left: 0, marginLeft: dragLevel * 10 + 20 }
    : {}

  return (
    <>
      <Collapsible defaultOpen className="eg:group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="eg:group/label eg:text-sidebar-foreground eg:hover:bg-sidebar-accent eg:hover:text-sidebar-accent-foreground eg:text-sm"
          >
            <CollapsibleTrigger>
              <Layers className="eg:me-1" /> Layers
              <ChevronRight className="eg:ml-auto eg:transition-transform eg:group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu
                    className="eg:gjs-custom-layer-manager eg:touch-none"
                    onPointerDown={onDragStart}
                    onPointerMove={onDragMove}
                    onPointerUp={onDragEnd}
                  >
                    {!!root && (
                      <LayerItem
                        component={root}
                        level={-1}
                        draggingCmp={dragging}
                        dragParent={dragParent}
                      />
                    )}
                    {showIndicator && (
                      <div
                        ref={indicatorRef}
                        className="eg:absolute eg:h-0.5 eg:w-full eg:bg-yellow-400"
                        style={indicatorStyle}
                      ></div>
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </>
  )
}
