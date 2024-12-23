import { LayersProvider, PagesProvider } from "@grapesjs/react"
import { ScrollArea, ScrollBar } from "@/components/ui"
import { Pages } from "./pages"
import { Layer } from "./layer"

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
