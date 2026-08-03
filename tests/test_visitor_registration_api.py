# Unit tests for SCRUM-411
from src.services.visitor_registration_api_service import execute_visitor_registration_api

def test_execute_visitor_registration_api():
    res = execute_visitor_registration_api()
    assert res['status'] == 'success'
