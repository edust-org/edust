import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "eg:group/sidebar-wrapper has-data-[variant=inset]:eg:bg-sidebar eg:flex eg:min-h-svh eg:w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "eg:bg-sidebar eg:text-sidebar-foreground eg:flex eg:h-full eg:w-(--sidebar-width) eg:flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="eg:bg-sidebar eg:text-sidebar-foreground eg:w-(--sidebar-width) eg:p-0 [&>button]:eg:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="eg:sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="eg:flex eg:h-full eg:w-full eg:flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="eg:group eg:peer eg:text-sidebar-foreground eg:hidden md:eg:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "eg:relative eg:w-(--sidebar-width) eg:bg-transparent eg:transition-[width] eg:duration-200 eg:ease-linear",
          "group-data-[collapsible=offcanvas]:eg:w-0",
          "group-data-[side=right]:eg:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:eg:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:eg:w-(--sidebar-width-icon)"
        )}
      />
      <div
        className={cn(
          "eg:fixed eg:inset-y-0 eg:z-10 eg:hidden eg:h-svh eg:w-(--sidebar-width) eg:transition-[left,right,width] eg:duration-200 eg:ease-linear md:eg:flex",
          side === "left"
            ? "eg:left-0 group-data-[collapsible=offcanvas]:eg:left-[calc(var(--sidebar-width)*-1)]"
            : "eg:right-0 group-data-[collapsible=offcanvas]:eg:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "eg:p-2 group-data-[collapsible=icon]:eg:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:eg:w-(--sidebar-width-icon) group-data-[side=left]:eg:border-r group-data-[side=right]:eg:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="eg:bg-sidebar group-data-[variant=floating]:eg:border-sidebar-border eg:flex eg:h-full eg:w-full eg:flex-col group-data-[variant=floating]:eg:rounded-lg group-data-[variant=floating]:eg:border group-data-[variant=floating]:eg:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("eg:h-7 eg:w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="eg:sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:eg:bg-sidebar-border eg:absolute eg:inset-y-0 eg:z-20 eg:hidden eg:w-4 eg:-translate-x-1/2 eg:transition-all eg:ease-linear group-data-[side=left]:eg:-right-4 group-data-[side=right]:eg:left-0 after:eg:absolute after:eg:inset-y-0 after:eg:left-1/2 after:eg:w-[2px] sm:eg:flex",
        "in-data-[side=left]:eg:cursor-w-resize in-data-[side=right]:eg:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:eg:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:eg:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:eg:bg-sidebar group-data-[collapsible=offcanvas]:eg:translate-x-0 group-data-[collapsible=offcanvas]:after:eg:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:eg:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:eg:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "eg:bg-background eg:relative eg:flex eg:w-full eg:flex-1 eg:flex-col",
        "md:peer-data-[variant=inset]:eg:m-2 md:peer-data-[variant=inset]:eg:ml-0 md:peer-data-[variant=inset]:eg:rounded-xl md:peer-data-[variant=inset]:eg:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:eg:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("eg:bg-background eg:h-8 eg:w-full eg:shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("eg:flex eg:flex-col eg:gap-2 eg:p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("eg:flex eg:flex-col eg:gap-2 eg:p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("eg:bg-sidebar-border eg:mx-2 eg:w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "eg:flex eg:min-h-0 eg:flex-1 eg:flex-col eg:gap-2 eg:overflow-auto group-data-[collapsible=icon]:eg:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("eg:relative eg:flex eg:w-full eg:min-w-0 eg:flex-col eg:p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "eg:text-sidebar-foreground/70 eg:ring-sidebar-ring eg:flex eg:h-8 eg:shrink-0 eg:items-center eg:rounded-md eg:px-2 eg:text-xs eg:font-medium eg:outline-hidden eg:transition-[margin,opacity] eg:duration-200 eg:ease-linear focus-visible:eg:ring-2 [&>svg]:eg:size-4 [&>svg]:eg:shrink-0",
        "group-data-[collapsible=icon]:eg:-mt-8 group-data-[collapsible=icon]:eg:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "eg:text-sidebar-foreground eg:ring-sidebar-ring hover:eg:bg-sidebar-accent hover:eg:text-sidebar-accent-foreground eg:absolute eg:top-3.5 eg:right-3 eg:flex eg:aspect-square eg:w-5 eg:items-center eg:justify-center eg:rounded-md eg:p-0 eg:outline-hidden eg:transition-transform focus-visible:eg:ring-2 [&>svg]:eg:size-4 [&>svg]:eg:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:eg:absolute after:eg:-inset-2 md:after:eg:hidden",
        "group-data-[collapsible=icon]:eg:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("eg:w-full eg:text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("eg:flex eg:w-full eg:min-w-0 eg:flex-col eg:gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("eg:group/menu-item eg:relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "eg:peer/menu-button eg:flex eg:w-full eg:items-center eg:gap-2 eg:overflow-hidden eg:rounded-md eg:p-2 eg:text-left eg:text-sm eg:outline-hidden eg:ring-sidebar-ring eg:transition-[width,height,padding] hover:eg:bg-sidebar-accent hover:eg:text-sidebar-accent-foreground focus-visible:eg:ring-2 active:eg:bg-sidebar-accent active:eg:text-sidebar-accent-foreground disabled:eg:pointer-events-none disabled:eg:opacity-50 eg:group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:eg:pointer-events-none aria-disabled:eg:opacity-50 data-[active=true]:eg:bg-sidebar-accent data-[active=true]:eg:font-medium data-[active=true]:eg:text-sidebar-accent-foreground data-[state=open]:hover:eg:bg-sidebar-accent data-[state=open]:hover:eg:text-sidebar-accent-foreground group-data-[collapsible=icon]:eg:size-8! group-data-[collapsible=icon]:eg:p-2! [&>span:last-child]:eg:truncate [&>svg]:eg:size-4 [&>svg]:eg:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:eg:bg-sidebar-accent hover:eg:text-sidebar-accent-foreground",
        outline:
          "eg:bg-background eg:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:eg:bg-sidebar-accent hover:eg:text-sidebar-accent-foreground hover:eg:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "eg:h-8 eg:text-sm",
        sm: "eg:h-7 eg:text-xs",
        lg: "eg:h-12 eg:text-sm group-data-[collapsible=icon]:eg:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "eg:text-sidebar-foreground eg:ring-sidebar-ring hover:eg:bg-sidebar-accent hover:eg:text-sidebar-accent-foreground eg:peer-hover/menu-button:text-sidebar-accent-foreground eg:absolute eg:top-1.5 eg:right-1 eg:flex eg:aspect-square eg:w-5 eg:items-center eg:justify-center eg:rounded-md eg:p-0 eg:outline-hidden eg:transition-transform focus-visible:eg:ring-2 [&>svg]:eg:size-4 [&>svg]:eg:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:eg:absolute after:eg:-inset-2 md:after:eg:hidden",
        "eg:peer-data-[size=sm]/menu-button:top-1",
        "eg:peer-data-[size=default]/menu-button:top-1.5",
        "eg:peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:eg:hidden",
        showOnHover &&
          "eg:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground eg:group-focus-within/menu-item:opacity-100 eg:group-hover/menu-item:opacity-100 data-[state=open]:eg:opacity-100 md:eg:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "eg:text-sidebar-foreground eg:pointer-events-none eg:absolute eg:right-1 eg:flex eg:h-5 eg:min-w-5 eg:items-center eg:justify-center eg:rounded-md eg:px-1 eg:text-xs eg:font-medium eg:tabular-nums eg:select-none",
        "eg:peer-hover/menu-button:text-sidebar-accent-foreground eg:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "eg:peer-data-[size=sm]/menu-button:top-1",
        "eg:peer-data-[size=default]/menu-button:top-1.5",
        "eg:peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:eg:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("eg:flex eg:h-8 eg:items-center eg:gap-2 eg:rounded-md eg:px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="eg:size-4 eg:rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="eg:h-4 eg:max-w-(--skeleton-width) eg:flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "eg:border-sidebar-border eg:mx-3.5 eg:flex eg:min-w-0 eg:translate-x-px eg:flex-col eg:gap-1 eg:border-l eg:px-2.5 eg:py-0.5",
        "group-data-[collapsible=icon]:eg:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("eg:group/menu-sub-item eg:relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "eg:text-sidebar-foreground eg:ring-sidebar-ring hover:eg:bg-sidebar-accent hover:eg:text-sidebar-accent-foreground active:eg:bg-sidebar-accent active:eg:text-sidebar-accent-foreground [&>svg]:eg:text-sidebar-accent-foreground eg:flex eg:h-7 eg:min-w-0 eg:-translate-x-px eg:items-center eg:gap-2 eg:overflow-hidden eg:rounded-md eg:px-2 eg:outline-hidden focus-visible:eg:ring-2 disabled:eg:pointer-events-none disabled:eg:opacity-50 aria-disabled:eg:pointer-events-none aria-disabled:eg:opacity-50 [&>span:last-child]:eg:truncate [&>svg]:eg:size-4 [&>svg]:eg:shrink-0",
        "data-[active=true]:eg:bg-sidebar-accent data-[active=true]:eg:text-sidebar-accent-foreground",
        size === "sm" && "eg:text-xs",
        size === "md" && "eg:text-sm",
        "group-data-[collapsible=icon]:eg:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
