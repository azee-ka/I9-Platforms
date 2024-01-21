# utils.py
from .models import Notification

def send_notification(sender, recipient, message, notification_type):
    Notification.objects.create(sender=sender, recipient=recipient, message=message, notification_type=notification_type)
