# urls.py
from django.urls import path, include
from .views import create_module, get_user_modules

urlpatterns = [
    path('professional/module/create/', create_module, name='get-user-info'),
    path('professional/module/get-data/', get_user_modules, name='get-user-info'),        
]
