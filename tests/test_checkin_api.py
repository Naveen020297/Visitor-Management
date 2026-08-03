# Unit tests for SCRUM-419
from src.services.checkin_api_service import execute_checkin_api
import jwt
import pytest

JWT_SECRET = 'your_secret_key'

# Here you should replace this with your payload according to the actual JWT you expect
def create_test_token():
    payload = {'user_id': 1}
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    return token


def test_execute_checkin_api():
    token = create_test_token()
    res = execute_checkin_api({'token': token})
    assert res['status'] == 'success'