# urls.py
from django.urls import path, include
from .views import login_view, register_view, get_user_info, create_module, get_user_modules

urlpatterns = [
    path('access/login/', login_view, name='login'),
    path('access/register/', register_view, name='register'),
    path('profile/get-user-info/', get_user_info, name='get-user-info'),
    path('personal/module/create/', create_module, name='get-user-info'),
    path('personal/module/get-data/', get_user_modules, name='get-user-info'),        
]
