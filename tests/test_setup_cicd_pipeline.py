# Unit tests for SCRUM-425
from src.services.setup_cicd_pipeline_service import execute_setup_cicd_pipeline

def test_execute_setup_cicd_pipeline():
    res = execute_setup_cicd_pipeline()
    assert res['status'] == 'success'
