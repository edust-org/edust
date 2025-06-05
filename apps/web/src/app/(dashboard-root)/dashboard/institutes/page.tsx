"use client"

import {
  useDeleteInstituteById,
  useGetMeInstitutesLists,
} from "@/hooks/react-query"
import { Status } from "@edust/types"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@edust/ui"
import { cn } from "@edust/ui/utils"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function InstitutesLists() {
  const { data: institutes, refetch } = useGetMeInstitutesLists()

  const { mutateAsync: deleteInstitute, isPending: isDeleting } =
    useDeleteInstituteById()
  return (
    <>
      <title>List of institutes | Dashboard</title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>CodeType</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>UpdatedAt</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {institutes?.map((institute) => {
            return (
              <TableRow key={institute.id}>
                <TableCell className="font-medium">{institute.name}</TableCell>
                <TableCell>{institute.instituteCategory}</TableCell>
                <TableCell>{institute.codeType}</TableCell>
                <TableCell>{institute.code}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs",
                      institute.status === Status.published
                        ? "bg-green-300"
                        : institute.status === Status.draft
                          ? "bg-slate-300"
                          : "bg-none",
                    )}
                  >
                    {institute.status}
                  </span>
                </TableCell>
                <TableCell>{institute.createdAt}</TableCell>
                <TableCell>{institute.updatedAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href={`institutes/edit/${institute.id}`}>
                        <DropdownMenuItem>
                          Edit <Pencil className="text-primary ml-1 w-4" />
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() =>
                          deleteInstitute(institute.id)
                            .then((data) => {
                              toast.success(data.message)
                              refetch()
                            })
                            .catch((error) => {
                              console.error(error)
                              toast.error(error.data.message)
                            })
                        }
                        disabled={isDeleting}
                      >
                        Delete <Trash2 className="text-destructive ml-1 w-4" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
