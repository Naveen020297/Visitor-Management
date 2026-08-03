# Unit tests for TEST-003
from src.services.validate_checkin_api_service import execute_validate_checkin_api

def test_execute_validate_checkin_api():
    res = execute_validate_checkin_api()
    assert res['status'] == 'success'
