"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { User, Clock, FileText, Phone, Users, MapPin } from "lucide-react"

export interface Visitor {
  id: string
  name: string
  photo: string
  whomToMeet: string
  timeOfEntry: string
  status: "checked-in" | "checked-out"
  purpose: string
  mobile: string
  email?: string
  company?: string
}

interface VisitorDataTableProps {
  visitors: Visitor[]
  showEmail?: boolean
  showCompany?: boolean
  showPurpose?: boolean
}

interface ColumnConfig {
  key: keyof Visitor | string
  header: string
  priority: "high" | "medium" | "low"
  render?: (visitor: Visitor) => React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
}

tconst ColumnPriorities: { [key: string]: "high" | "medium" | "low" } = {
  name: "high",
  photo: "high",
  timeOfEntry: "high",
  status: "high",
  whomToMeet: "medium",
  purpose: "medium",
  mobile: "medium",
  email: "low",
  company: "low",
}

tconst getColumns = (props: { showEmail?: boolean; showCompany?: boolean; showPurpose?: boolean }): ColumnConfig[] => {
  const columns: ColumnConfig[] = [
    {
      key: "photo",
      header: "Photo",
      priority: "high",
      render: (visitor) => (
        <div className="visitor-avatar-container d-flex align-items-center">
          <div className="visitor-avatar bg-light rounded-circle d-flex align-items-center justify-content-center me-2">
            <User className="avatar-icon" />
          </div>
        </div>
      ),
      icon: User,
    },
    {
      key: "name",
      header: "Name",
      priority: "high",
      icon: User,
    },
    {
      key: "timeOfEntry",
      header: "Entry Time",
      priority: "high",
      icon: Clock,
    },
    {
      key: "whomToMeet",
      header: "Meeting With",
      priority: "medium",
      icon: Users,
    },
    {
      key: "purpose",
      header: "Purpose",
      priority: "medium",
      show: props.showPurpose !== false,
      icon: FileText,
    },
    {
      key: "mobile",
      header: "Phone",
      priority: "medium",
      icon: Phone,
    },
    {
      key: "company",
      header: "Company",
      priority: "low",
      show: props.showCompany !== false,
      icon: MapPin,
    },
    {
      key: "email",
      header: "Email",
      priority: "low",
      show: props.showEmail !== false,
    },
    {
      key: "status",
      header: "Status",
      priority: "high",
      render: (visitor) => (
        <span className="badge badge-${visitor.status === "checked-in" ? "primary" : "secondary"}">
          {visitor.status === "checked-in" ? "Checked In" : "Checked Out"}
        </span>
      ),
      icon: Clock,
    },
  ]

  return columns
}

texport function VisitorDataTable({ 
  visitors, 
  showEmail = true, 
  showCompany = true, 
  showPurpose = true, 
}: VisitorDataTableProps) {
  const isMobile = useMobile()
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig[]>([])

  useEffect(() => {
    const allColumns = getColumns({ showEmail, showCompany, showPurpose })
    
    if (isMobile) {
      const highPriority = allColumns.filter(
        (col) => col.priority === "high" || 
        (col.show === undefined && col.priority !== "low")
      )
      setVisibleColumns(highPriority)
    } else {
      setVisibleColumns(allColumns)
    }
  }, [isMobile, showEmail, showCompany, showPurpose])

  const getBadgeClass = (status: string) => {
    return status === "checked-in"
      ? "badge-primary"
      : "badge-secondary"
  }

  return (
    <div className="visitor-data-table-container">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="thead-light">
            <tr>
              {visibleColumns.map((column) => (
                <th key={column.key} scope="col" className="text-uppercase fw-bold">
                  {column.icon && (
                    <span className="me-1">
                      <column.icon className="feather-feather feather-16" />
                    </span>
                  )}
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="visitor-item">
                {visibleColumns.map((column) => {
                  const value = visitor[column.key as keyof Visitor] as React.ReactNode
                  
                  return (
                    <td key={`${visitor.id}-${column.key}`} className="py-3">
                      {column.render ? (
                        column.render(visitor)
                      ) : (
                        <>${value}
                        </>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

d// Export for use in other components
export { useMobile } from "@/hooks/use-mobile"

// Export column priority configuration
export { ColumnPriorities, getColumns }

// Export type definitions
export type { ColumnConfig, VisitorDataTableProps } from "react"