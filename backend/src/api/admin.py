from django.contrib import admin
from .models import IncomeCategory, Income, ExpenseCategory, Expense, BudgetCategory, Budget

# Register your models here.

admin.site.register(IncomeCategory)
admin.site.register(Income)
admin.site.register(ExpenseCategory)
admin.site.register(Expense)
admin.site.register(BudgetCategory)
admin.site.register(Budget)
