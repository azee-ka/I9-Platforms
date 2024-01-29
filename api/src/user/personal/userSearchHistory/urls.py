# urls.py
from django.urls import path
from .views import store_search_history, get_search_history, delete_search_history

urlpatterns = [
    path('search/store/', store_search_history, name='store_search_history'),
    path('search/history/', get_search_history, name='get_search_history'),
    path('search/delete/', delete_search_history, name='delete_search_history'),
]
