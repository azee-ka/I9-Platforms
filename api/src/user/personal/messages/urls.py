# urls.py
from django.urls import path, include
from .views import send_message, get_all_user_messages, get_specific_user_messages, get_server_messages, get_user_servers

urlpatterns = [
    path('send-message/', send_message, name='send-message'),
    path('get-user-messages/', get_all_user_messages, name='get-user-messages'),
    path('get-specific-user-messages/<str:recipient_username>', get_specific_user_messages, name='get-specific-user-messages'),
    path('get-server-messages', get_server_messages, name='get-server-messages'),
    path('get-user-servers/', get_user_servers, name='get-user-servers'),
]
