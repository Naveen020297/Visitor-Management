# Unit tests for SCRUM-622
from src.services.card_click_routing_service import execute_card_click_routing

def test_execute_card_click_routing():
    res = execute_card_click_routing()
    assert res['status'] == 'success'
