# Unit tests for RTR-101
from src.services.add_hello_endpoint_service import execute_add_hello_endpoint

def test_execute_add_hello_endpoint():
    res = execute_add_hello_endpoint()
    assert res['status'] == 'success'
