import pytest
from django.urls import reverse
from api import urls

@pytest.fixture
def api_client():
   from rest_framework.test import APIClient
   return APIClient()


@pytest.mark.django_db
def test_unauthorized_request(api_client):
   url = '/user/'
   response = api_client.get(url)
   assert response.status_code == 401


@pytest.mark.django_db
def test_budget_request(api_client):
   url = '/budget/'
   api_client.login(username='mark', password='demo')
   response = api_client.get(url)
   assert response.status_code == 401


@pytest.mark.django_db
def test_budget_category_request(api_client):
   url = '/budget_categories/'
   api_client.login(username='mark', password='demo')
   response = api_client.get(url)
   assert response.status_code == 401


@pytest.mark.django_db
def test_shared_budget_categories_request(api_client):
   url = '/shared_budget_categories/'
   api_client.login(username='mark', password='demo')
   response = api_client.get(url)
   assert response.status_code == 401


@pytest.mark.django_db
def test_expense_request(api_client):
   url = '/expense/'
   api_client.login(username='mark', password='demo')
   response = api_client.get(url)
   assert response.status_code == 401


@pytest.mark.django_db
def test_expense_categories_request(api_client):
   url = '/expense_categories/'
   api_client.login(username='mark', password='demo')
   response = api_client.get(url)
   assert response.status_code == 401


@pytest.mark.django_db
def test_income_request(api_client):
   url = '/income/'
   api_client.login(username='mark', password='demo')
   response = api_client.get(url)
   assert response.status_code == 401


@pytest.mark.django_db
def test_income_categories_request(api_client):
   url = '/income_categories/'
   api_client.login(username='mark', password='demo')
   response = api_client.get(url)
   assert response.status_code == 401