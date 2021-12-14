from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Income, IncomeCategory, Expense, ExpenseCategory, BudgetCategory, Budget
from .serializers import ExpenseSerializer, ExpenseCategorySerializer, CreateUserSerializer
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response


class ExpensesViewSet(viewsets.ViewSet):
    queryset = Expense.objects.all()

    def list(self, request):
        queryset = Expense.objects.all()
        serializer = ExpenseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Expense.objects.all()
        expense_single = get_object_or_404(queryset, pk=pk)
        serializer = ExpenseSerializer(expense_single)
        return Response(serializer.data)
# Create your views here.

class UserRegisterViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]