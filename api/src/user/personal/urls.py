# urls.py
from django.urls import path, include
from .views import get_my_profile, get_user_profile, follow_user, unfollow_user, search_users, reject_follow_request, accept_follow_request

urlpatterns = [
    path('get-profile/', get_my_profile, name='user-profile'),
    path('profile/<str:username>/', get_user_profile, name='user-profile'),
    path('follow/<str:username>/', follow_user, name='follow-user'),
    
    path('accept_follow_request/<int:notification_id>/', accept_follow_request, name='accept_follow_request'),
    path('reject_follow_request/<int:notification_id>/', reject_follow_request, name='reject_follow_request'),
        
    path('unfollow/<str:username>/', unfollow_user, name='unfollow-user'),
    path('search/', search_users, name='search-users'),
    
    path('timeline/', include('src.user.personal.timeline.urls')),
    path('explore/', include('src.user.personal.explore.urls')),

    path('', include('src.user.personal.messages.urls')),    
    path('', include('src.user.personal.userSearchHistory.urls')),

]
