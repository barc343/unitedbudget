from rest_framework import serializers

class ExpenseCategorySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    description = serializers.CharField()

class ExpenseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=200)
    description = serializers.CharField()
    category = ExpenseCategorySerializer()
    amount = serializers.DecimalField(max_digits=7, decimal_places=2)
    date = serializers.DateField()
