"use client"

import { useState } from "react"
import { Search, Download, User, Calendar } from "lucide-react"

interface HistoryEntry {
  id: string
  name: string
  photo: string
  entryTime: string
  exitTime: string | null
  invitedBy: string
  status: "checked-in" | "checked-out"
  purpose: string
  date: string
}

export function VisitorHistory() {
  const [searchTerm, setSearchTerm] = useState("")

  const historyData: HistoryEntry[] = [
    {
      id: "1",
      name: "John Smith",
      photo: "/placeholder.svg?height=40&width=40",
      entryTime: "09:30 AM",
      exitTime: "11:45 AM",
      invitedBy: "Dr. Sarah Johnson",
      status: "checked-out",
      purpose: "Academic Meeting",
      date: "Today",
    },
    {
      id: "2",
      name: "Emily Davis",
      photo: "/placeholder.svg?height=40&width=40",
      entryTime: "10:15 AM",
      exitTime: null,
      invitedBy: "Prof. Michael Brown",
      status: "checked-in",
      purpose: "Research Discussion",
      date: "Today",
    },
    {
      id: "3",
      name: "Robert Wilson",
      photo: "/placeholder.svg?height=40&width=40",
      entryTime: "08:45 AM",
      exitTime: "09:30 AM",
      invitedBy: "Admin Office",
      status: "checked-out",
      purpose: "Document Submission",
      date: "Today",
    },
    {
      id: "4",
      name: "Lisa Anderson",
      photo: "/placeholder.svg?height=40&width=40",
      entryTime: "11:00 AM",
      exitTime: null,
      invitedBy: "Dr. James Miller",
      status: "checked-in",
      purpose: "Consultation",
      date: "Today",
    },
    {
      id: "5",
      name: "Michael Chen",
      photo: "/placeholder.svg?height=40&width=40",
      entryTime: "02:30 PM",
      exitTime: "04:15 PM",
      invitedBy: "Prof. Anna White",
      status: "checked-out",
      purpose: "Student Interview",
      date: "Yesterday",
    },
    {
      id: "6",
      name: "Sarah Thompson",
      photo: "/placeholder.svg?height=40&width=40",
      entryTime: "01:00 PM",
      exitTime: "03:30 PM",
      invitedBy: "Dr. Kevin Lee",
      status: "checked-out",
      purpose: "Research Collaboration",
      date: "Yesterday",
    },
  ]

  const filteredHistory = historyData.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.invitedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="visitor-history">
      {/* Header with Search and Export */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="page-title">Visitor History</h2>
          <p className="page-subtitle">Complete record of all campus visits</p>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-md-end gap-3">
            <div className="search-container">
              <div className="input-group">
                <span className="input-group-text">
                  <Search className="search-icon" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search visitors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-outline-secondary">
              <Download className="btn-icon me-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0 d-flex align-items-center">
            <Calendar className="me-2 text-primary" />
            Visitor Records ({filteredHistory.length})
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="border-0">Guest</th>
                  <th className="border-0">Entry Time</th>
                  <th className="border-0">Exit Time</th>
                  <th className="border-0">Invited By</th>
                  <th className="border-0">Status</th>
                  <th className="border-0">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="history-avatar me-3">
                          <User className="avatar-icon" />
                        </div>
                        <div>
                          <div className="history-name">{entry.name}</div>
                          <div className="history-purpose">{entry.purpose}</div>
                        </div>
                      </div>
                    </td>
                    <td className="history-time">{entry.entryTime}</td>
                    <td className="history-time">{entry.exitTime || <span className="text-muted">—</span>}</td>
                    <td className="history-invited">{entry.invitedBy}</td>
                    <td>
                      <span className={`badge ${entry.status === "checked-in" ? "badge-primary" : "badge-secondary"}`}>
                        {entry.status === "checked-in" ? "Checked In" : "Checked Out"}
                      </span>
                    </td>
                    <td className="history-date">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
