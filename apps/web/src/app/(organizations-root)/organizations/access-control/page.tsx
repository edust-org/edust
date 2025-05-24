"use client"

import { AuthGuard, HasPermission } from "@/components"
import { accessControlHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { Roles } from "@/types"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@edust/ui"
import { Edit } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "qs"

import { Layout } from "../components/layout"
import { RoleForm } from "./role-form"
import { UserLists } from "./user-lists"
import { ViewPermissions } from "./view-permissions"

export default function AccessControl() {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const roleId = searchParams.get("roleId")
  const roleName = decodeURIComponent(searchParams.get("roleName") || "")

  const ref = searchParams.get("ref")
  const editRoleId = searchParams.get("id")

  const state = useAuthStore()

  const { data, isLoading, isError } = accessControlHooks.useGetRoles(
    state.activeOrgId,
  )

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
      <title> Access Control</title>
      <Layout>
        <Layout.Header>
          <Typography variant="h2" className="mb-8">
            Access Control Page
          </Typography>
        </Layout.Header>
        <Layout.Body>
          <section className="flex h-full items-start gap-4">
            <SidebarMenu className="max-w-48 gap-4">
              <HasPermission
                requiredPermissions={[
                  "org:access_control:role:*",
                  "org:access_control:role:create",
                ]}
                fallback
              >
                <Link href={"/organizations/access-control"}>
                  <Button className="w-full" size={"sm"}>
                    New Role
                  </Button>
                </Link>
              </HasPermission>
              {data?.data?.items?.map((role) => (
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
                <>
                  <Tabs defaultValue="permissions">
                    <TabsList>
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>

                      {/* disabled for owner role assign */}
                      {roleName !== Roles.owner && (
                        <TabsTrigger value="users">Users</TabsTrigger>
                      )}
                    </TabsList>
                    <TabsContent value="permissions">
                      <ViewPermissions roleId={roleId} roleName={roleName} />
                    </TabsContent>
                    {/* disabled for owner role assign */}
                    {roleName !== Roles.owner && (
                      <TabsContent value="users">
                        <UserLists roleId={roleId} roleName={roleName} />
                      </TabsContent>
                    )}
                  </Tabs>
                </>
              ) : (
                <HasPermission
                  requiredPermissions={[
                    "org:access_control:role:*",
                    "org:access_control:role:create",
                    "org:access_control:role:update",
                  ]}
                >
                  <RoleForm
                    isEditable={ref === "edit_role"}
                    roleId={editRoleId}
                  />
                </HasPermission>
              )}
            </div>
          </section>
        </Layout.Body>
      </Layout>
    </AuthGuard>
  )
}
