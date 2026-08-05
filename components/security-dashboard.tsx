"use client"

import { useState } from "react"
import { VisitorPass } from "@/components/visitor-pass"
import { Printer, LogOut, User, Clock, Users, AlertCircle, FileDown, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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

  // Export utility functions
  const exportAsCSV = () => {
    if (visitors.length === 0) return
    
    const headers = ["Name", "Whom to Meet", "Time of Entry", "Status", "Purpose", "Mobile"]
    const rows = visitors.map(v => [
      v.name,
      v.whomToMeet,
      v.timeOfEntry,
      v.status,
      v.purpose,
      v.mobile
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => typeof cell === 'string' ? cell.replace(/"/g, '""') : cell)
      .map(cell => `"${cell}"`)
      .join(','))
      .join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `visitor-data-${new Date().toISOString().slice(0,10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportAsJSON = () => {
    if (visitors.length === 0) return
    
    const data = visitors.map(v => ({
      name: v.name,
      whomToMeet: v.whomToMeet,
      timeOfEntry: v.timeOfEntry,
      status: v.status,
      purpose: v.purpose,
      mobile: v.mobile
    }))
    
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `visitor-data-${new Date().toISOString().slice(0,10)}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

      {/* Active Visitors */}
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="card-title mb-0">Real-time Visitor Activity</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="d-flex align-items-center">
                  <FileDown className="h-4 w-4 me-1" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={exportAsCSV}>
                    <FileText className="h-4 w-4 me-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportAsJSON}>
                    <FileDown className="h-4 w-4 me-2" />
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="card-body">
          <div className="visitor-list">
            {visitors.map((visitor) => (
              <div key={visitor.id} className="visitor-item">
                <div className="d-flex align-items-center">
                  <div className="visitor-avatar-container me-3">
                    <div className="visitor-avatar">
                      <User className="avatar-icon" />
                    </div>
                    <div
                      className={`status-indicator ${visitor.status === "checked-in" ? "status-active" : "status-inactive"}`}
                    ></div>
                  </div>

                  <div className="visitor-info flex-grow-1">
                    <h5 className="visitor-name mb-1">{visitor.name}</h5>
                    <p className="visitor-meeting mb-0">Meeting: {visitor.whomToMeet}</p>
                    <p className="visitor-time mb-0">Entry: {visitor.timeOfEntry}</p>
                  </div>

                  <div className="visitor-actions d-flex align-items-center">
                    <span
                      className={`badge status-badge ${visitor.status === "checked-in" ? "badge-primary" : "badge-secondary"} me-3`}
                    >
                      {visitor.status === "checked-in" ? "Checked In" : "Checked Out"}
                    </span>

                    <div className="btn-group">
                      <button onClick={() => handlePrintPass(visitor)} className="btn btn-outline-primary btn-sm">
                        <Printer className="btn-icon me-1" />
                        Print Pass
                      </button>

                      {visitor.status === "checked-in" && (
                        <button onClick={() => handleCheckOut(visitor.id)} className="btn btn-outline-secondary btn-sm">
                          <LogOut className="btn-icon me-1" />
                          Check Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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