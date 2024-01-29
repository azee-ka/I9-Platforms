# views.py
from django.db.models import Q  # Add this import statement
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Message, Server
from .serializers import MessageSerializer, MinimalMessageSerializer, ServerSerializer
from ..models import BaseUser

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_user_messages(request):
    user = request.user
    # Get all messages where the user is either sender or recipient, without considering the server
    messages = Message.objects.filter(Q(sender=user) | Q(recipient=user), server=None)
    serializer = MinimalMessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_specific_user_messages(request, recipient_username):
    user = request.user
    recipient = BaseUser.objects.get(username=recipient_username)
    # Get all messages between the authenticated user and the specified recipient, without considering the server
    messages = Message.objects.filter(Q(sender=user, recipient=recipient) | Q(sender=recipient, recipient=user), server=None)
    serializer = MinimalMessageSerializer(messages, many=True)
    return Response(serializer.data)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(sender=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_server_messages(request, server_id):
    server = Server.objects.get(pk=server_id)
    messages = Message.objects.filter(server=server)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_servers(request):
    servers = Server.objects.filter(members=request.user)
    serializer = ServerSerializer(servers, many=True)
    return Response(serializer.data)
