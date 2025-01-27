import { Menubar } from "@/components/ui"
import { File } from "./file"
import { Edit } from "./edit"
import { View } from "./view"

export const Menus = () => {
  return (
    <>
      <Menubar className="eg-rounded-none eg-border-none eg-shadow-none">
        <File />
        <Edit />
        <View />
        {/* <Account /> */}
      </Menubar>
    </>
  )
}
