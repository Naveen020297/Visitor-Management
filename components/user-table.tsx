"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type Row,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { ChevronUp, ChevronDown, User, Phone, Clock, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

interface User {n  id: string
  name: string
  phone: string
  lastVisitTime: string
}

const initialUsers: User[] = [
  { id: "1", name: "John Smith", phone: "+1 234-567-8900", lastVisitTime: "09:30 AM" },
  { id: "2", name: "Emily Davis", phone: "+1 234-567-8901", lastVisitTime: "10:15 AM" },
  { id: "3", name: "Robert Wilson", phone: "+1 234-567-8902", lastVisitTime: "08:45 AM" },
  { id: "4", name: "Lisa Anderson", phone: "+1 234-567-8903", lastVisitTime: "11:00 AM" },
  { id: "5", name: "Michael Brown", phone: "+1 234-567-8904", lastVisitTime: "09:45 AM" },
  { id: "6", name: "Sarah Johnson", phone: "+1 234-567-8905", lastVisitTime: "10:30 AM" },
  { id: "7", name: "David Lee", phone: "+1 234-567-8906", lastVisitTime: "11:15 AM" },
  { id: "8", name: "Anna Martinez", phone: "+1 234-567-8907", lastVisitTime: "09:00 AM" },
  { id: "9", name: "James Wilson", phone: "+1 234-567-8908", lastVisitTime: "10:00 AM" },
  { id: "10", name: "Jennifer Kim", phone: "+1 234-567-8909", lastVisitTime: "09:15 AM" },
]

export function UserTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]
  
  const columns = React.useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc" ? "desc" : "asc")}
        >
          <User className="h-4 w-4" />
          <span>Name</span>
          {column.getIsSorted() === "asc" && <ChevronUp className="h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="h-4 w-4" />}
        </button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc" ? "desc" : "asc")}
        >
          <Phone className="h-4 w-4" />
          <span>Phone</span>
          {column.getIsSorted() === "asc" && <ChevronUp className="h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="h-4 w-4" />}
        </button>
      ),
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "lastVisitTime",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc" ? "desc" : "asc")}
        >
          <Clock className="h-4 w-4" />
          <span>Last Visit Time</span>
          {column.getIsSorted() === "asc" && <ChevronUp className="h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="h-4 w-4" />}
        </button>
      ),
      cell: ({ row }) => <div>{row.getValue("lastVisitTime")}</div>,
    },
  ])

  const table = useReactTable({
    data: initialUsers,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const handleExport = () => {
    const rows = table.getRowModel().rows
    const headers = ["Name", "Phone", "Last Visit Time"]
    const csvContent =
      headers.join(",") + "\n" +
      rows.map((row) => {
        const cells = headers.map((header) => {
          const value = row.original[header.toLowerCase().replace(" ", "")]
          return `"${value}"`
        })
        return cells.join(",")
      }).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "users.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Table</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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

      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md p-2 hover:bg-muted disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="rounded-md px-3 py-1.5 hover:bg-muted disabled:opacity-50"
            onClick={() => table.setPageSize(10)}
          >
            10 / page
          </button>
          <button
            className="rounded-md p-2 hover:bg-muted disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

import { useReactTable } from "@tanstack/react-table"