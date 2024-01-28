# urls.py
from django.urls import path, include
from .views import login_view, register_view, get_user_info, link_profile, get_linked_profiles, switch_profile, accept_link_request, reject_link_request, update_user_profile_picture, remove_user_profile_picture, toggle_profile_visibility, get_profile_visibility, unlink_profile, update_user_profile

urlpatterns = [
    path('access/login/', login_view, name='login'),
    path('access/register/', register_view, name='register'),
    path('profile/get-user-info/', get_user_info, name='get-user-info'),
    
    path('update-user-profile/', update_user_profile, name='update-user-profile'),

    path('update-profile-picture/', update_user_profile_picture, name='update-user-profile'),
    path('remove-profile-picture/', remove_user_profile_picture, name='remove-user-profile'),

    path('toggle-profile-visibility/', toggle_profile_visibility, name='toggle_profile_visibility'),
    path('get-profile-visibility/', get_profile_visibility, name='get_profile_visibility'),

    path('personal/', include('src.user.personal.urls')),
    
    
    path('link-profile/', link_profile, name='link-profile'),
    path('unlink-profile/<str:username>/', unlink_profile, name='link-profile'),
        
     path('accept_link_request/<int:notification_id>/', accept_link_request, name='accept_link_request'),
    path('reject_link_request/<int:notification_id>/', reject_link_request, name='reject_link_request'),
    
    path('get-linked-profiles/', get_linked_profiles, name='get_linked_profiles'),
    
    
    path('switch-profile/', switch_profile, name='switch-profile'),

]
