import { WithEditor } from "@/edust-grapesjs/_react-wrapper"

import { Devices } from "./devices"
import { Menus } from "./menus"
import { RightButtons } from "./right-buttons"

export function TopArea() {
  return (
    <div className="eg:grid eg:grid-cols-3 eg:items-center eg:border-b eg:bg-white eg:px-2 eg:lg:px-4">
      <WithEditor>
        <Menus />
        <Devices />
        <RightButtons />
      </WithEditor>
    </div>
  )
}
