# Unit tests for SCRUM-619
from src.services.task007_create_permissionservice_for_fetching_user_permissions_service import execute_task007_create_permissionservice_for_fetching_user_permissions

def test_execute_task007_create_permissionservice_for_fetching_user_permissions():
    res = execute_task007_create_permissionservice_for_fetching_user_permissions()
    assert res['status'] == 'success'
