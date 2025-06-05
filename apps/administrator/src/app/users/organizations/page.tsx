"use client"

import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { Status } from "@edust/types"
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
import { useSearchParams } from "next/navigation"

interface Organization {
  id: string
  status: Status
  name: string
  orgUsername: string
  email: string | null
  profilePic: string | null
}
export default function OrganizationPage() {
  const searchParams = useSearchParams()

  const id = searchParams.get("id")

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/users/${id}/organizations`,
      ),
  })
  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>OrgUsername</TableHead>
            <TableHead>profilePic</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((user: Organization) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.status}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.orgUsername}</TableCell>
              <TableCell>{user.profilePic}</TableCell>

              {/* <TableCell className="text-right">{user.profilePic}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
