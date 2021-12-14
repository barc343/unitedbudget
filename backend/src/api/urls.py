from rest_framework import routers
from .views import ExpensesViewSet, UserRegisterViewSet, IncomesViewSet, BudgetsViewSet, BudgetsCategoriesViewSet, SharedBudgetsCategoriesViewSet

router = routers.SimpleRouter()
router.register(r'expense', ExpensesViewSet, basename='expense')
router.register(r'income', IncomesViewSet, basename='income')
router.register(r'budget', BudgetsViewSet, basename='budget')
router.register(r'budget_categories', BudgetsCategoriesViewSet, basename='budget_categories')
router.register(r'shared_budget_categories', SharedBudgetsCategoriesViewSet, basename='shared_budget_categories')
router.register(r'register', UserRegisterViewSet, basename='register')
api_urlpatterns = router.urls
