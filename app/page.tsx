"use client"

import { useState } from "react"
import { TabletRegistration } from "@/components/tablet-registration"
import { SecurityDashboard } from "@/components/security-dashboard"
import { VisitorHistory } from "@/components/visitor-history"
import { UserList } from "@/components/user-list"
import { Shield, Tablet, History } from "lucide-react"

export default function VisitorManagementSystem() {
  const [activeTab, setActiveTab] = useState("tablet")

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
                  className={`nav-link ${activeTab === "tablet" ? "active" : ""}`}
                  onClick={() => setActiveTab("tablet")}
                  type="button"
                  role="tab"
                >
                  <Tablet className="nav-icon me-2" />
                  Tablet Registration
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
                  onClick={() => setActiveTab("dashboard")}
                  type="button"
                  role="tab"
                >
                  <Shield className="nav-icon me-2" />
                  Security Dashboard
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "history" ? "active" : ""}`}
                  onClick={() => setActiveTab("history")}
                  type="button"
                  role="tab"
                >
                  <History className="nav-icon me-2" />
                  Visitor History
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "users" ? "active" : ""}`}
                  onClick={() => setActiveTab("users")}
                  type="button"
                  role="tab"
                >
                  Users
                </button>
              </li>
            </ul>

            <div className="tab-content">
              <div className={`tab-pane fade ${activeTab === "tablet" ? "show active" : ""}`}>                
                <TabletRegistration />
              </div>
              <div className={`tab-pane fade ${activeTab === "dashboard" ? "show active" : ""}`}>                
                <SecurityDashboard />
              </div>
              <div className={`tab-pane fade ${activeTab === "history" ? "show active" : ""}`}>                
                <VisitorHistory />
              </div>
              <div className={`tab-pane fade ${activeTab === "users" ? "show active" : ""}`}>                
                <UserList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}