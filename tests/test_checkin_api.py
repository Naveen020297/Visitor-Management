# Unit tests for SCRUM-419
from src.services.checkin_api_service import execute_checkin_api

def test_execute_checkin_api():
    res = execute_checkin_api()
    assert res['status'] == 'success'
