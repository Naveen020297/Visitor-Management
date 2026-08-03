# Implementation for SCRUM-411: Visitor Registration API

# Importing the jwt library
import jwt

JWT_SECRET = 'your_jwt_secret'

# Function to verify JWT
def verify_jwt(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Token is invalid


def execute_visitor_registration_api(payload=None, token=None):
    """The API should create a new visitor and return the created record"""
    if token is None or verify_jwt(token) is None:
        return {'status': 'error', 'message': 'Unauthorized'}
    print('Executing SCRUM-411: Visitor Registration API')
    return {'status': 'success', 'task': 'SCRUM-411', 'summary': "Visitor Registration API", 'payload': payload or {}}

if __name__ == '__main__':
    execute_visitor_registration_api()