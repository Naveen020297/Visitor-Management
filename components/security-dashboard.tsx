"use client"

import { useState } from "react"
import { VisitorPass } from "@/components/visitor-pass"
import { Printer, LogOut, User, Clock, Users, AlertCircle } from "lucide-react"

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

  return (
    <div className="security-dashboard">
      {/* Stats Cards - aria-live region for dynamic updates */}
      <div className="row mb-4" role="region" aria-label="Visitor statistics dashboard">
        <div className="col-md-4 mb-3">
          <div className="card stat-card stat-card-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="stat-label">Currently On Campus</p>
                  <p className="stat-value text-primary"{aria-live: "polite" aria-atomic: "true"}>{checkedInCount}</p>
                </div>
                <Users className="stat-icon text-primary" aria-hidden="true" />
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
                  <p className="stat-value"{aria-live: "polite" aria-atomic: "true"}>{totalToday}</p>
                </div>
                <Clock className="stat-icon" aria-hidden="true" />
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
                  <p className="stat-value-text text-success"{aria-live: "polite" aria-atomic: "true"}>All Clear</p>
                </div>
                <AlertCircle className="stat-icon text-success" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Visitors - aria-live region for visitor list updates */}
      <div className="card" role="region" aria-label="Visitor activity table">
        <div className="card-header">
          <h3 className="card-title mb-0">Real-time Visitor Activity</h3>
        </div>
        <div className="card-body">
          {/* Table container with aria-live for dynamic updates */}
          <div className="table-responsive" role="table" aria-label="List of currently registered visitors">
            <table className="table visitor-table" aria-describedby="visitorTableDesc">
              <caption className="visually-hidden">Real-time Visitor Activity - Shows all visitors registered today with their status. Dynamic updates are announced.</caption>
              <thead>
                <tr>
                  <th scope="col">Visitor</th>
                  <th scope="col">Meeting With</th>
                  <th scope="col">Entry Time</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody aria-live="polite" aria-atomic="true">
                {visitors.map((visitor) => (
                  <tr key={visitor.id}>                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <div className="visitor-avatar-container me-2">
                          <div className="visitor-avatar">
                            <User className="avatar-icon" aria-hidden="true" />
                          </div>
                          <div
                            className={`status-indicator ${visitor.status === "checked-in" ? "status-active" : "status-inactive"}`}
                          ></div>
                        </div>
                        <span className="visitor-name fw-medium">{visitor.name}</span>
                      </div>
                    </td>
                    <td className="align-middle">{visitor.whomToMeet}</td>
                    <td className="align-middle">{visitor.timeOfEntry}</td>
                    <td className="align-middle">{visitor.purpose}</td>
                    <td className="align-middle">
                      <span
                        className={`badge status-badge ${visitor.status === "checked-in" ? "badge-primary" : "badge-secondary"}`
                      >
                        {visitor.status === "checked-in" ? "Checked In" : "Checked Out"}
                      </span>
                    </td>
                    <td className="align-middle">
                      <div className="btn-group">
                        <button 
                          onClick={() => handlePrintPass(visitor)}
                          className="btn btn-outline-primary btn-sm"
                          aria-label={`Print pass for ${visitor.name}`}
                        >
                          <Printer className="btn-icon me-1" aria-hidden="true" />
                          Print Pass
                        </button>

                        {visitor.status === "checked-in" && (
                          <button 
                            onClick={() => handleCheckOut(visitor.id)}
                            className="btn btn-outline-secondary btn-sm"
                            aria-label={`Check out ${visitor.name}`}
                          >
                            <LogOut className="btn-icon me-1" aria-hidden="true" />
                            Check Out
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Visitor Pass */}
      {showPassModal && selectedVisitor && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitle">Visitor Pass</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowPassModal(false)}
                  aria-label="Close visitor pass"
                ></button>
              </div>
              <div className="modal-body" id="modalDesc">
                <VisitorPass visitor={selectedVisitor} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* Visually hidden class for screen reader only content */
.vishually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}