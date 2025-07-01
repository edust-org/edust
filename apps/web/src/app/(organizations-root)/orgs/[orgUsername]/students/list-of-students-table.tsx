import { AvatarWithStatus } from "@/components"
import { studentHooks } from "@/hooks/react-query"
import { Student } from "@/lib/api/v0/organizations/organization-types"
import { useAuthStore } from "@/store"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@edust/ui"
import { MoreHorizontal, Trash2 } from "lucide-react"

interface ListOfStudentsTableProps {
  students: Student[]
  activeOrgId: string
}

export const ListOfStudentsTable: React.FC<ListOfStudentsTableProps> = ({
  students,
  activeOrgId,
}) => {
  const deleteStudentById = studentHooks.useDeleteStudentById()

  const onlineUsers = useAuthStore((state) => state.onlineUsers)

  return (
    <>
      <Table className="mx-auto max-w-2xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                <AvatarWithStatus
                  src={student.profilePic}
                  alt={student.name}
                  status={onlineUsers.has(student.id) ? "online" : "offline"}
                />
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        deleteStudentById.mutate({
                          orgId: activeOrgId,
                          orgStudentId: student.orgStudentId,
                        })
                      }
                    >
                      <Trash2 /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
