# Unit tests for SCRUM-423
from src.services.test_checkin_api_service import execute_test_checkin_api

def test_execute_test_checkin_api():
    res = execute_test_checkin_api()
    assert res['status'] == 'success'
