"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import Loading from "./loading"
import { AuthGuard } from "@/components"

interface Organization {
  id: string
  name: string
  orgUsername: string
  createdAt: string
  site: { id: string }
}

export default function OrganizationPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["organizationData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/organizations`,
      ),
  })

  if (isPending) return (<Loading/>)

  if (error) return "An error has occurred: " + error.message
  return (
    <AuthGuard requiredPermissions={['adm:organizations:*']}>
      <Table>
        <TableCaption>A list of organizations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>Site ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((organization: Organization) => (
            <TableRow key={organization.id}>
              <TableCell className="font-medium">{organization.name}</TableCell>
              <TableCell>{organization.createdAt}</TableCell>
              <TableCell>{organization.site?.id}</TableCell>
              <TableCell>
                {" "}
                <Link href={`organizations/${organization.id}`}> Details </Link>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthGuard>
  )
}
