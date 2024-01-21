# serializers.py
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'sender', 'recipient', 'message', 'notification_type', 'created_at', 'is_read', 'is_accepted']
