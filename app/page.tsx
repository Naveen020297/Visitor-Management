"use client"

import { useState } from "react"
import { TabletRegistration } from "@/components/tablet-registration"
import { SecurityDashboard } from "@/components/security-dashboard"
import { VisitorHistory } from "@/components/visitor-history"
import { Shield, Tablet, History } from "lucide-react"

export default function VisitorManagementSystem() {
  const [activeTab, setActiveTab] = useState("tablet")

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      const tabs = ["tablet", "dashboard", "history"]
      const currentIndex = tabs.indexOf(activeTab)
      const nextIndex = (currentIndex + 1) % tabs.length
      setActiveTab(tabs[nextIndex])
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      const tabs = ["tablet", "dashboard", "history"]
      const currentIndex = tabs.indexOf(activeTab)
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length
      setActiveTab(tabs[prevIndex])
    }
  }

  return (
    <div className="visitor-management-system">
      <header className="main-header">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <div className="logo-container me-3">
                <Shield className="logo-icon" />
              </div>
              <div>
                <h1 className="header-title mb-0">Campus Visitor Management</h1>
                <p className="header-subtitle mb-0">Secure • Simple • Trusted</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="admin-avatar me-2"></div>
              <span className="admin-name">Security Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-pills nav-fill custom-nav mb-4" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "tablet" ? "active" : ""}`
                  onClick={() => setActiveTab("tablet")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "tablet"}
                  aria-controls="tablet-panel"
                  onKeyDown={(e) => handleKeyDown(e, "tablet")}
                >
                  <Tablet className="nav-icon me-2" />
                  Tablet Registration
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`
                  onClick={() => setActiveTab("dashboard")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "dashboard"}
                  aria-controls="dashboard-panel"
                  onKeyDown={(e) => handleKeyDown(e, "dashboard")}
                >
                  <Shield className="nav-icon me-2" />
                  Security Dashboard
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "history" ? "active" : ""}`
                  onClick={() => setActiveTab("history")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "history"}
                  aria-controls="history-panel"
                  onKeyDown={(e) => handleKeyDown(e, "history")}
                >
                  <History className="nav-icon me-2" />
                  Visitor History
                </button>
              </li>
            </ul>

            <div className="tab-content" role="tablist">
              <div
                className={`tab-pane fade ${activeTab === "tablet" ? "show active" : ""}`}
                id="tablet-panel"
                role="tabpanel"
                aria-labelledby="tablet-tab"
                aria-hidden={activeTab !== "tablet"}
              >
                <TabletRegistration />
              </div>
              <div
                className={`tab-pane fade ${activeTab === "dashboard" ? "show active" : ""}`}
                id="dashboard-panel"
                role="tabpanel"
                aria-labelledby="dashboard-tab"
                aria-hidden={activeTab !== "dashboard"}
              >
                <SecurityDashboard />
              </div>
              <div
                className={`tab-pane fade ${activeTab === "history" ? "show active" : ""}`}
                id="history-panel"
                role="tabpanel"
                aria-labelledby="history-tab"
                aria-hidden={activeTab !== "history"}
              >
                <VisitorHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}