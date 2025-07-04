"use client"

import { AuthGuard, Layout } from "@/components"
import { studentHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"

import { AddNewUser } from "./add-new-user"
import { ListOfStudentsTable } from "./list-of-students-table"

export default function Students() {
  const activeOrgId = useAuthStore((state) => state.activeOrgId)

  const { data, isLoading } = studentHooks.useGetStudents(activeOrgId)
console.log(data);
  return (
    <AuthGuard requiredPermissions={["org:student:*", "org:student:read"]}>
      <title>Students</title>
      <Layout>
        <Layout.Header className="flex items-center justify-between gap-4">
          <Typography variant="h1">Students</Typography>
          {activeOrgId && <AddNewUser activeOrgId={activeOrgId} />}
        </Layout.Header>
        <Layout.Body>
          {isLoading && <Typography variant="h2">Loading...</Typography>}
          {data?.data?.items && activeOrgId && (
            <ListOfStudentsTable
              students={data?.data?.items}
              activeOrgId={activeOrgId}
            />
          )}
        </Layout.Body>
      </Layout>
    </AuthGuard>
  )
}
