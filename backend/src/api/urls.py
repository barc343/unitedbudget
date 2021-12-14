from rest_framework import routers
from .views import ExpensesViewSet

router = routers.SimpleRouter()
router.register(r'expense', ExpensesViewSet, basename='expense')
api_urlpatterns = router.urls
