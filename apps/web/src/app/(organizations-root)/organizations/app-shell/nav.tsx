"use client"

import { Button, buttonVariants } from "@/components/ui"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { useCheckActiveNav } from "@/hooks"
import { cn } from "@/utils"
import Link from "next/link"
import { TbChevronDown } from "react-icons/tb"

import { SideLink } from "./sidelinks"

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  links: SideLink[]
  closeNav: () => void
}

export const Nav = ({ links, isCollapsed, className, closeNav }: NavProps) => {
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      )

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      )
    return <NavLink {...rest} key={key} closeNav={closeNav} />
  }
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "bg-background group border-b py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none",
        className,
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  )
}

interface NavLinkProps extends SideLink {
  subLink?: boolean
  closeNav: () => void
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: useCheckActiveNav(href) ? "secondary" : "ghost",
          size: "sm",
        }),
        "h-12 justify-start text-wrap rounded-none px-6",
        subLink && "h-10 w-full border-l border-l-slate-500 px-2",
      )}
      aria-current={useCheckActiveNav(href) ? "page" : undefined}
    >
      <div className="mr-2">{icon}</div>
      {title}
      {label && (
        <div className="bg-primary text-primary-foreground ml-2 rounded-lg px-1 text-[0.625rem]">
          {label}
        </div>
      )}
    </Link>
  )
}

function NavLinkDropdown({ title, icon, label, sub, closeNav }: NavLinkProps) {
  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => useCheckActiveNav(s.href))

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "group h-12 w-full justify-start rounded-none px-6",
        )}
      >
        <div className="mr-2">{icon}</div>
        {title}
        {label && (
          <div className="bg-primary text-primary-foreground ml-2 rounded-lg px-1 text-[0.625rem]">
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180',
          )}
        >
          <TbChevronDown />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant: useCheckActiveNav(href) ? "secondary" : "ghost",
              size: "icon",
            }),
            "h-12 w-12",
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
        {label && (
          <span className="text-muted-foreground ml-auto">{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => useCheckActiveNav(s.href))

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? "secondary" : "ghost"}
              size="icon"
              className="h-12 w-12"
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}{" "}
          {label && (
            <span className="text-muted-foreground ml-auto">{label}</span>
          )}
          <TbChevronDown
            size={18}
            className="text-muted-foreground -rotate-90"
          />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map(({ title, icon, label, href }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link
              href={href}
              className={`${useCheckActiveNav(href) ? "bg-secondary" : ""}`}
            >
              {icon} <span className="ml-2 max-w-52 text-wrap">{title}</span>
              {label && <span className="ml-auto text-xs">{label}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
