import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@edust/ui"

export default function Loading() {
  return (
    <Table>
      <TableCaption>Loading users...</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>UserName</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, index) => (
          <TableRow key={index}>
            <TableCell className="h-6 w-24 animate-pulse rounded-md bg-gray-300"></TableCell>
            <TableCell className="h-6 w-32 animate-pulse rounded-md bg-gray-300"></TableCell>
            <TableCell className="h-6 w-20 animate-pulse rounded-md bg-gray-300"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
