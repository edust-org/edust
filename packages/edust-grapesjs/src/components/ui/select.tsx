import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "eg:border-input data-[placeholder]:eg:text-muted-foreground [&_svg:not([class*=text-])]:eg:text-muted-foreground focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 aria-invalid:eg:ring-destructive/20 dark:aria-invalid:eg:ring-destructive/40 aria-invalid:eg:border-destructive eg:flex eg:h-9 eg:w-fit eg:items-center eg:justify-between eg:gap-2 eg:rounded-md eg:border eg:bg-transparent eg:px-3 eg:py-2 eg:text-sm eg:whitespace-nowrap eg:shadow-xs eg:transition-[color,box-shadow] eg:outline-none focus-visible:eg:ring-[3px] disabled:eg:cursor-not-allowed disabled:eg:opacity-50 *:data-[slot=select-value]:eg:line-clamp-1 *:data-[slot=select-value]:eg:flex *:data-[slot=select-value]:eg:items-center *:data-[slot=select-value]:eg:gap-2 [&_svg]:eg:pointer-events-none [&_svg]:eg:shrink-0 [&_svg:not([class*=size-])]:eg:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="eg:size-4 eg:opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "eg:bg-popover eg:text-popover-foreground data-[state=open]:eg:animate-in data-[state=closed]:eg:animate-out data-[state=closed]:eg:fade-out-0 data-[state=open]:eg:fade-in-0 data-[state=closed]:eg:zoom-out-95 data-[state=open]:eg:zoom-in-95 data-[side=bottom]:eg:slide-in-from-top-2 data-[side=left]:eg:slide-in-from-right-2 data-[side=right]:eg:slide-in-from-left-2 data-[side=top]:eg:slide-in-from-bottom-2 eg:relative eg:z-50 eg:max-h-96 eg:min-w-[8rem] eg:overflow-hidden eg:rounded-md eg:border eg:shadow-md",
          position === "popper" &&
            "data-[side=bottom]:eg:translate-y-1 data-[side=left]:eg:-translate-x-1 data-[side=right]:eg:translate-x-1 data-[side=top]:eg:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "eg:p-1",
            position === "popper" &&
              "eg:h-[var(--radix-select-trigger-height)] eg:w-full eg:min-w-[var(--radix-select-trigger-width)] eg:scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("eg:px-2 eg:py-1.5 eg:text-sm eg:font-medium", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:eg:bg-accent focus:eg:text-accent-foreground [&_svg:not([class*=text-])]:eg:text-muted-foreground eg:relative eg:flex eg:w-full eg:cursor-default eg:items-center eg:gap-2 eg:rounded-sm eg:py-1.5 eg:pr-8 eg:pl-2 eg:text-sm eg:outline-hidden eg:select-none data-[disabled]:eg:pointer-events-none data-[disabled]:eg:opacity-50 [&_svg]:eg:pointer-events-none [&_svg]:eg:shrink-0 [&_svg:not([class*=size-])]:eg:size-4 *:[span]:last:eg:flex *:[span]:last:eg:items-center *:[span]:last:eg:gap-2",
        className
      )}
      {...props}
    >
      <span className="eg:absolute eg:right-2 eg:flex eg:size-3.5 eg:items-center eg:justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="eg:size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("eg:bg-border eg:pointer-events-none eg:-mx-1 eg:my-1 eg:h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "eg:flex eg:cursor-default eg:items-center eg:justify-center eg:py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="eg:size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "eg:flex eg:cursor-default eg:items-center eg:justify-center eg:py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="eg:size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
