"use client"

import { Printer, User, Calendar, Shield } from "lucide-react"

interface Visitor {
  id: string
  name: string
  photo: string
  whomToMeet: string
  timeOfEntry: string
  purpose: string
  mobile: string
}

interface VisitorPassProps {
  visitor: Visitor
}

export function VisitorPass({ visitor }: VisitorPassProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="visitor-pass-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Visitor Pass</h5>
        <button onClick={handlePrint} className="btn btn-primary btn-sm">
          <Printer className="btn-icon me-2" />
          Print Pass
        </button>
      </div>

      {/* Visitor Pass Design */}
      <div className="visitor-pass">
        <div className="pass-header">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <Shield className="pass-logo me-2" />
            <h4 className="pass-title mb-0">CAMPUS VISITOR</h4>
          </div>
          <p className="pass-subtitle mb-0">College Campus Security</p>
        </div>

        {/* Visitor Photo */}
        <div className="pass-photo-section">
          <div className="pass-photo">
            <User className="photo-placeholder" />
          </div>
        </div>

        {/* Visitor Details */}
        <div className="pass-details">
          <div className="detail-group mb-3">
            <p className="detail-label">FULL NAME</p>
            <p className="detail-value">{visitor.name}</p>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <p className="detail-label">INVITED BY</p>
              <p className="detail-value-sm">{visitor.whomToMeet}</p>
            </div>
            <div className="col-6">
              <p className="detail-label">TIME</p>
              <p className="detail-value-sm">{visitor.timeOfEntry}</p>
            </div>
          </div>

          <div className="detail-group mb-3">
            <p className="detail-label">PURPOSE</p>
            <p className="detail-value-sm">{visitor.purpose}</p>
          </div>

          <div className="detail-group mb-3">
            <p className="detail-label d-flex align-items-center">
              <Calendar className="me-1" style={{ width: "12px", height: "12px" }} />
              DATE
            </p>
            <p className="detail-value-sm">{currentDate}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pass-footer">
          <div className="validity-notice mb-3">
            <p className="validity-text">VALID FOR TODAY ONLY</p>
          </div>
          <p className="pass-instructions">This pass must be visible at all times while on campus</p>
          <p className="pass-id">
            Pass ID: {visitor.id.toUpperCase()}-{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
