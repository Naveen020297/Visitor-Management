# Unit tests for TEST-001
from src.services.validate_visitor_registration_api_service import execute_validate_visitor_registration_api

def test_execute_validate_visitor_registration_api():
    res = execute_validate_visitor_registration_api()
    assert res['status'] == 'success'
