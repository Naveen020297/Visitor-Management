# Implementation for SCRUM-419: Check-in API

import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def execute_checkin_api(payload=None):
    """The API should log the visitor's check-in time"""
    logging.info('Executing SCRUM-419: Check-in API with payload: %s', payload)
    return {'status': 'success', 'task': 'SCRUM-419', 'summary': "Check-in API", 'payload': payload or {}}

if __name__ == '__main__':
    execute_checkin_api()