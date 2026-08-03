# Unit tests for TEST-001
from src.services.validate_visitor_registration_api_service import execute_validate_visitor_registration_api

# Mock JWT token for testing
JWT_TOKEN = "mock_jwt_token"

# Test function to validate visitor registration API with JWT

def test_execute_validate_visitor_registration_api():
    # Here you would normally set the JWT token in the request header if applicable
    res = execute_validate_visitor_registration_api(payload={"token": JWT_TOKEN})
    assert res['status'] == 'success'