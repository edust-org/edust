import { ScrollArea, ScrollBar } from "@/components/ui"
import { LayersProvider, PagesProvider } from "@/edust-grapesjs/_react-wrapper"

import { Layer } from "./layer"
import { Pages } from "./pages"

export const LeftArea = () => {
  return (
    <>
      <PagesProvider>{(props) => <Pages {...props} />}</PagesProvider>
      <ScrollArea>
        <LayersProvider>{(props) => <Layer {...props} />}</LayersProvider>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  )
}
