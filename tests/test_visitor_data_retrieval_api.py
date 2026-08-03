# Unit tests for SCRUM-417
from src.services.visitor_data_retrieval_api_service import execute_visitor_data_retrieval_api

def test_execute_visitor_data_retrieval_api():
    res = execute_visitor_data_retrieval_api()
    assert res['status'] == 'success'
