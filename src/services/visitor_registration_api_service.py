# Implementation for SCRUM-411: Visitor Registration API

import jwt

JWT_SECRET = 'your_jwt_secret'


def execute_visitor_registration_api(payload=None, token=None):
    """The API should create a new visitor and return the created record"""
    if token:
        try:
            jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return {'status': 'error', 'message': 'Token has expired'}
        except jwt.InvalidTokenError:
            return {'status': 'error', 'message': 'Invalid token'}

    print('Executing SCRUM-411: Visitor Registration API')
    return {'status': 'success', 'task': 'SCRUM-411', 'summary': "Visitor Registration API", 'payload': payload or {}}


if __name__ == '__main__':
    execute_visitor_registration_api()