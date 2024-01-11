# urls.py
from django.urls import path
from .views import login_view, register_view

urlpatterns = [
    path('access/login/', login_view, name='login'),
    path('access/register/', register_view, name='register'),
]
