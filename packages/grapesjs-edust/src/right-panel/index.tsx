import {
  BlocksProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from "@grapesjs/react"
import CustomBlockManager from "./custom-block-manager"
import CustomSelectorManager from "./custom-selector-manager"
import CustomStyleManager from "./custom-style-manager"
import CustomTraitManager from "./custom-trait-manager"
import {
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"
import { MdDashboardCustomize } from "react-icons/md"
import { FaPaintBrush } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"

export const RightPanel = () => {
  return (
    <>
      <Tabs defaultValue="blocks">
        <TabsList className="eg-flex eg-items-center eg-justify-between eg-gap-2">
          <TabsTrigger value="selectors">
            <FaPaintBrush className="eg-text-lg" />
          </TabsTrigger>
          <TabsTrigger value="traits">
            <IoMdSettings className="eg-text-lg" />
          </TabsTrigger>
          <TabsTrigger value="blocks">
            <MdDashboardCustomize className="eg-text-lg" />
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="eg-h-screen">
          <TabsContent value="selectors">
            <>
              <SelectorsProvider>
                {(props) => <CustomSelectorManager {...props} />}
              </SelectorsProvider>
              <StylesProvider>
                {(props) => <CustomStyleManager {...props} />}
              </StylesProvider>
            </>
          </TabsContent>
          <TabsContent value="traits">
            <TraitsProvider>
              {(props) => <CustomTraitManager {...props} />}
            </TraitsProvider>
          </TabsContent>
          <TabsContent value="blocks">
            <BlocksProvider>
              {(props) => <CustomBlockManager {...props} />}
            </BlocksProvider>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  )
}
