"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { defaultValues } from "@/configs";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";


interface Institute {
  id: string
  comments: string
  status: string
  name: string
  country: string
  slug: string
  language: string
}

export default function InstitutePage() {
  const [users, setUsers] = useState([])
  const searchParams = useSearchParams()

  const id = searchParams.get("id")

  useEffect(() => {
    async function getInstitute() {
      try {
        const response = await axios.get(
          `${defaultValues.backendURL}/api/v0/administrator/users/${id}/institutes`,
        )
        console.log(response.data.data.items)
        setUsers(response.data.data.items)
      } catch (error) {
        console.error(error)
      }
    }
    getInstitute()
  }, [id])
  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Language</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: Institute) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.status}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>{user.slug}</TableCell>
              <TableCell>{user.language}</TableCell>

              {/* <TableCell className="text-right">{user.profilePic}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}