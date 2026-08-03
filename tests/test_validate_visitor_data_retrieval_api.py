# Unit tests for TEST-002
from src.services.validate_visitor_data_retrieval_api_service import execute_validate_visitor_data_retrieval_api

def test_execute_validate_visitor_data_retrieval_api():
    res = execute_validate_visitor_data_retrieval_api()
    assert res['status'] == 'success'
