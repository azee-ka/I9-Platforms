# urls.py

from django.urls import path
from .views import create_chat, list_create_messages, list_user_chats

urlpatterns = [
    path('chats/create/<str:username>/', create_chat, name='create-chat'),
    path('chats/<int:chat_id>/messages/', list_create_messages, name='list-create-messages'),
    path('chats/', list_user_chats, name='list-user-chats'),
]
