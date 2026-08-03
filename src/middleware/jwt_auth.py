import jwt
from functools import wraps
from flask import request, jsonify

SECRET_KEY = "your_secret_key_here"  # Replace with your actual secret key

# Middleware for JWT Authentication

def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Check for token in the headers
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify(message="Token is missing!"), 401

        try:
            # Decode the token using the secret key
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify(message="Token has expired!"), 401
        except jwt.InvalidTokenError:
            return jsonify(message="Invalid token!"), 401

        return f(*args, **kwargs)
    return decorated
