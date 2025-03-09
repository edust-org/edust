import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:eg:animate-in data-[state=closed]:eg:animate-out data-[state=closed]:eg:fade-out-0 data-[state=open]:eg:fade-in-0 eg:fixed eg:inset-0 eg:z-50 eg:bg-black/80",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "eg:bg-background data-[state=open]:eg:animate-in data-[state=closed]:eg:animate-out data-[state=closed]:eg:fade-out-0 data-[state=open]:eg:fade-in-0 data-[state=closed]:eg:zoom-out-95 data-[state=open]:eg:zoom-in-95 eg:fixed eg:top-[50%] eg:left-[50%] eg:z-50 eg:grid eg:w-full eg:max-w-[calc(100%-2rem)] eg:translate-x-[-50%] eg:translate-y-[-50%] eg:gap-4 eg:rounded-lg eg:border eg:p-6 eg:shadow-lg eg:duration-200 sm:eg:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="eg:ring-offset-background focus:eg:ring-ring data-[state=open]:eg:bg-accent data-[state=open]:eg:text-muted-foreground eg:absolute eg:top-4 eg:right-4 eg:rounded-xs eg:opacity-70 eg:transition-opacity hover:eg:opacity-100 focus:eg:ring-2 focus:eg:ring-offset-2 focus:eg:outline-hidden disabled:eg:pointer-events-none [&_svg]:eg:pointer-events-none [&_svg]:eg:shrink-0 [&_svg:not([class*=size-])]:eg:size-4">
          <XIcon />
          <span className="eg:sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("eg:flex eg:flex-col eg:gap-2 eg:text-center sm:eg:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "eg:flex eg:flex-col-reverse eg:gap-2 sm:eg:flex-row sm:eg:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("eg:text-lg eg:leading-none eg:font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("eg:text-muted-foreground eg:text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
