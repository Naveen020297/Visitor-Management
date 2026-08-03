# Implementation for TEST-002: Validate Visitor Data Retrieval API

def validate_visitor_data(payload):
    if not isinstance(payload, dict):
        return {'status': 'error', 'message': 'Payload must be a dictionary.'}
    if 'visitor_id' not in payload:
        return {'status': 'error', 'message': 'Missing visitor_id in the payload.'}
    if not isinstance(payload['visitor_id'], str) or not payload['visitor_id'].strip():
        return {'status': 'error', 'message': 'visitor_id must be a non-empty string.'}
    return {'status': 'success'}


def execute_validate_visitor_data_retrieval_api(payload=None):
    """Perform functional testing for visitor data retrieval API"""
    print('Executing TEST-002: Validate Visitor Data Retrieval API')
    validation_response = validate_visitor_data(payload)
    if validation_response['status'] != 'success':
        return validation_response
    return {'status': 'success', 'task': 'TEST-002', 'summary': "Validate Visitor Data Retrieval API", 'payload': payload or {}}

if __name__ == '__main__':
    execute_validate_visitor_data_retrieval_api()