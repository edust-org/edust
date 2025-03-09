import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("eg:border-b last:eg:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="eg:flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 eg:flex eg:flex-1 eg:items-start eg:justify-between eg:gap-4 eg:rounded-md eg:py-4 eg:text-left eg:text-sm eg:font-medium eg:transition-all eg:outline-none hover:eg:underline focus-visible:eg:ring-[3px] disabled:eg:pointer-events-none disabled:eg:opacity-50 [&[data-state=open]>svg]:eg:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="eg:text-muted-foreground eg:pointer-events-none eg:size-4 eg:shrink-0 eg:translate-y-0.5 eg:transition-transform eg:duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:eg:animate-accordion-up data-[state=open]:eg:animate-accordion-down eg:overflow-hidden eg:text-sm"
      {...props}
    >
      <div className={cn("eg:pt-0 eg:pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
