"use client"

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
import { useSearchParams } from "next/navigation"

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
  const searchParams = useSearchParams()

  const id = searchParams.get("id")

  const { isPending, error, data } = useQuery({
    queryKey: ["instituteData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/users/${id}/institutes`,
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
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Language</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((institute: Institute) => (
            <TableRow key={institute.id}>
              <TableCell className="font-medium">{institute.status}</TableCell>
              <TableCell>{institute.name}</TableCell>
              <TableCell>{institute.country}</TableCell>
              <TableCell>{institute.slug}</TableCell>
              <TableCell>{institute.language}</TableCell>

              {/* <TableCell className="text-right">{user.profilePic}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
