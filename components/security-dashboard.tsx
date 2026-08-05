use client

import { useState, useMemo } from "react"
import { VisitorPass } from "@/components/visitor-pass"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { Select, SelectTrigger, SelectList, SelectItem } from "@/components/ui/select"
import { ChevronUp, ChevronDown, Printer, LogOut, User, Clock, Users, AlertCircle } from "lucide-react"

interface Visitor {
  id: string
  name: string
  photo: string
  whomToMeet: string
  timeOfEntry: string
  status: "checked-in" | "checked-out"
  purpose: string
  mobile: string
}

type SortField = "name" | "timeOfEntry"
type SortDirection = "asc" | "desc"

export function SecurityDashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: "1",
      name: "John Smith",
      photo: "/placeholder.svg?height=60&width=60",
      whomToMeet: "Dr. Sarah Johnson",
      timeOfEntry: "09:30 AM",
      status: "checked-in",
      purpose: "Academic Meeting",
      mobile: "+1 234-567-8900",
    },
    {
      id: "2",
      name: "Emily Davis",
      photo: "/placeholder.svg?height=60&width=60",
      whomToMeet: "Prof. Michael Brown",
      timeOfEntry: "10:15 AM",
      status: "checked-in",
      purpose: "Research Discussion",
      mobile: "+1 234-567-8901",
    },
    {
      id: "3",
      name: "Robert Wilson",
      photo: "/placeholder.svg?height=60&width=60",
      whomToMeet: "Admin Office",
      timeOfEntry: "08:45 AM",
      status: "checked-out",
      purpose: "Document Submission",
      mobile: "+1 234-567-8902",
    },
    {
      id: "4",
      name: "Lisa Anderson",
      photo: "/placeholder.svg?height=60&width=60",
      whomToMeet: "Dr. James Miller",
      timeOfEntry: "11:00 AM",
      status: "checked-in",
      purpose: "Consultation",
      mobile: "+1 234-567-8903",
    },
  ])

  const [showPassModal, setShowPassModal] = useState(false)
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null)

  // Sorting and pagination state
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const handleCheckOut = (id: string) => {
    setVisitors(
      visitors.map((visitor) => (visitor.id === id ? { ...visitor, status: "checked-out" as const } : visitor)),
    )
  }

  const handlePrintPass = (visitor: Visitor) => {
    setSelectedVisitor(visitor)
    setShowPassModal(true)
  }

  const checkedInCount = visitors.filter((v) => v.status === "checked-in").length
  const totalToday = visitors.length

  // Sort visitors by name and time
  const sortedVisitors = useMemo(() => {
    return [...visitors].sort((a, b) => {
      let comparison = 0
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name)
      } else {
        comparison = a.timeOfEntry.localeCompare(b.timeOfEntry)
      }
      return sortDirection === "desc" ? -comparison : comparison
    })
  }, [visitors, sortField, sortDirection])

  // Paginate visitors
  const paginatedVisitors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedVisitors.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedVisitors, currentPage, itemsPerPage])

  const totalPages = Math.ceil(visitors.length / itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="security-dashboard">
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card stat-card stat-card-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="stat-label">Currently On Campus</p>
                  <p className="stat-value text-primary">{checkedInCount}</p>
                </div>
                <Users className="stat-icon text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card stat-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="stat-label">Total Visitors Today</p>
                  <p className="stat-value">{totalToday}</p>
                </div>
                <Clock className="stat-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card stat-card stat-card-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="stat-label">Security Status</p>
                  <p className="stat-value-text text-success">All Clear</p>
                </div>
                <AlertCircle className="stat-icon text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paginated Visitor Table *}
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="card-title mb-0">Real-time Visitor Activity</h3>
            <div className="d-flex align-items-center gap-3">
              <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                <SelectTrigger className="w-auto">
                  <span>{itemsPerPage} per page</span>
                </SelectTrigger>
                <SelectList>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectList>
              </Select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                    Name {getSortIcon("name")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("timeOfEntry")} className="cursor-pointer">
                    Last Visit Time {getSortIcon("timeOfEntry")}
                  </TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVisitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <div className="visitor-avatar me-2">
                          <User className="avatar-icon" />
                        </div>
                        {visitor.name}
                      </div>
                    </TableCell>
                    <TableCell>{visitor.timeOfEntry}</TableCell>
                    <TableCell>{visitor.mobile}</TableCell>
                    <TableCell>
                      <span className={`badge ${visitor.status === "checked-in" ? "badge-primary" : "badge-secondary"}`}>
                        {visitor.status === "checked-in" ? "Checked In" : "Checked Out"}
                      </span>
                    </TableCell>
                    <TableCell className="text-end">
                      <button onClick={() => handlePrintPass(visitor)} className="btn btn-outline-primary btn-sm me-2">
                        <Printer className="btn-icon" />
                      </button>
                      {visitor.status === "checked-in" && (
                        <button onClick={() => handleCheckOut(visitor.id)} className="btn btn-outline-secondary btn-sm">
                          <LogOut className="btn-icon" />
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="card-footer">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  />
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Modal for Visitor Pass */}
      {showPassModal && selectedVisitor && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Visitor Pass</h5>
                <button type="button" className="btn-close" onClick={() => setShowPassModal(false)}></button>
              </div>
              <div className="modal-body">
                <VisitorPass visitor={selectedVisitor} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}