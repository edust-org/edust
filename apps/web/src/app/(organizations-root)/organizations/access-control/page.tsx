"use client"

import { AuthGuard, HasPermission } from "@/components"
import {
  Button,
  Separator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Typography,
} from "@/components/ui"
import { useAppSelector } from "@/lib/store/hooks"
import { Edit } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "qs"

import { RoleForm } from "./role-form"
import { useRoles } from "./use-roles"
import { ViewPermissions } from "./view-permissions"

export default function AccessControl() {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const roleId = searchParams.get("roleId")
  const roleName = decodeURIComponent(searchParams.get("roleName") || "")

  const ref = searchParams.get("ref")
  const editRoleId = searchParams.get("id")

  const state = useAppSelector((state) => state.authentication)

  // Use the custom hook to fetch roles
  const {
    data: roleLists = [],
    isLoading,
    isError,
  } = useRoles(state.activeOrgId)

  if (isLoading) {
    return <Typography variant="h3">Loading...</Typography>
  }

  if (isError) {
    return (
      <Typography className="text-destructive">Error loading roles</Typography>
    )
  }

  return (
    <AuthGuard requiredPermissions="org:menu:access_control">
      <Typography variant="h2" className="mb-8">
        Access Control Page
      </Typography>

      <section className="flex h-full items-start gap-4">
        <SidebarMenu className="max-w-48 gap-4">
          {roleLists.map((role) => (
            <SidebarMenuItem key={role.id}>
              <SidebarMenuButton asChild>
                <div className="flex w-full items-center justify-between">
                  <Link
                    href={`?roleId=${role.id}&roleName=${role.name}`}
                    className="grow"
                  >
                    <span>{role.name}</span>
                  </Link>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => {
                      router.push(
                        pathname +
                          "?" +
                          qs.stringify(
                            { ref: "edit_role", id: role.id },
                            { encode: false },
                          ),
                      )
                    }}
                  >
                    <Edit />
                  </Button>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <Separator orientation="vertical" />
        <div className="grow">
          {roleId && roleName ? (
            <ViewPermissions roleId={roleId} roleName={roleName} />
          ) : (
            <HasPermission
              requiredPermissions={[
                "org:access_control:role:create",
                "org:access_control:role:update",
              ]}
            >
              <RoleForm isEditable={ref === "edit_role"} roleId={editRoleId} />
            </HasPermission>
          )}
        </div>
      </section>
    </AuthGuard>
  )
}
