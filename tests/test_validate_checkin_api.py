# Unit tests for TEST-003
from src.services.validate_checkin_api_service import execute_validate_checkin_api

# Check-in data structure: This service validates check-in requests
# Expected check-in data format includes:
# - visitor_id: str (unique identifier for visitor)
# - employee_id: str (identifies employee being visited)
# - checkin_time: str (ISO format timestamp)
# - checkin_location: str (building/room where check-in occurred)
# - checkin_method: str (e.g., 'tablett', 'web', 'mobile')
# - status: str ('active' | 'completed' | 'failed')

# API Endpoint: POST /api/checkin/validate
# Request body JSON structure:
# {
#   "visitor_id": "vis_12345",
#   "employee_id": "emp_67890",
#   "checkin_time": "2024-01-15T09:30:00Z",
#   "checkin_location": "Building_A_Room_101",
#   "checkin_method": "tablett",
#   "status": "active"
# }
# Response JSON structure:
# {
#   "status": "success",
#   "message": "Check-in validated successfully",
#   "data": {
#     "visitor_id": "vis_12345",
#     "employee_name": "Dr. Sarah Johnson",
#     "visit_purpose": "Academic Meeting",
#     "expiry_time": "2024-01-15T11:30:00Z",
#     "pass_type": "visitor_pass"
#   }
# }

def test_execute_validate_checkin_api():
    res = execute_validate_checkin_api()
    assert res['status'] == 'success'