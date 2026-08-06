# Unit tests for SCRUM-623
from src.services.page_registry_and_access_service import execute_page_registry_and_access

def test_execute_page_registry_and_access():
    res = execute_page_registry_and_access()
    assert res['status'] == 'success'
