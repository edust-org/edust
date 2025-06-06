"use client"

import { AuthGuard } from "@/components"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@edust/ui"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import Loading from "./loading"

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
      await axios.get(`${defaultValues.backendURL}/api/v0/administrator/orgs`),
  })

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message
  return (
    <AuthGuard requiredPermissions={["adm:organizations:*"]}>
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
                <Link href={`organizations/${organization.id}`}>
                  {" "}
                  Details{" "}
                </Link>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthGuard>
  )
}
