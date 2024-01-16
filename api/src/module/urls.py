# urls.py
from django.urls import path, include
from .views import create_module, get_user_modules

urlpatterns = [
    path('personal/module/create/', create_module, name='get-user-info'),
    path('personal/module/get-data/', get_user_modules, name='get-user-info'),        
]
