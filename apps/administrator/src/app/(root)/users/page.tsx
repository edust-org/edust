"use client"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { OrganizationRoles, Roles } from "@/types"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { useState } from "react"

import Loading from "./loading"

interface Organization {
  id: string
  name: string
  username: string | null
  email: string
  profilePic: string | null
  systemRole: null | Roles
  organizationRoles: null | OrganizationRoles[]
}

export default function UsersPage() {
  const [position, setPosition] = useState("bottom")
  const { isPending, error, data } = useQuery({
    queryKey: ["organizationData"],
    queryFn: async () =>
      await axios.get(`${defaultValues.backendURL}/api/v0/administrator/users`),
  })
  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>UserName</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((organization: Organization) => (
            <TableRow key={organization.id}>
              <TableCell className="font-medium">{organization.name}</TableCell>
              <TableCell>{organization.email}</TableCell>
              <TableCell>{organization.username}</TableCell>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top">
                      <Link href={`/users/feedback/?id=${organization.id}`}>
                        Feedback
                      </Link>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      <Link href={`/users/institutes/?id=${organization.id}`}>
                        {" "}
                        Institute
                      </Link>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      <Link
                        href={`/users/organizations/?id=${organization.id}`}
                      >
                        Organization
                      </Link>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
