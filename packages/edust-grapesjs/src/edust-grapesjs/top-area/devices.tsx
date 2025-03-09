import { ToggleGroup, ToggleGroupItem } from "@/components/ui"
import { DevicesProvider } from "@/edust-grapesjs/_react-wrapper"
import { cn } from "@/utils"
import { Monitor, Smartphone, Tablet } from "lucide-react"
import { MdOutlineDeviceUnknown } from "react-icons/md"

export const Devices = () => {
  return (
    <div className="eg:flex eg:items-center eg:justify-center">
      <div className="eg:flex eg:h-7 eg:items-center eg:gap-1.5 eg:rounded-md eg:border eg:p-[2px] eg:shadow-none">
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
                        className={cn("!h-[22px]")}
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
