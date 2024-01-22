from django.urls import path
from .views import get_notifications, delete_notification


urlpatterns = [
    path('get-notifications/', get_notifications, name='get-notifications'),
    path('delete-notification/<int:notification_id>/', delete_notification, name='delete-notification'),
]
