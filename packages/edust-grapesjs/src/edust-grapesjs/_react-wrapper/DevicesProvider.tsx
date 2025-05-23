import type { Device } from "grapesjs"

import React, { memo, useEffect, useState } from "react"

import { useEditorInstance } from "./context/EditorInstance"
import { isFunction, noop } from "./utils"

export type DevicesState = {
  /**
   * Array of devices.
   */
  devices: Device[]

  /**
   * Selected device id.
   */
  selected: string

  /**
   * Select new device by id.
   */
  select: (deviceId: string) => void
}

export type DevicesResultProps = DevicesState

export interface DevicesProviderProps {
  children: (props: DevicesResultProps) => React.JSX.Element
}

const DevicesProvider = memo(function DevicesProvider({
  children,
}: DevicesProviderProps) {
  const { editor } = useEditorInstance()
  const [propState, setPropState] = useState<DevicesState>(() => ({
    devices: [],
    selected: "",
    select: noop,
  }))

  useEffect(() => {
    if (!editor) return
    const { Devices } = editor
    const event = Devices.events.all

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selected: string = (Devices.getSelected() as any)["id"]

    const up = () => {
      setPropState({
        devices: Devices.getDevices(),
        selected,
        select: (id) => Devices.select(id),
      })
    }

    editor.on(event, up)
    up()

    return () => {
      editor.off(event, up)
    }
  }, [editor])

  return editor ? (isFunction(children) ? children(propState) : null) : null
})

export default DevicesProvider
