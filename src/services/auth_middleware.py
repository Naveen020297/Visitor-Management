# JWT Authentication Middleware Implementation

import jwt
from functools import wraps
from flask import request, jsonify

SECRET_KEY = 'your_secret_key_here'  # Replace with your secret key

# Decorator to check for a valid JWT token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Check if the token is passed in the headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            # Decode the token to get the user info
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = data['user']  # Replace with actual user retrieval logic
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 403

        return f(current_user, *args, **kwargs)

    return decorated

# Example usage of the token_required decorator
# @app.route('/protected', methods=['GET'])
# @token_required
# def protected_route(current_user):
#     return jsonify({'message': 'This is a protected route', 'user': current_user})