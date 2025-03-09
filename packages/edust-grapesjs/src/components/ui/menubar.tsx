import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/utils"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "eg:bg-background eg:flex eg:h-9 eg:items-center eg:gap-1 eg:rounded-md eg:border eg:p-1 eg:shadow-xs",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:eg:bg-accent focus:eg:text-accent-foreground data-[state=open]:eg:bg-accent data-[state=open]:eg:text-accent-foreground eg:flex eg:items-center eg:rounded-sm eg:px-2 eg:py-1 eg:text-sm eg:font-medium eg:outline-hidden eg:select-none",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "eg:bg-popover eg:text-popover-foreground data-[state=open]:eg:animate-in data-[state=closed]:eg:fade-out-0 data-[state=open]:eg:fade-in-0 data-[state=closed]:eg:zoom-out-95 data-[state=open]:eg:zoom-in-95 data-[side=bottom]:eg:slide-in-from-top-2 data-[side=left]:eg:slide-in-from-right-2 data-[side=right]:eg:slide-in-from-left-2 data-[side=top]:eg:slide-in-from-bottom-2 eg:z-50 eg:min-w-[12rem] eg:overflow-hidden eg:rounded-md eg:border eg:p-1 eg:shadow-md",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:eg:bg-accent focus:eg:text-accent-foreground data-[variant=destructive]:eg:text-destructive-foreground data-[variant=destructive]:focus:eg:bg-destructive/10 dark:data-[variant=destructive]:focus:eg:bg-destructive/40 data-[variant=destructive]:focus:eg:text-destructive-foreground data-[variant=destructive]:*:[svg]:eg:!text-destructive-foreground [&_svg:not([class*=text-])]:eg:text-muted-foreground eg:relative eg:flex eg:cursor-default eg:items-center eg:gap-2 eg:rounded-sm eg:px-2 eg:py-1.5 eg:text-sm eg:outline-hidden eg:select-none data-[disabled]:eg:pointer-events-none data-[disabled]:eg:opacity-50 data-[inset]:eg:pl-8 [&_svg]:eg:pointer-events-none [&_svg]:eg:shrink-0 [&_svg:not([class*=size-])]:eg:size-4",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:eg:bg-accent focus:eg:text-accent-foreground eg:relative eg:flex eg:cursor-default eg:items-center eg:gap-2 eg:rounded-xs eg:py-1.5 eg:pr-2 eg:pl-8 eg:text-sm eg:outline-hidden eg:select-none data-[disabled]:eg:pointer-events-none data-[disabled]:eg:opacity-50 [&_svg]:eg:pointer-events-none [&_svg]:eg:shrink-0 [&_svg:not([class*=size-])]:eg:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="eg:pointer-events-none eg:absolute eg:left-2 eg:flex eg:size-3.5 eg:items-center eg:justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="eg:size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:eg:bg-accent focus:eg:text-accent-foreground eg:relative eg:flex eg:cursor-default eg:items-center eg:gap-2 eg:rounded-xs eg:py-1.5 eg:pr-2 eg:pl-8 eg:text-sm eg:outline-hidden eg:select-none data-[disabled]:eg:pointer-events-none data-[disabled]:eg:opacity-50 [&_svg]:eg:pointer-events-none [&_svg]:eg:shrink-0 [&_svg:not([class*=size-])]:eg:size-4",
        className
      )}
      {...props}
    >
      <span className="eg:pointer-events-none eg:absolute eg:left-2 eg:flex eg:size-3.5 eg:items-center eg:justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="eg:size-2 eg:fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "eg:px-2 eg:py-1.5 eg:text-sm eg:font-medium data-[inset]:eg:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("eg:bg-border eg:-mx-1 eg:my-1 eg:h-px", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "eg:text-muted-foreground eg:ml-auto eg:text-xs eg:tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:eg:bg-accent focus:eg:text-accent-foreground data-[state=open]:eg:bg-accent data-[state=open]:eg:text-accent-foreground eg:flex eg:cursor-default eg:items-center eg:rounded-sm eg:px-2 eg:py-1.5 eg:text-sm eg:outline-none eg:select-none data-[inset]:eg:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="eg:ml-auto eg:h-4 eg:w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "eg:bg-popover eg:text-popover-foreground data-[state=open]:eg:animate-in data-[state=closed]:eg:animate-out data-[state=closed]:eg:fade-out-0 data-[state=open]:eg:fade-in-0 data-[state=closed]:eg:zoom-out-95 data-[state=open]:eg:zoom-in-95 data-[side=bottom]:eg:slide-in-from-top-2 data-[side=left]:eg:slide-in-from-right-2 data-[side=right]:eg:slide-in-from-left-2 data-[side=top]:eg:slide-in-from-bottom-2 eg:z-50 eg:min-w-[8rem] eg:overflow-hidden eg:rounded-md eg:border eg:p-1 eg:shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
