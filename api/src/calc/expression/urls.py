# urls.py
from django.urls import path
from .views import submit_expression

urlpatterns = [
    path('submit-expression/', submit_expression, name='expression'),
]
