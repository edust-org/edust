import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:eg:animate-in data-[state=closed]:eg:animate-out data-[state=closed]:eg:fade-out-0 data-[state=open]:eg:fade-in-0 eg:fixed eg:inset-0 eg:z-50 eg:bg-black/80",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "eg:bg-background data-[state=open]:eg:animate-in data-[state=closed]:eg:animate-out eg:fixed eg:z-50 eg:flex eg:flex-col eg:gap-4 eg:shadow-lg eg:transition eg:ease-in-out data-[state=closed]:eg:duration-300 data-[state=open]:eg:duration-500",
          side === "right" &&
            "data-[state=closed]:eg:slide-out-to-right data-[state=open]:eg:slide-in-from-right eg:inset-y-0 eg:right-0 eg:h-full eg:w-3/4 eg:border-l sm:eg:max-w-sm",
          side === "left" &&
            "data-[state=closed]:eg:slide-out-to-left data-[state=open]:eg:slide-in-from-left eg:inset-y-0 eg:left-0 eg:h-full eg:w-3/4 eg:border-r sm:eg:max-w-sm",
          side === "top" &&
            "data-[state=closed]:eg:slide-out-to-top data-[state=open]:eg:slide-in-from-top eg:inset-x-0 eg:top-0 eg:h-auto eg:border-b",
          side === "bottom" &&
            "data-[state=closed]:eg:slide-out-to-bottom data-[state=open]:eg:slide-in-from-bottom eg:inset-x-0 eg:bottom-0 eg:h-auto eg:border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="eg:ring-offset-background focus:eg:ring-ring data-[state=open]:eg:bg-secondary eg:absolute eg:top-4 eg:right-4 eg:rounded-xs eg:opacity-70 eg:transition-opacity hover:eg:opacity-100 focus:eg:ring-2 focus:eg:ring-offset-2 focus:eg:outline-hidden disabled:eg:pointer-events-none">
          <XIcon className="eg:size-4" />
          <span className="eg:sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("eg:flex eg:flex-col eg:gap-1.5 eg:p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("eg:mt-auto eg:flex eg:flex-col eg:gap-2 eg:p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("eg:text-foreground eg:font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("eg:text-muted-foreground eg:text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
