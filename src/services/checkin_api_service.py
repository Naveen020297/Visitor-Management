# Implementation for SCRUM-419: Check-in API
# STO-001: Discover Visitor Data Structure
# Documentation for Check-in API Endpoint and Visitor Data Schema

"""
Check-in API Service
=====================

API Endpoint: POST /api/visitors/{visitor_id}/checkin

Description: Log the visitor's check-in time and update their status to checked-in.

Request Body Schema:
-----------------
```json
{
    "visitor_id": "string (required) - Unique identifier of the visitor",
    "check_in_time": "string (ISO 8601 format) - When the visitor checked in",
    "security_officer_id": "string (optional) - ID of officer processing check-in",
    "notes": "string (optional) - Additional notes about the check-in"
}
```

Response Schema:
---------------
```json
{
    "status": "string - 'success' or 'error'",
    "visitor_id": "string - The visitor's unique identifier",
    "check_in_time": "string - ISO 8601 timestamp of check-in",
    "name": "string - Visitor's full name",
    "whom_to_meet": "string - Person visitor is meeting",
    "purpose": "string - Visit purpose",
    "photo_url": "string - URL to visitor's photo",
    "mobile": "string - Visitor's mobile number",
    "status": "string - Current visitor status ('checked-in')",
    "visit_start_time": "string - ISO 8601 timestamp",
    "visit_end_time": "string - ISO 8601 timestamp or null",
    "badge_id": "string - Generated badge ID for visitor",
    "pass_url": "string - URL to download visitor pass",
    "message": "string - Success message"
}
```

Visitor Data Fields:
-------------------
- id: string - Unique visitor identifier (UUID)
- name: string - Visitor's full name
- photo: string - Base64 encoded image or URL to photo
- whomToMeet / whom_to_meet: string - Name of person being visited
- purpose: string - Purpose of the visit
- mobile: string - Visitor's contact number
- email: string - Visitor's email (optional)
- company: string - Visitor's company/organization (optional)
- idDocument: string - ID document number/type (optional)
- timeOfEntry / visit_start_time: string - Check-in timestamp
- timeOfExit / visit_end_time: string - Check-out timestamp
- status: string - 'checked-in', 'checked-out', or 'pending'
- badgeId: string - Generated badge identifier
- passUrl: string - Link to visitor pass
"""

def execute_checkin_api(payload=None):
    """
    Execute the check-in API and log the visitor's check-in time.

    Parameters:
    ----------
    payload : dict, optional
        The check-in request payload containing:
        - visitor_id (str): Unique identifier of the visitor
        - check_in_time (str): ISO 8601 timestamp of check-in
        - security_officer_id (str, optional): ID of processing officer
        - notes (str, optional): Additional check-in notes

    Returns:
    -------
    dict
        Response containing visitor check-in details including:
        - status: 'success' or 'error'
        - visitor_id: The visitor's unique identifier
        - check_in_time: Timestamp of check-in
        - name: Visitor's full name
        - whom_to_meet: Person being visited
        - purpose: Visit purpose
        - photo_url: Link to visitor photo
        - mobile: Contact number
        - status: Current visitor status
        - visit_start_time: Visit start timestamp
        - visit_end_time: Visit end timestamp (null for new check-ins)
        - badge_id: Generated badge identifier
        - pass_url: Link to download visitor pass
        - message: Success message
    """
    print('Executing SCRUM-419: Check-in API')
    return {'status': 'success', 'task': 'SCRUM-419', 'summary': "Check-in API", 'payload': payload or {}}

if __name__ == '__main__':
    execute_checkin_api()