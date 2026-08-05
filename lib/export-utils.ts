"use client"

/**
 * Export utility functions for data export functionality
 * Supports CSV and JSON export with Blob-based downloads
 */

type ExportableData = Record<string, unknown>

/**
 * Formats a value for CSV output, handling strings, numbers, booleans, and nested objects
 */
function formatCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return ""
  }
  
  if (typeof value === "string") {
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (value.includes(",") || value.includes("\"") || value.includes("\n") || value.includes("\r")) {
      return `"${value.replace(/\"/g, "\\"")}"`
    }
    return value
  }
  
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  
  if (typeof value === "object") {
    // Handle nested objects/arrays by converting to JSON string
    return `"${JSON.stringify(value).replace(/\"/g, "\\"")}"`
  }
  
  return `"${String(value).replace(/\"/g, "\\\"")}"`
}

/**
 * Converts an array of objects to a CSV string
 * @param data - Array of objects to export
 * @param filename - Base filename without extension (used for default column order inference)
 * @returns CSV string representation of the data
 */
export function exportAsCsv(data: ExportableData[], filename = "export"): string {
  if (!Array.isArray(data) || data.length === 0) {
    return ""
  }
  
  // Get all unique keys from all objects to create comprehensive headers
  const headersSet = new Set<string>()
  data.forEach(item => {
    if (item && typeof item === "object") {
      Object.keys(item).forEach(key => headersSet.add(key))
    }
  })
  
  const headers = Array.from(headersSet)
  
  if (headers.length === 0) {
    return ""
  }
  
  // Create CSV header row
  const headerRow = headers.map(h => formatCsvValue(h)).join(",")
  
  // Create CSV data rows
  const dataRows = data.map(row => {
    return headers.map(header => formatCsvValue(row[header])).join(",")
  })
  
  // Combine all rows
  return [headerRow, ...dataRows].join("\n")
}

/**
 * Converts an array of objects to a JSON string with pretty formatting
 * @param data - Array of objects to export
 * @returns JSON string representation of the data
 */
export function exportAsJson(data: ExportableData[]): string {
  if (!Array.isArray(data)) {
    return "[]"
  }
  
  try {
    return JSON.stringify(data, null, 2)
  } catch (error) {
    console.error("Error exporting to JSON:", error)
    return "[]"
  }
}

/**
 * Triggers a file download using Blob URL
 * @param content - The content to write to the file
 * @param filename - The complete filename including extension
 * @param mimeType - The MIME type for the file (default: text/csv)
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = "text/csv;charset=utf-8;"
): void {
  try {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.style.display = "none"
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up the URL object after a short delay
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    console.error("Error downloading file:", error)
    alert("There was an error generating the export file. Please try again.")
  }
}

/**
 * Exports data as CSV and triggers download
 * @param data - Array of objects to export
 * @param filename - Base filename without extension
 */
export function downloadAsCsv(data: ExportableData[], filename = "export"): void {
  const timestamp = new Date().toISOString().split(".")[0].replace(/[:]/g, "-")
  const csvContent = exportAsCsv(data, filename)
  
  if (!csvContent) {
    alert("No data available to export")
    return
  }
  
  downloadFile(csvContent, `${filename}-${timestamp}.csv`, "text/csv;charset=utf-8;")
}

/**
 * Exports data as JSON and triggers download
 * @param data - Array of objects to export
 * @param filename - Base filename without extension
 */
export function downloadAsJson(data: ExportableData[], filename = "export"): void {
  const timestamp = new Date().toISOString().split(".")[0].replace(/[:]/g, "-")
  const jsonContent = exportAsJson(data)
  
  if (!jsonContent || jsonContent === "[]") {
    alert("No data available to export")
    return
  }
  
  downloadFile(jsonContent, `${filename}-${timestamp}.json", "application/json;charset=utf-8;")
}"