# urls.py
from django.urls import path, include
from .views import get_my_profile, get_user_profile, follow_user, unfollow_user, search_users

urlpatterns = [
    path('get-profile/', get_my_profile, name='user-profile'),
    path('profile/<str:username>', get_user_profile, name='user-profile'),
    path('follow/<int:user_id>', follow_user, name='follow-user'),
    path('unfollow/<int:user_id>', unfollow_user, name='unfollow-user'),
    path('search/', search_users, name='search-users'),
    
    path('timeline/', include('src.user.personal.timeline.urls')),
    path('explore/', include('src.user.personal.explore.urls')),
]
