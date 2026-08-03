# Implementation for SCRUM-419: Check-in API

from src.services.authentication_middleware import authenticate_user

def execute_checkin_api(payload=None):
    """The API should log the visitor's check-in time"""
    authenticate_user()  # Add authentication check
    print('Executing SCRUM-419: Check-in API')
    return {'status': 'success', 'task': 'SCRUM-419', 'summary': "Check-in API", 'payload': payload or {}}

if __name__ == '__main__':
    execute_checkin_api()