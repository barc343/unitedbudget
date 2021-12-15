from rest_framework import routers
from .views import ExpensesViewSet, UserViewSet, IncomesViewSet, BudgetsViewSet, BudgetsCategoriesViewSet, \
    SharedBudgetsCategoriesViewSet, IncomeCategoriesViewSet, ExpenseCategoriesViewSet

router = routers.SimpleRouter()
router.register(r'expense', ExpensesViewSet, basename='expense')
router.register(r'expense_categories', ExpenseCategoriesViewSet, basename='expense')
router.register(r'income', IncomesViewSet, basename='income')
router.register(r'income_categories', IncomeCategoriesViewSet, basename='income_categories')
router.register(r'budget', BudgetsViewSet, basename='budget')
router.register(r'budget_categories', BudgetsCategoriesViewSet, basename='budget_categories')
router.register(r'shared_budget_categories', SharedBudgetsCategoriesViewSet, basename='shared_budget_categories')
router.register(r'user', UserViewSet, basename='register')
api_urlpatterns = router.urls
