# views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from ..models import BaseUser
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat(request, username):
    user = request.user
    other_user = get_user_by_username(username)

    if not other_user:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    participants = [user, other_user]
    
    # Check if a chat already exists between these participants
    chat = Chat.objects.filter(participants__in=participants).distinct()

    if chat.exists():
        chat_serializer = ChatSerializer(chat.first())
        return Response(chat_serializer.data, status=status.HTTP_200_OK)
    else:
        chat_serializer = ChatSerializer(data={"participants": participants})
        if chat_serializer.is_valid():
            chat_serializer.save()
            return Response(chat_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(chat_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def list_create_messages(request, chat_id):
    try:
        chat = Chat.objects.get(pk=chat_id)
    except Chat.DoesNotExist:
        return Response({"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        messages = Message.objects.filter(chat=chat)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(chat=chat, sender=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_chats(request):
    print('gdsbk')
    user = request.user

    # Retrieve all chats where the user is a participant
    chats = Chat.objects.filter(participants=user)
    serializer = ChatSerializer(chats, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)



def get_user_by_username(username):
    try:
        user = BaseUser.objects.get(username=username)
        return user
    except BaseUser.DoesNotExist:
        return None
