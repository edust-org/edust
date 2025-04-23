"use client"

import { OrganizationGuard } from "@/components"
import {
  Separator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Typography,
} from "@/components/ui"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useAppSelector } from "@/lib/store/hooks"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import React, { useEffect, useState } from "react"

import { ViewPermissions } from "./view-permissions"

// Define the type for a single role item
type RoleItem = {
  id: string
  name: string
}

export default function AccessControl() {
  const searchParams = useSearchParams()
  const roleId = searchParams.get("roleId")
  const roleName = decodeURIComponent(searchParams.get("roleName") || "")

  const state = useAppSelector((state) => state.authentication)

  // State for role lists with explicit type
  const [roleLists, setRoleLists] = useState<RoleItem[]>([])

  useEffect(() => {
    axios
      .get(
        `${defaultValues.backendURL}/api/v0/organizations/${state.activeOrgId}/access-control/roles`,
      )
      .then((res) => {
        setRoleLists(res.data?.data?.items || [])
      })
      .catch((err) => {
        console.error(err)
      })
  }, [state.activeOrgId])

  return (
    <OrganizationGuard requiredPermissions="org:menu:access_control">
      <Typography variant="h2" className="mb-8">
        Access Control Page
      </Typography>

      <section className="flex h-full items-start gap-4">
        <SidebarMenu className="max-w-36">
          {roleLists.map((role) => (
            <SidebarMenuItem key={role.id}>
              <SidebarMenuButton asChild>
                <Link href={`?roleId=${role.id}&roleName=${role.name}`}>
                  <span>{role.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <Separator orientation="vertical" />
        <div className="grow">
          {roleId && roleName && (
            <ViewPermissions roleId={roleId} roleName={roleName} />
          )}
        </div>
      </section>
    </OrganizationGuard>
  )
}
