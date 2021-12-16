#!/bin/sh

python ../manage.py loaddata budget.json
python ../manage.py loaddata budget_category.json
python ../manage.py loaddata expense.json
python ../manage.py loaddata expense_category.json
python ../manage.py loaddata income.json
python ../manage.py loaddata income_category.json
python ../manage.py loaddata users.json

echo 'LOAD_DATA END'