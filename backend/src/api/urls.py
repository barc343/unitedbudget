from rest_framework import routers
from .views import ExpensesViewSet, UserRegisterViewSet

router = routers.SimpleRouter()
router.register(r'expense', ExpensesViewSet, basename='expense')
router.register(r'register', UserRegisterViewSet, basename='register')
api_urlpatterns = router.urls
