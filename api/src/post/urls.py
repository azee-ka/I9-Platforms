from django.urls import path
from .views import create_post

urlpatterns = [
    path('personal/create-post/', create_post, name='create-post'),
]
