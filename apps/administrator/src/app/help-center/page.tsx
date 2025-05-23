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

interface HelpCenter {
  id: string
  createdAt: string
  title: string
  status: string
  slug: string
}

export default function HelpCenter() {
  const { isPending, error, data } = useQuery({
    queryKey: ["instituteData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/help-center`,
      ),
  })

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message
  return (
    <AuthGuard requiredPermissions={["adm:help_center:*"]}>
      <Table>
        <TableCaption>A list of help center.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead> Status</TableHead>
            <TableHead>CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((helpCenter: HelpCenter) => (
            <TableRow key={helpCenter.id}>
              <TableCell className="text-left">{helpCenter.title}</TableCell>

              <TableCell>{helpCenter.slug}</TableCell>
              <TableCell>{helpCenter.status}</TableCell>

              <TableCell>{helpCenter.createdAt}</TableCell>

              <TableCell>
                <Link
                  href={`/help-center/${helpCenter.id}`}
                  className="text-blue-500 underline"
                >
                  Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AuthGuard>
  )
}
