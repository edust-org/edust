import { Devices } from "./devices"
import { WithEditor } from "@grapesjs/react"
import { RightButtons } from "./right-buttons"
import { Menus } from "./menus"

export function TopArea() {
  return (
    <div className="eg-grid eg-grid-cols-3 eg-items-center eg-border-b eg-px-2 lg:eg-px-4">
      <WithEditor>
        <Menus />
        <Devices />
        <RightButtons />
      </WithEditor>
    </div>
  )
}
