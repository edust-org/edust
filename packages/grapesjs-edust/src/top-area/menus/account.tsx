import {
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui"

export const Account = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger className="eg-hidden md:eg-block">Account</MenubarTrigger>
      <MenubarContent forceMount>
        <MenubarLabel inset>Switch Account</MenubarLabel>
        <MenubarSeparator />
        <MenubarRadioGroup value="1">
          <MenubarRadioItem value="2">Andy</MenubarRadioItem>
          <MenubarRadioItem value="3">Benoit</MenubarRadioItem>
          <MenubarRadioItem value="4">Luis</MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarItem inset>Manage Family...</MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset>Add Account...</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}
