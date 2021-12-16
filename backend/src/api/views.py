from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Income, IncomeCategory, Expense, ExpenseCategory, BudgetCategory, Budget
from .serializers import ExpenseSerializer, ExpenseCategorySerializer, UserSerializer, IncomeSerializer, \
    IncomeCategorySerializer, BudgetSerializer, BudgetCategorySerializer, SharedBudgetCategorySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
import django_filters


class ExpenseFilter(django_filters.FilterSet):
    start_date = django_filters.filters.DateFilter(field_name='date', lookup_expr='gte')
    end_date = django_filters.filters.DateFilter(field_name='date', lookup_expr='lte')
    start_amount = django_filters.filters.NumberFilter(field_name='amount', lookup_expr='gte')
    end_amount = django_filters.filters.NumberFilter(field_name='amount', lookup_expr='lte')

    class Meta:
        model = Expense
        fields = ['start_date', 'end_date', 'start_amount', 'end_amount']

class ExpensesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    filter_class = ExpenseFilter

    def get_queryset(self):
        queryset = self.queryset
        if self.request.query_params.get('budget_id'):
            res = queryset.filter(budget_expense=self.request.query_params.get('budget_id'))
            return res
        return queryset


class ExpenseCategoriesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer


class IncomeFilter(django_filters.FilterSet):
    start_date = django_filters.filters.DateFilter(field_name='date', lookup_expr='gte')
    end_date = django_filters.filters.DateFilter(field_name='date', lookup_expr='lte')
    start_amount = django_filters.filters.NumberFilter(field_name='amount', lookup_expr='gte')
    end_amount = django_filters.filters.NumberFilter(field_name='amount', lookup_expr='lte')

    class Meta:
        model = Income
        fields = ['start_date', 'end_date', 'start_amount', 'end_amount']


class IncomesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    filter_class = IncomeFilter

    def get_queryset(self):
        queryset = self.queryset
        if self.request.query_params.get('budget_id'):
            res = queryset.filter(budget_income=self.request.query_params.get('budget_id'))
            return res
        return queryset


class IncomeCategoriesViewSet(viewsets.ModelViewSet):
    """
    Budget ViewSet.
    """
    queryset = IncomeCategory.objects.all()
    serializer_class = IncomeCategorySerializer


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
    http_method_names = ['patch', 'get', 'post', 'head']

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

class UserViewSet(viewsets.ModelViewSet):
    """
    User Registration ViewSet.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def list(self, request):
        queryset = self.queryset
        queryset = queryset.exclude(id=self.request.user.id)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
