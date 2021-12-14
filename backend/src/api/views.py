from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Income, IncomeCategory, Expense, ExpenseCategory, BudgetCategory, Budget
from .serializers import ExpenseSerializer, ExpenseCategorySerializer, CreateUserSerializer, IncomeSerializer, \
    IncomeCategorySerializer, BudgetSerializer, BudgetCategorySerializer, SharedBudgetCategorySerializer
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response


class ExpensesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class IncomesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer


class BudgetsViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def get_queryset(self):
        queryset = self.queryset
        if self.request.query_params.get('category'):
            res = queryset.filter(category=self.request.query_params.get('category'))
            return res
        return queryset

class BudgetsCategoriesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = BudgetCategory.objects.all()
    serializer_class = BudgetCategorySerializer

    def get_queryset(self):
        queryset = self.queryset
        res = queryset.filter(owner=self.request.user)
        return res

class SharedBudgetsCategoriesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = BudgetCategory.objects.all()
    serializer_class = SharedBudgetCategorySerializer

    def get_queryset(self):
        queryset = self.queryset
        res = queryset.filter(shared_users__in=[self.request.user.id])
        return res


# Create your views here.

class UserRegisterViewSet(viewsets.ModelViewSet):
    """
    User Registration ViewSet.
    """
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]
