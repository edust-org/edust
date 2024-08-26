import { StylesResultProps } from "@grapesjs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import StylePropertyField from "./style-property-field";

export default function CustomStyleManager({
  sectors,
}: Omit<StylesResultProps, "Container">) {
  return (
    <div className="gjs-custom-style-manager text-left p-2">
      <Accordion type="single" collapsible>
        {sectors.map((sector) => (
          <AccordionItem value={sector.getId()} key={sector.getId()}>
            <AccordionTrigger> {sector.getName()}</AccordionTrigger>
            <AccordionContent>
              {sector.getProperties().map((prop) => (
                <StylePropertyField key={prop.getId()} prop={prop} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
