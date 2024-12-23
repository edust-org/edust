import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui"
import { Component, Editor } from "@edust/grapesjs"
import { LayersResultProps, useEditor } from "@grapesjs/react"
import { ChevronRight, Eye, Layers } from "lucide-react"
import { useRef, useState } from "react"
import { LayerItem } from "./layer-item"

type TreeItem = [string, ...(TreeItem | string)[]]

interface Data {
  tree: TreeItem[]
}

// example data
const data: Data = {
  tree: [
    [
      "body",
      [
        "div",
        [
          "section",
          [
            "article",
            [
              "header",
              ["h1", ["span", ["strong", ["i", ["u", ["a", ["b"]]]]]]],
              "p",
            ],
            [
              "main",
              [
                "div",
                [
                  "ul",
                  ["li", ["a", ["span", ["i", ["b", ["small", ["mark"]]]]]]],
                  ["li", ["p", ["span", ["u", ["code"]]]]],
                ],
              ],
            ],
            [
              "footer",
              ["div", ["p", ["small", ["b", ["i", ["u", ["time"]]]]]]],
            ],
          ],
        ],
      ],
    ],
  ],
}

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
  console.log(root)
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
    canMoveRes?.result &&
      canMoveRes.source?.move(canMoveRes.target!, { at: canMoveRes.index })
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
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <CollapsibleTrigger>
              <Layers className="me-1" /> Layers
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu
                    className="gjs-custom-layer-manager touch-none"
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
                        className={"absolute h-0.5 w-full bg-yellow-400"}
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
