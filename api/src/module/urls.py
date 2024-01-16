# src/user/urls.py
from django.urls import path
from .views import get_modules, create_module

urlpatterns = [
    path('module/get-data/', get_modules, name='personal-detail'),
    path('module/create/', create_module, name='module-create'),
]
