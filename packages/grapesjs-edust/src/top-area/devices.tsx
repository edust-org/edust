import { DevicesProvider } from "@grapesjs/react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui"
import { Monitor, Smartphone, Tablet } from "lucide-react"
import { MdOutlineDeviceUnknown } from "react-icons/md"

export const Devices = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none">
        <ToggleGroup type="single" defaultValue={"Desktop"}>
          <DevicesProvider>
            {({ devices, select }) => {
              return (
                <>
                  {devices.map((device) => {
                    return (
                      <ToggleGroupItem
                        key={device.id}
                        value={device.id}
                        onClick={() => select(device.id)}
                        className="h-6"
                      >
                        <DeviceIcon device={device.id} />
                      </ToggleGroupItem>
                    )
                  })}
                </>
              )
            }}
          </DevicesProvider>
        </ToggleGroup>
      </div>
    </div>
  )
}

const DeviceIcon = ({ device }: { device: string }) => {
  switch (device) {
    case "Desktop":
      return <Monitor />
    case "Tablet":
      return <Tablet />
    case "Mobile Portrait":
      return <Smartphone />
    default:
      return <MdOutlineDeviceUnknown />
  }
}
