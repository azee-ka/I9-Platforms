# models.py
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('profile_link_request', 'Profile Link Request'),
        ('friend_request', 'Friend Request'),
        ('message', 'Message'),
        ('follow_request', 'Follow Request')
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_notifications')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_notifications')
    message = models.TextField()
    notification_type = models.CharField(choices=NOTIFICATION_TYPES, max_length=50)
    created_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)
    is_accepted = models.BooleanField(default=False)
