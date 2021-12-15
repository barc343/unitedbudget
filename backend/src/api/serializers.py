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
        extra_kwargs = {
            'owner': {'read_only': True}
        }

    def create(self, validated_data):
        budget_category = BudgetCategory(
            name=validated_data['name'],
            owner=self.context['request'].user,
            description=validated_data['description'],
        )
        print(validated_data['shared_users'])
        budget_category.save()
        budget_category.shared_users.set(validated_data['shared_users'])
        return budget_category


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
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
