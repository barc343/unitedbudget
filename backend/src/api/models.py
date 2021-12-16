from django.db import models
from django.conf import settings
from datetime import date


# Create your models here.

class CoreModel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class IncomeCategory(CoreModel):
    pass


class Income(CoreModel):
    category = models.ForeignKey(IncomeCategory, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    date = models.DateField(default=date.today)


class ExpenseCategory(CoreModel):
    pass


class Expense(CoreModel):
    category = models.ForeignKey(ExpenseCategory, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    date = models.DateField(default=date.today)


class BudgetCategory(CoreModel):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='+'
    )
    shared_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='+',
        blank=True
    )


class Budget(CoreModel):
    category = models.ForeignKey(BudgetCategory, on_delete=models.CASCADE)
    income = models.ManyToManyField(Income, blank=True, related_name='budget_income')
    expenses = models.ManyToManyField(Expense, blank=True, related_name='budget_expense')
