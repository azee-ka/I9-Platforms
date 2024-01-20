from django.urls import path
from .views import get_explore_posts

urlpatterns = [
    path('posts/', get_explore_posts, name='create-post'),
]