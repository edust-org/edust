import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui"
import { StylesResultProps } from "@/edust-grapesjs/_react-wrapper"

import StylePropertyField from "./style-property-field"

export const Style = ({ sectors }: Omit<StylesResultProps, "Container">) => {
  return (
    <SidebarContent className="gjs-custom-style-manager p-2">
      <SidebarGroup>
        <Accordion type="single" collapsible>
          {sectors.map((sector) => (
            <AccordionItem value={sector.getId()} key={sector.getId()}>
              <AccordionTrigger> {sector.getName()}</AccordionTrigger>
              <AccordionContent>
                {sector.getProperties().map((prop: any) => (
                  <StylePropertyField key={prop.getId()} prop={prop} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarGroup>
    </SidebarContent>
  )
}
