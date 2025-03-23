"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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

interface Institutes {
  id: string
  name: string
  instituteCategory: string
  createdAt: string
  slug: string
  contactEmail: string
  website: string
  phoneNumber: string
  country: string
  author: { name: string; profilePic: string }
}

export default function Institute() {
  const { isPending, error, data } = useQuery({
    queryKey: ["instituteData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/institutes`,
      ),
  })

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <Table>
        <TableCaption>A list of institutes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Institute Category</TableHead>
           
            <TableHead>Contact Email</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Author Name</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((institutes: Institutes) => (
            <TableRow key={institutes.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={institutes?.author?.profilePic}
                    alt={institutes?.author?.name}
                  />
                  <AvatarFallback>Edust</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{institutes.name}</TableCell>
              <TableCell>{institutes.instituteCategory}</TableCell>
              <TableCell>{institutes.contactEmail}</TableCell>
              <TableCell>
                <Link
                  href={institutes.website}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Visit
                </Link>
              </TableCell>
              <TableCell>{institutes.phoneNumber}</TableCell>
              <TableCell>{institutes.country}</TableCell>
              <TableCell>{institutes?.author?.name}</TableCell>

              <TableCell>
                <Link
                  href={`/institutes/${institutes.id}`}
                  className="text-blue-500 underline"
                >
                  Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
