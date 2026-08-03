# Unit tests for SCRUM-416
from src.services.develop_visitor_registration_api_service import execute_develop_visitor_registration_api

def test_execute_develop_visitor_registration_api():
    res = execute_develop_visitor_registration_api()
    assert res['status'] == 'success'
