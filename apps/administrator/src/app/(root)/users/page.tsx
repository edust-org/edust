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
import Link from "next/link"

import { useEffect, useState } from "react"

interface User {
  id: string
  name: string
  username: string | null
  email: string
  profilePic: string | null
  systemRole: null | Roles
  organizationRoles: null | OrganizationRoles[]
  // createdAt: Date
  // updatedAt: Date
}

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [position, setPosition] = useState("bottom")
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          `${defaultValues.backendURL}/api/v0/administrator/users`,
        )
        // console.log(response.data.data.items)
        setUsers(response.data.data.items.slice(0, 10))
      } catch (error) {
        console.error(error)
      }
    }
    getUser()
  }, [])

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>UserName</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>

              {/* <TableCell className="text-right">{user.profilePic}</TableCell> */}
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
                      <Link href={`/users/feedback/?id=${user.id}`}>
                        Feedback
                      </Link>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      <Link href={`/users/institutes/?id=${user.id}`}>
                        {" "}
                        Institute
                      </Link>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      <Link href={`/users/organizations/?id=${user.id}`}>
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
