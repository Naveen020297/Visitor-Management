"use client"

import { useState, useEffect } from "react"
import { TabletRegistration } from "@/components/tablet-registration"
import { SecurityDashboard } from "@/components/security-dashboard"
import { VisitorHistory } from "@/components/visitor-history"
import { Shield, Tablet, History } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

// Simulated visitor data type
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

export default function VisitorManagementSystem() {
  const [activeTab, setActiveTab] = useState("tablet")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [visitors, setVisitors] = useState<Visitor[]>([])

  // Simulate data fetching when dashboard tab becomes active
  useEffect(() => {
    if (activeTab === "dashboard") {
      setIsLoading(true)
      setError(null)
      
      // Simulate API call with timeout
      const fetchData = setTimeout(() => {
        try {
          // Simulated data fetch - in real app this would be an API call
          const mockVisitors: Visitor[] = [
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
          ]
          setVisitors(mockVisitors)
          setIsLoading(false)
        } catch (err) {
          setError("Failed to load visitor data. Please try again later.")
          setIsLoading(false)
        }
      }, 1500)

      return () => clearTimeout(fetchData)
    }
  }, [activeTab])

  // Handle error retry
  const handleRetry = () => {
    setVisitors([])
    setError(null)
    setIsLoading(true)
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
            </ul>

            <div className="tab-content">
              <div className={`tab-pane fade ${activeTab === "tablet" ? "show active" : ""}`}> 
                <TabletRegistration />
              </div>
              <div className={`tab-pane fade ${activeTab === "dashboard" ? "show active" : ""}`}> 
                {isLoading ? (
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <Skeleton className="h-6 w-64 mb-3" />
                        </div>
                        <div className="card-body">
                          <div className="row mb-4">
                            <div className="col-md-4 mb-3">
                              <Skeleton className="h-20 w-full" />
                            </div>
                            <div className="col-md-4 mb-3">
                              <Skeleton className="h-20 w-full" />
                            </div>
                            <div className="col-md-4 mb-3">
                              <Skeleton className="h-20 w-full" />
                            </div>
                          </div>
                          <Skeleton className="h-1 w-full" />
                          <div className="mt-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full mt-2" />
                            <Skeleton className="h-10 w-full mt-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : error ? (
                  <Alert variant="destructive" className="m-4">
                    <AlertTitle>Connection Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <SecurityDashboard visitors={visitors} />
                )}
              </div>
              <div className={`tab-pane fade ${activeTab === "history" ? "show active" : ""}`}> 
                <VisitorHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}