# Unit tests for SCRUM-427
from src.services.develop_api_for_visitor_management_service import execute_develop_api_for_visitor_management

def test_execute_develop_api_for_visitor_management():
    res = execute_develop_api_for_visitor_management()
    assert res['status'] == 'success'
