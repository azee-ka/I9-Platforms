# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Notification
from .serializers import NotificationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    user = request.user
    notifications = Notification.objects.filter(recipient=user).order_by('-created_at')
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data, status=200)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_notification(request, notification_id):
    user = request.user
    notification = get_object_or_404(Notification, id=notification_id, recipient=user)

    # Delete the notification
    notification.delete()

    return Response({"message": "Notification deleted successfully"})
