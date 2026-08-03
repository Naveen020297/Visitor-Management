# Implementation for SCRUM-419: Check-in API

import jwt  # Import JWT library

JWT_SECRET = 'your_jwt_secret'  # Replace with your JWT secret


def authenticate(jwt_token):
    try:
        jwt.decode(jwt_token, JWT_SECRET, algorithms=['HS256'])
        return True
    except jwt.ExpiredSignatureError:
        return False
    except jwt.InvalidTokenError:
        return False


def execute_checkin_api(payload=None, jwt_token=None):
    """The API should log the visitor's check-in time"""
    if not jwt_token or not authenticate(jwt_token):
        return {'status': 'unauthorized', 'message': 'Invalid or missing JWT token.'}
    print('Executing SCRUM-419: Check-in API')
    return {'status': 'success', 'task': 'SCRUM-419', 'summary': "Check-in API", 'payload': payload or {}}

if __name__ == '__main__':
    execute_checkin_api()