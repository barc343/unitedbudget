from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Expense, ExpenseCategory, BudgetCategory, Budget, IncomeCategory, Income


class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):
    category = ExpenseCategorySerializer()

    class Meta:
        model = Expense
        fields = '__all__'


class IncomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeCategory
        fields = '__all__'


class IncomeSerializer(serializers.ModelSerializer):
    category = IncomeCategorySerializer()

    class Meta:
        model = Income
        fields = '__all__'


class BudgetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetCategory
        fields = '__all__'


class SharedBudgetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetCategory
        fields = '__all__'


class BudgetSerializer(serializers.ModelSerializer):
    income = IncomeSerializer(read_only=True, many=True)
    expenses = ExpenseSerializer(read_only=True, many=True)

    class Meta:
        model = Budget
        fields = '__all__'


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
            raise serializers.ValidationError('User with this email is exist')
        except User.DoesNotExist:
            user = User(
                email=validated_data['email'],
                username=validated_data['username']
            )
            user.set_password(validated_data['password'])
            user.save()
            return user
