# Generated by Django 3.2.10 on 2021-12-14 18:20

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_core'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='income',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name='budget',
            name='expenses',
            field=models.ManyToManyField(blank=True, to='api.Expense'),
        ),
        migrations.AlterField(
            model_name='budget',
            name='income',
            field=models.ManyToManyField(blank=True, to='api.Income'),
        ),
        migrations.AlterField(
            model_name='budgetcategory',
            name='shared_users',
            field=models.ManyToManyField(blank=True, related_name='_api_budgetcategory_shared_users_+', to=settings.AUTH_USER_MODEL),
        ),
    ]