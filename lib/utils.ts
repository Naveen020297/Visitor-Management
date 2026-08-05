import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskPhoneNumber(phoneNumber: string | null | undefined): string {
  // Handle null, undefined, or empty inputs
  if (!phoneNumber || phoneNumber.trim() === "") {
    return "***-***-****"
  }

  // Remove any non-numeric characters to get clean digits
  const digits = phoneNumber.replace(/\D/g, "")

  // Return masked format
  if (digits.length === 0) {
    return "***-***-****"
  }

  if (digits.length < 4) {
    return `***-***-${digits}`
  }

  // Show last 4 digits when we have 4 or more
  const lastFour = digits.slice(-4)
  return `***-***-${lastFour}`
}