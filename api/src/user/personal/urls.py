# urls.py
from django.urls import path, include
from .views import get_my_profile, get_user_profile, follow_user, unfollow_user, search_users, update_user_profile

urlpatterns = [
    path('', get_my_profile, name='user-profile'),
    path('<str:username>', get_user_profile, name='user-profile'),
    path('follow/<int:user_id>', follow_user, name='follow-user'),
    path('unfollow/<int:user_id>', unfollow_user, name='unfollow-user'),
    path('search/', search_users, name='search-users'),
    path('update-profile-picture/', update_user_profile, name='update-user-profile'),
]
