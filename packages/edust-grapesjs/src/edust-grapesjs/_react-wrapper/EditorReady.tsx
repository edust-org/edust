import { memo, useEffect } from "react"

import { useEditorOptions } from "./context/EditorOptions"

const EditorReady = memo(function EditorReady() {
  const options = useEditorOptions()
  useEffect(() => options.setReady(true), [])
  return <></>
})

export default EditorReady
