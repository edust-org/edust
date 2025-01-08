import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/utils"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "eg-flex eg-h-9 eg-items-center eg-space-x-1 eg-rounded-md eg-border eg-bg-background eg-p-1 eg-shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "eg-flex eg-cursor-default eg-select-none eg-items-center eg-rounded-sm eg-px-3 eg-py-1 eg-text-sm eg-font-medium eg-outline-none focus:eg-bg-accent focus:eg-text-accent-foreground data-[state=open]:eg-bg-accent data-[state=open]:eg-text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "eg-flex eg-cursor-default eg-select-none eg-items-center eg-rounded-sm eg-px-2 eg-py-1.5 eg-text-sm eg-outline-none focus:eg-bg-accent focus:eg-text-accent-foreground data-[state=open]:eg-bg-accent data-[state=open]:eg-text-accent-foreground",
      inset && "eg-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="eg-ml-auto eg-h-4 eg-w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "eg-z-50 eg-min-w-[8rem] eg-overflow-hidden eg-rounded-md eg-border eg-bg-popover eg-p-1 eg-text-popover-foreground eg-shadow-lg data-[state=open]:eg-animate-in data-[state=closed]:eg-animate-out data-[state=closed]:eg-fade-out-0 data-[state=open]:eg-fade-in-0 data-[state=closed]:eg-zoom-out-95 data-[state=open]:eg-zoom-in-95 data-[side=bottom]:eg-slide-in-from-top-2 data-[side=left]:eg-slide-in-from-right-2 data-[side=right]:eg-slide-in-from-left-2 data-[side=top]:eg-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "eg-z-50 eg-min-w-[12rem] eg-overflow-hidden eg-rounded-md eg-border eg-bg-popover eg-p-1 eg-text-popover-foreground eg-shadow-md data-[state=open]:eg-animate-in data-[state=closed]:eg-fade-out-0 data-[state=open]:eg-fade-in-0 data-[state=closed]:eg-zoom-out-95 data-[state=open]:eg-zoom-in-95 data-[side=bottom]:eg-slide-in-from-top-2 data-[side=left]:eg-slide-in-from-right-2 data-[side=right]:eg-slide-in-from-left-2 data-[side=top]:eg-slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "eg-relative eg-flex eg-cursor-default eg-select-none eg-items-center eg-rounded-sm eg-px-2 eg-py-1.5 eg-text-sm eg-outline-none focus:eg-bg-accent focus:eg-text-accent-foreground data-[disabled]:eg-pointer-events-none data-[disabled]:eg-opacity-50",
      inset && "eg-pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "eg-relative eg-flex eg-cursor-default eg-select-none eg-items-center eg-rounded-sm eg-py-1.5 eg-pl-8 eg-pr-2 eg-text-sm eg-outline-none focus:eg-bg-accent focus:eg-text-accent-foreground data-[disabled]:eg-pointer-events-none data-[disabled]:eg-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="eg-absolute eg-left-2 eg-flex eg-h-3.5 eg-w-3.5 eg-items-center eg-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="eg-h-4 eg-w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "eg-relative eg-flex eg-cursor-default eg-select-none eg-items-center eg-rounded-sm eg-py-1.5 eg-pl-8 eg-pr-2 eg-text-sm eg-outline-none focus:eg-bg-accent focus:eg-text-accent-foreground data-[disabled]:eg-pointer-events-none data-[disabled]:eg-opacity-50",
      className
    )}
    {...props}
  >
    <span className="eg-absolute eg-left-2 eg-flex eg-h-3.5 eg-w-3.5 eg-items-center eg-justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="eg-h-4 eg-w-4 eg-fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "eg-px-2 eg-py-1.5 eg-text-sm eg-font-semibold",
      inset && "eg-pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("eg--mx-1 eg-my-1 eg-h-px eg-bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "eg-ml-auto eg-text-xs eg-tracking-widest eg-text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
