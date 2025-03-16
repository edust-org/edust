"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { defaultValues } from "@/configs";
import axios from "@/lib/axios";
import { Status } from "@/types";
import { useSearchParams } from "next/navigation";



import { useEffect, useState } from "react";





interface Organization {
  id: string
  status: Status
  name: string
  orgUsername: string
  email: string | null
  profilePic: string | null
}
export default function OrganizationPage() {
  const [users, setUsers] = useState([])
  const searchParams = useSearchParams()

  const id = searchParams.get("id")

  useEffect(() => {
    async function getOrganizations() {
      try {
        const response = await axios.get(
          `${defaultValues.backendURL}/api/v0/administrator/users/${id}/organizations`,
        )

        setUsers(response.data.data.items)
        console.log(response.data.data.items)
      } catch (error) {
        console.error(error)
      }
    }
    getOrganizations()
  }, [id])

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
          {users.map((user: Organization) => (
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