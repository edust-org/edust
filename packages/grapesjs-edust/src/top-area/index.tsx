import { Devices } from "./devices"
import { WithEditor } from "@grapesjs/react"
import { RightButtons } from "./right-buttons"
import { Menus } from "./menus"

export function TopArea() {
  return (
    <div className="grid grid-cols-3 items-center border-b px-2 lg:px-4">
      <WithEditor>
        <Menus />
        <Devices />
        <RightButtons />
      </WithEditor>
    </div>
  )
}
