import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("eg-border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="eg-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "eg-flex eg-flex-1 eg-items-center eg-justify-between eg-py-4 eg-text-sm eg-font-medium eg-transition-all hover:eg-underline eg-text-left [&[data-state=open]>svg]:eg-rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="eg-h-4 eg-w-4 eg-shrink-0 eg-text-muted-foreground eg-transition-transform eg-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="eg-overflow-hidden eg-text-sm data-[state=closed]:eg-animate-accordion-up data-[state=open]:eg-animate-accordion-down"
    {...props}
  >
    <div className={cn("eg-pb-4 eg-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
