# Unit tests for TEST-001
from src.services.validate_visitor_registration_api_service import execute_validate_visitor_registration_api

def test_execute_validate_visitor_registration_api():
    res = execute_validate_visitor_registration_api()
    assert res['status'] == 'success'

    # Document visitor registration request/response JSON format
    # Expected request payload fields:
    # - full_name: str - Visitor's full name
    # - mobile_number: str - Contact phone number
    # - whom_to_meet: str - Name of person being visited
    # - purpose_of_visit: str - Description of visit purpose
    # - photo: str (optional) - Base64 encoded image or URL

    # Expected response format:
    # {
    #   'status': 'success' | 'error',
    #   'visitor_id': str (on successful registration),
    #   'message': str (confirmation message),
    #   'data': {
    #     'id': str,
    #     'full_name': str,
    #     'mobile_number': str,
    #     'whom_to_meet': str,
    #     'purpose_of_visit': str,
    #     'photo_url': str,
    #     'visit_type': str,
    #     'created_at': str,
    #     'expires_at': str,
    #     'status': str
    #   }
    # }
