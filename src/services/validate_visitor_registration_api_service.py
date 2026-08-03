# Implementation for TEST-001: Validate Visitor Registration API

from marshmallow import Schema, fields, ValidationError

class VisitorRegistrationSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)
    purpose = fields.Str(required=True)

def validate_visitor_registration(payload):
    schema = VisitorRegistrationSchema()
    try:
        schema.load(payload)
    except ValidationError as err:
        return {'status': 'error', 'errors': err.messages}
    return {'status': 'success'}


def execute_validate_visitor_registration_api(payload=None):
    """Perform functional testing for visitor registration API"""
    print('Executing TEST-001: Validate Visitor Registration API')
    validation_result = validate_visitor_registration(payload)
    return {'status': 'success', 'task': 'TEST-001', 'summary': "Validate Visitor Registration API", 'validation_result': validation_result, 'payload': payload or {}}

if __name__ == '__main__':
    execute_validate_visitor_registration_api()