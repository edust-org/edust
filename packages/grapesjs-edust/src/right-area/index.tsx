import { Blocks as BlocksIcon, Paintbrush, Settings } from "lucide-react"
import { useRightPanelContext } from "@/context/right-panel"
import { ActivePanel } from "@/types"
import { Blocks } from "./blocks"
import {
  BlocksProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from "@grapesjs/react"
import {
  ScrollArea,
  Sidebar,
  SidebarContent,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui"
import { Traits } from "./traits"
import { Selectors } from "./selectors"
import { Style } from "./style"

export const RightArea = () => {
  const { state, dispatch } = useRightPanelContext()
  return (
    <>
      <Sidebar collapsible="none" className="eg-w-full">
        <ScrollArea>
          <SidebarContent>
            <div className="eg-flex eg-items-center eg-justify-center eg-bg-white">
              <div className="eg-flex eg-h-7 eg-w-full eg-items-center eg-gap-1.5 eg-border eg-p-[2px] eg-shadow-none">
                <ToggleGroup
                  value={state.activePanel}
                  type="single"
                  className="eg-w-full eg-justify-between"
                >
                  <ToggleGroupItem
                    value={ActivePanel.SELECTORS}
                    className="eg-h-[22px] eg-w-[22px] eg-rounded-sm eg-p-0"
                    onClick={() => {
                      dispatch({ type: ActivePanel.SELECTORS })
                    }}
                  >
                    <Paintbrush className="eg-h-3.5 eg-w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value={ActivePanel.TRAITS}
                    className="eg-h-[22px] eg-w-[22px] eg-rounded-sm eg-p-0"
                    onClick={() => dispatch({ type: ActivePanel.TRAITS })}
                  >
                    <Settings className="eg-h-3.5 eg-w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value={ActivePanel.BLOCKS}
                    className="eg-h-[22px] eg-w-[22px] eg-rounded-sm eg-p-0"
                    onClick={() => dispatch({ type: ActivePanel.BLOCKS })}
                  >
                    <BlocksIcon className="eg-h-3.5 eg-w-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {state.activePanel === ActivePanel.SELECTORS && (
              <>
                <SelectorsProvider>
                  {(props) => <Selectors {...props} />}
                </SelectorsProvider>
                <StylesProvider>
                  {(props) => <Style {...props} />}
                </StylesProvider>
              </>
            )}
            {state.activePanel === ActivePanel.TRAITS && (
              <TraitsProvider>
                {(props) => <Traits {...props} />}
              </TraitsProvider>
            )}
            {state.activePanel === ActivePanel.BLOCKS && (
              <BlocksProvider>
                {(props) => <Blocks {...props} />}
              </BlocksProvider>
            )}
          </SidebarContent>
        </ScrollArea>
      </Sidebar>
    </>
  )
}
