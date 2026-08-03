# Unit tests for SCRUM-426
from src.services.develop_restful_api_endpoints_service import execute_develop_restful_api_endpoints

def test_execute_develop_restful_api_endpoints():
    res = execute_develop_restful_api_endpoints()
    assert res['status'] == 'success'
