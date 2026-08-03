# JWT Authentication Middleware

from functools import wraps
from flask import request, jsonify
import jwt

SECRET_KEY = "your_secret_key_here"  # Change this to a secure key


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None

        # Check if Token is provided
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]  # Bearer Token

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            # Decode token
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data['user']  # get user information from the token
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(current_user, *args, **kwargs)

    return decorator

