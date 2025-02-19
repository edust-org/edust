import {
  useDeleteInstituteByIdMutation,
  useGetMeInstitutesListsQuery,
} from "@/app/api/v0/institutes"
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
} from "@/components/ui"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Status } from "@/types"
import { cn } from "@/utils"
import { Link } from "react-router"

export const InstitutesLists = () => {
  const { data: institutes, refetch } = useGetMeInstitutesListsQuery()

  const [deleteInstitute, { isLoading: isDeleting }] =
    useDeleteInstituteByIdMutation()
  return (
    <>
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
                      institute.status === Status.PUBLISHED
                        ? "bg-green-300"
                        : institute.status === Status.DRAFT
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
                      <Link to={`edit/${institute.id}`}>
                        <DropdownMenuItem>
                          Edit <Pencil className="ml-1 w-4 text-primary" />
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() =>
                          deleteInstitute(institute.id)
                            .unwrap()
                            .then((data) => {
                              toast.success(data.message)
                              refetch()
                            })
                            .catch((error) => {
                              console.log(error)
                              toast.error(error.data.message)
                            })
                        }
                        disabled={isDeleting}
                      >
                        Delete <Trash2 className="ml-1 w-4 text-destructive" />
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
