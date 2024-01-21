# urls.py
from django.urls import path, include
from .views import login_view, register_view, get_user_info, link_profile, get_linked_profiles, switch_profile

urlpatterns = [
    path('access/login/', login_view, name='login'),
    path('access/register/', register_view, name='register'),
    path('profile/get-user-info/', get_user_info, name='get-user-info'),
    
    path('personal/', include('src.user.personal.urls')),
    
    path('link-profile/', link_profile, name='link-profile'),
    path('get-linked-profiles/', get_linked_profiles, name='get_linked_profiles'),
    path('switch-profile/', switch_profile, name='switch-profile'),

]
