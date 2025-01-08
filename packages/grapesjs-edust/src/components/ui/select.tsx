import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "eg-flex eg-h-9 eg-w-full eg-items-center eg-justify-between eg-whitespace-nowrap eg-rounded-md eg-border eg-border-input eg-bg-transparent eg-px-3 eg-py-2 eg-text-sm eg-shadow-sm eg-ring-offset-background placeholder:eg-text-muted-foreground focus:eg-outline-none focus:eg-ring-1 focus:eg-ring-ring disabled:eg-cursor-not-allowed disabled:eg-opacity-50 [&>span]:eg-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="eg-h-4 eg-w-4 eg-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "eg-flex eg-cursor-default eg-items-center eg-justify-center eg-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="eg-h-4 eg-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "eg-flex eg-cursor-default eg-items-center eg-justify-center eg-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="eg-h-4 eg-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "eg-relative eg-z-50 eg-max-h-96 eg-min-w-[8rem] eg-overflow-hidden eg-rounded-md eg-border eg-bg-popover eg-text-popover-foreground eg-shadow-md data-[state=open]:eg-animate-in data-[state=closed]:eg-animate-out data-[state=closed]:eg-fade-out-0 data-[state=open]:eg-fade-in-0 data-[state=closed]:eg-zoom-out-95 data-[state=open]:eg-zoom-in-95 data-[side=bottom]:eg-slide-in-from-top-2 data-[side=left]:eg-slide-in-from-right-2 data-[side=right]:eg-slide-in-from-left-2 data-[side=top]:eg-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:eg-translate-y-1 data-[side=left]:eg--translate-x-1 data-[side=right]:eg-translate-x-1 data-[side=top]:eg--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "eg-p-1",
          position === "popper" &&
            "eg-h-[var(--radix-select-trigger-height)] eg-w-full eg-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("eg-px-2 eg-py-1.5 eg-text-sm eg-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "eg-relative eg-flex eg-w-full eg-cursor-default eg-select-none eg-items-center eg-rounded-sm eg-py-1.5 eg-pl-2 eg-pr-8 eg-text-sm eg-outline-none focus:eg-bg-accent focus:eg-text-accent-foreground data-[disabled]:eg-pointer-events-none data-[disabled]:eg-opacity-50",
      className
    )}
    {...props}
  >
    <span className="eg-absolute eg-right-2 eg-flex eg-h-3.5 eg-w-3.5 eg-items-center eg-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="eg-h-4 eg-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("eg--mx-1 eg-my-1 eg-h-px eg-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
