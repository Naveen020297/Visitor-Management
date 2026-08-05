"use client"

import { useState, useEffect } from "react"
import { User, Phone, Clock } from "lucide-react"

interface User {
  id: string
  name: string
  phone: string
  lastVisit: string | null
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

texport function UsersDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  })

  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: "asc" | "desc" } | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [pagination.currentPage])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `/api/v1/users?page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      const data = await response.json()
      setUsers(data.users || [])
      setPagination((prev) => ({
        ...prev,
        totalPages: data.totalPages || 1,
        totalItems: data.totalItems || data.users?.length || 0,
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig) return 0
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    if (aValue === null) return 1
    if (bValue === null) return -1
    if (typeof aValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    return 0
  })

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const formatLastVisit = (lastVisit: string | null) => {
    if (!lastVisit) return "Never"
    try {
      const date = new Date(lastVisit)
      return date.toLocaleString("en-US", {
        dateStyle: "MMM d, yyyy",
        timeStyle: "short",
      })
    } catch {
      return lastVisit
    }
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> {error}
          </div>
          <button className="btn btn-primary mt-3" onClick={fetchUsers}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title mb-0">Users Directory</h3>
        <small className="text-muted">Total: {pagination.totalItems} users</small>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <span className="d-flex align-items-center">
                    <User className="me-1" size={16} />
                    Name
                  </span>
                </th>
                <th onClick={() => handleSort("phone")}>
                  <span className="d-flex align-items-center cursor-pointer">
                    <Phone className="me-1" size={16} />
                    Phone
                    {sortConfig?.key === "phone" && (
                      <span className="ms-1">
                        {sortConfig.direction === "asc" ? "\u25B2" : "\u25BC"}
                      </span>
                    )}
                  </span>
                </th>
                <th onClick={() => handleSort("lastVisit")}>
                  <span className="d-flex align-items-center cursor-pointer">
                    <Clock className="me-1" size={16} />
                    Last Visit
                    {sortConfig?.key === "lastVisit" && (
                      <span className="ms-1">
                        {sortConfig.direction === "asc" ? "\u25B2" : "\u25BC"}
                      </span>
    