import { SidebarContent, SidebarGroup } from "@/components/ui"
import { TraitsResultProps } from "@/edust-grapesjs/_react-wrapper"

import TraitPropertyField from "./trait-property-field"

export const Traits = ({ traits }: Omit<TraitsResultProps, "Container">) => {
  return (
    <SidebarContent className="gjs-custom-style-manager">
      {!traits.length ? (
        <SidebarGroup>No properties available</SidebarGroup>
      ) : (
        traits.map((trait) => (
          <SidebarGroup>
            <TraitPropertyField key={trait.getId()} trait={trait} />
          </SidebarGroup>
        ))
      )}
    </SidebarContent>
  )
}
