# serializers.py

from rest_framework import serializers
from .models import Message

# serializers.py

from rest_framework import serializers
from .models import Chat, Message
from ..models import BaseUser

class MessageBaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['id', 'username', 'profile_picture']

class MessageSerializer(serializers.ModelSerializer):
    sender = MessageBaseUserSerializer()

    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'content', 'timestamp']


class ChatSerializer(serializers.ModelSerializer):
    participants = MessageBaseUserSerializer(many=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'created_at', 'messages']
