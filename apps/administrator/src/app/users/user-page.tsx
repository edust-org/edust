"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Download,
  MoreHorizontal,
  Plus,
  PlusCircle,
  Search,
  Settings2,
} from "lucide-react"
import {
  CheckCircle,     // for "Done"
  Timer,         // for "In-progress"
  Circle,          // for "Todo"
  XCircle,         // for "Canceled"
  HelpCircle       // for unknown/default
} from "lucide-react";
import { Badge } from "@edust/ui"
import { Button } from "@edust/ui"
import { Checkbox } from "@edust/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@edust/ui"
import { Input } from "@edust/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@edust/ui"

interface Task {
  id: string
  title: string
  type: "documentation" | "feature" | "bug" | "enhancement"
  status: "Todo" | "In-progress" | "Done" | "Canceled"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  estimatedHours?: number
}

// Mock data to simulate the tasks shown in the screenshot
const mockTasks: Task[] = [
  {
    id: "TASK-9910",
    title: "document the back-end SSD program, that should hard drive the CLI har...",
    type: "documentation",
    status: "Done",
    priority: "Medium",
    createdAt: "May 9, 2025",
    estimatedHours: 8,
  },
  {
    id: "TASK-9475",
    title: "feature the hard drive, then you can connect the back-end dr...",
    type: "feature",
    status: "Done",
    priority: "Medium",
    createdAt: "May 9, 2025",
    estimatedHours: 12,
  },
  {
    id: "TASK-8721",
    title: "I'll input the haptic SSL alarm, that should array the DRAM system!",
    type: "documentation",
    status: "Done",
    priority: "Medium",
    createdAt: "May 9, 2025",
    estimatedHours: 6,
  },
  {
    id: "TASK-9512",
    title: "I'll navigate the optical SMTP program, that should matrix the OCR microc...",
    type: "feature",
    status: "Done",
    priority: "Medium",
    createdAt: "May 9, 2025",
    estimatedHours: 10,
  },
  {
    id: "TASK-9678",
    title: "If we copy the interface, we can get to the RAM capacitor through the ope...",
    type: "feature",
    status: "Done",
    priority: "Medium",
    createdAt: "May 10, 2025",
    estimatedHours: 14,
  },
  {
    id: "TASK-2121",
    title: "The HTTP sensor is down, calculate the neural alarm so we can connect t...",
    type: "documentation",
    status: "Done",
    priority: "Medium",
    createdAt: "May 10, 2025",
    estimatedHours: 4,
  },
  {
    id: "TASK-9635",
    title: "I'll quantify the multi-byte TCP panel, that should bus the RAM array!",
    type: "enhancement",
    status: "Done",
    priority: "Medium",
    createdAt: "May 10, 2025",
    estimatedHours: 16,
  },
  {
    id: "TASK-2751",
    title: "We need to connect the 1080p SMTP array!",
    type: "bug",
    status: "In-progress",
    priority: "Low",
    createdAt: "May 10, 2025",
    estimatedHours: 3,
  },
  {
    id: "TASK-0461",
    title: "Overriding the port won't do anything, we need to parse the 1080p SDD ci...",
    type: "enhancement",
    status: "In-progress",
    priority: "Low",
    createdAt: "May 10, 2025",
    estimatedHours: 8,
  },
  {
    id: "TASK-5707",
    title: "I'll transmit the auxiliary IP card, that should microchip the SMTP card!",
    type: "feature",
    status: "In-progress",
    priority: "Low",
    createdAt: "May 10, 2025",
    estimatedHours: 12,
  },
]

export default function UsersPages() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const getStatusIcon = (status: string) => {
    const baseClass = "h-4 w-4";

    switch (status) {
      case "Done":
        return <CheckCircle className={`${baseClass} text-green-500`} />;
      case "In-progress":
        return <Timer className={`${baseClass} text-blue-500`} />;
      case "Todo":
        return <Circle className={`${baseClass} text-gray-400`} />;
      case "Canceled":
        return <XCircle className={`${baseClass} text-red-500`} />;
      default:
        return <HelpCircle className={`${baseClass} text-muted-foreground`} />;
    }
  };


  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <ArrowUp className="h-4 w-4 text-red-500" />
      case "Medium":
        return <ArrowRight className="h-4 w-4 text-yellow-500" />
      case "Low":
        return <ArrowDown className="h-4 w-4 text-green-500" />
      default:
        return <ArrowRight className="h-4 w-4 text-gray-400" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "bug":
        return "bg-red-50 text-red-700 border-red-200"
      case "enhancement":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "documentation":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const columns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: "id",
      header: "Task",
      cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("id")}</div>,
      size: 120,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-transparent p-0 h-auto font-normal"
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const task = row.original
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getTypeColor(task.type)} flex-shrink-0`}>
              {task.type}
            </Badge>
            <span className="truncate text-sm max-w-[300px]">{task.title}</span>
          </div>
        )
      },
      size: 400,
    },
    {
      id: "status",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-normal"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        const task = row.original
        return (
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <span className="text-sm">{task.status}</span>
          </div>
        )
      },
      accessorFn: (row) => row.status,
      size: 120,
    },
    {
      id: "priority",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
            <ArrowRight className="h-4 w-4" />
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-normal"
            >
              Priority
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        const task = row.original
        return (
          <div className="flex items-center gap-2">
            {getPriorityIcon(task.priority)}
            <span className="text-sm">{task.priority}</span>
          </div>
        )
      },
      accessorFn: (row) => row.priority,
      sortingFn: (rowA, rowB) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 }
        const a = priorityOrder[rowA.original.priority as keyof typeof priorityOrder]
        const b = priorityOrder[rowB.original.priority as keyof typeof priorityOrder]
        return a - b
      },
      size: 100,
    },
    {
      id: "estimatedHours",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-normal"
            >
              Est. Hours
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        const task = row.original
        return <div className="text-sm text-center">{task.estimatedHours || "-"}</div>
      },
      accessorFn: (row) => row.estimatedHours,
      size: 100,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-normal"
            >
              Created At
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-sm">{row.getValue("createdAt")}</div>,
      size: 120,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit task</DropdownMenuItem>
              <DropdownMenuItem>Duplicate task</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 50,
    },
  ]

  const table = useReactTable({
    data: mockTasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
  })

  const statusOptions = ["Todo", "In-progress", "Done", "Canceled"]
  const priorityOptions = ["Low", "Medium", "High"]
  const estimatedHoursOptions = [3, 4, 6, 8, 10, 12, 14, 16]
  const createdAtOptions = ["May 9, 2025", "May 10, 2025"]

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-[70rem] mx-auto space-y-4">
        {/* Header Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search titles..."
                value={globalFilter ?? ""}
                onChange={(event: { target: { value: any } }) => setGlobalFilter(String(event.target.value))}
                className="w-[250px] pl-10 h-9"
              />
            </div>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 gap-1">
                  <PlusCircle className="h-4 w-4 text-muted-foreground" /> {/* + icon */}
                  Status
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statusOptions.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={table.getColumn("status")?.getFilterValue() === status}
                    onCheckedChange={(checked: any) => {
                      table.getColumn("status")?.setFilterValue(checked ? status : undefined)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      {status}
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue(undefined)}>
                  Clear filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Priority Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 gap-1">
                  <ArrowRight className="h-4 w-4" />
                  Priority
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {priorityOptions.map((priority) => (
                  <DropdownMenuCheckboxItem
                    key={priority}
                    checked={table.getColumn("priority")?.getFilterValue() === priority}
                    onCheckedChange={(checked: any) => {
                      table.getColumn("priority")?.setFilterValue(checked ? priority : undefined)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(priority)}
                      {priority}
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => table.getColumn("priority")?.setFilterValue(undefined)}>
                  Clear filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={() => {
                setGlobalFilter("")
                setColumnFilters([])
                setRowSelection({})
                setSorting([])
              }}
              className="h-9 gap-1"
            >
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* New Task */}
            <Button className="bg-white border border-[#ccc] text-black hover:bg-gray-100 h-9">
              <Plus className="h-4 w-4" />
              <span className="ml-2 text-sm">New task</span>
            </Button>

            {/* Export */}
            <Button className="bg-white border border-[#ccc] text-black hover:bg-gray-100 h-9">
              <Download className="h-4 w-4" />
              <span className="ml-2 text-sm">Export</span>
            </Button>

            {/* View Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-white border border-[#ccc] text-black hover:bg-gray-100 h-9 gap-1">
                  <Settings2 className="h-4 w-4" />
                  <span className="text-sm">View</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(checked: any) => column.toggleVisibility(!!checked)}
                    >
                      <span className="capitalize">{column.id}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>

        {/* Table Container with horizontal scroll */}
        <div className="border rounded-md overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-gray-600 whitespace-nowrap">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-600 flex-wrap gap-4">
          <div>
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
                className="h-8 w-[70px] border border-gray-300 rounded px-2"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
