# Implementation for SCRUM-419: Check-in API

import jwt
from src.services.jwt_util import validate_jwt_token

def execute_checkin_api(payload=None, token=None):
    """The API should log the visitor's check-in time"""
    if not validate_jwt_token(token):
        return {'status': 'fail', 'message': 'Invalid token'}

    print('Executing SCRUM-419: Check-in API')
    return {'status': 'success', 'task': 'SCRUM-419', 'summary': "Check-in API", 'payload': payload or {}}

if __name__ == '__main__':
    execute_checkin_api()