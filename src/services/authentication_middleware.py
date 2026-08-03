# Implementation for SCRUM-429: Authentication Middleware

import jwt
from functools import wraps
from flask import request, jsonify

SECRET_KEY = 'your_secret_key'

# Decorator for JWT authentication
def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(*args, **kwargs)
    return decorated

# Function to check user roles
def check_user_role(required_role):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'message': 'Token is missing!'}), 403
            try:
                data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                user_role = data.get('role')
            except:
                return jsonify({'message': 'Invalid token!'}), 403

            if user_role != required_role:
                return jsonify({'message': 'User does not have access to this resource.'}), 403

            return f(*args, **kwargs)
        return decorated
    return decorator

if __name__ == '__main__':
    pass  # For direct execution if required
