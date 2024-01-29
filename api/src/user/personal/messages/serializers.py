# serializers.py

from rest_framework import serializers
from .models import Message, Server

class MinimalMessageSerializer(serializers.ModelSerializer):
    recipient = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = ['id', 'content', 'timestamp', 'recipient']
        

    def get_recipient(self, obj):
        # Customize the serialization of the recipient
        recipient_data = {
            'id': obj.recipient.id,
            'username': obj.recipient.username,
            'first_name': obj.recipient.first_name,
            'last_name': obj.recipient.last_name,
            'profile_picture': obj.recipient.profile_picture.url if obj.recipient.profile_picture else None,
        }
        return recipient_data
        

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'
