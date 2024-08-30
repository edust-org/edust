import { LayersProvider, PagesProvider } from "@grapesjs/react";
import CustomPageManager from "./custom-page-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { FaLayerGroup } from "react-icons/fa";
import { RiFileCopy2Line } from "react-icons/ri";
import CustomLayerManager from "./custom-layer-manager";

export const LeftPanel = () => {
  return (
    <>
      <Tabs defaultValue="layers">
        <TabsList className="flex items-center justify-start gap-2">
          <TabsTrigger value="pages">
            <RiFileCopy2Line className="text-lg" />
          </TabsTrigger>
          <TabsTrigger value="layers">
            <FaLayerGroup className="text-lg" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pages">
          <PagesProvider>
            {(props) => <CustomPageManager {...props} />}
          </PagesProvider>
        </TabsContent>
        <TabsContent value="layers">
          <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        </TabsContent>
      </Tabs>
    </>
  );
};
