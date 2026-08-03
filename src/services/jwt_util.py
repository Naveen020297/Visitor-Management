import jwt
import datetime

# Secret key for encoding and decoding JWTs
SECRET_KEY = 'your_secret_key'

def generate_token(data, expiration=30):
    """Generates a JWT token.
    Args:
        data (dict): The payload to encode in the token.
        expiration (int): Expiration time in minutes.
    Returns:
        str: Encoded JWT token.
    """
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=expiration)
    data['exp'] = expiration_time
    token = jwt.encode(data, SECRET_KEY, algorithm='HS256')
    return token


def decode_token(token):
    """Decodes a JWT token.
    Args:
        token (str): The JWT token to decode.
    Returns:
        dict: The decoded payload.
    Raises:
        jwt.ExpiredSignatureError: If the token is expired.
        jwt.InvalidTokenError: If the token is invalid.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError('Token has expired')
    except jwt.InvalidTokenError:
        raise jwt.InvalidTokenError('Invalid token')