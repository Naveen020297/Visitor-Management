"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Visitor {
  id: string
  name: string
  email: string
  company: string
  phone: string
  purpose: string
  timeIn: string
  timeOut: string
  status: "checked-in" | "checked-out" | "pending"
}

interface VisitorTableProps {
  visitors?: Visitor[]
}

const defaultVisitors: Visitor[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Tech Corp",
    phone: "+1 234-567-8900",
    purpose: "Client Meeting",
    timeIn: "09:30 AM",
    timeOut: "-",
    status: "checked-in",
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    company: "Design Inc",
    phone: "+1 234-567-8901",
    purpose: "Interview",
    timeIn: "10:15 AM",
    timeOut: "-",
    status: "checked-in",
  },
  {
    id: "3",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    company: "Startup XYZ",
    phone: "+1 234-567-8902",
    purpose: "Presentation",
    timeIn: "08:45 AM",
    timeOut: "11:30 AM",
    status: "checked-out",
  },
]

export function VisitorTable({ visitors = defaultVisitors }: VisitorTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead className="min-w-[150px]">Name</TableHead>
            <TableHead className="hidden md:table-cell min-w-[180px]">Email</TableHead>
            <TableHead className="hidden md:table-cell min-w-[120px]">Company</TableHead>
            <TableHead className="min-w-[120px]">Phone</TableHead>
            <TableHead className="hidden sm:table-cell min-w-[120px]">Purpose</TableHead>
            <TableHead className="hidden sm:table-cell min-w-[100px]">Time In</TableHead>
            <TableHead className="hidden sm:table-cell min-w-[100px]">Time Out</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">#{visitor.id}</TableCell>
              <TableCell className="font-medium text-foreground">{visitor.name}</TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {visitor.email}
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {visitor.company}
              </TableCell>
              <TableCell className="text-sm">{visitor.phone}</TableCell>
              <TableCell className="hidden sm:table-cell text-sm">
                {visitor.purpose}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm">
                {visitor.timeIn}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-sm">
                {visitor.timeOut}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(visitor.status)}`}
                >
                  {visitor.status.replace("-", " ").toUpperCase()}n                </TableCell>
              </TableRow>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function getStatusClass(status: string): string {
  switch (status) {
    case "checked-in":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "checked-out":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    default:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  }
}