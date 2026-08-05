/**
 * Visitor Data Schema Structure
 * 
 * Core Visitor Data Fields:
 * - id: string - Unique identifier for the visitor
 * - full_name: string - Visitor's complete name
 * - mobile_number: string - Visitor's contact number
 * - whom_to_meet: string - Name of the person they're visiting
 * - purpose_of_visit: string - Description of the visit purpose
 * - photo_url: string - URL or path to visitor's photo
 * - time_of_entry: string - Timestamp of visitor's entry
 * - time_of_exit: string - Timestamp of visitor's exit (optional)
 * - status: "checked-in" | "checked-out" - Current visitor status
 * - created_at: string - Record creation timestamp
 * - updated_at: string - Last update timestamp
 * 
 * API Endpoints:
 * - Visitor Registration: POST /api/visitors/register
 * - Visitor Retrieval (all): GET /api/visitors
 * - Visitor Retrieval by ID: GET /api/visitors/{id}
 * - Check-in: POST /api/visitors/{id}/checkin
 * - Check-out: POST /api/visitors/{id}/checkout
 * - Visitor Validation: POST /api/visitors/validate
 * 
 * Sample JSON Request (Registration):
 * {
 *   "full_name": "John Smith",
 *   "mobile_number": "+1 234-567-8900",
 *   "whom_to_meet": "Dr. Sarah Johnson",
 *   "purpose_of_visit": "Academic Meeting"
 * }
 * 
 * Sample JSON Response (Retrieval):
 * [
 *   {
 *     "id": "1",
 *     "full_name": "John Smith",
 *     "photo_url": "/api/visitors/photos/1.jpg",
 *     "mobile_number": "+1 234-567-8900",
 *     "whom_to_meet": "Dr. Sarah Johnson",
 *     "purpose_of_visit": "Academic Meeting",
 *     "time_of_entry": "2024-01-15T09:30:00Z",
 *     "status": "checked-in"
 *   }
 * ]
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}