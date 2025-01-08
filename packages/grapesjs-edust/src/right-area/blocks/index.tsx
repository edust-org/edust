import { BlocksResultProps, useEditor } from "@grapesjs/react"
import { FC } from "react"

export type BlockProps = Pick<
  BlocksResultProps,
  "mapCategoryBlocks" | "dragStart" | "dragStop"
>

export const Blocks: FC<BlockProps> = ({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}) => {
  const editor = useEditor()
  return <div className="gjs-custom-block-manager text-left">Blocks</div>
}
