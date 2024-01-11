# serializers.py
from rest_framework import serializers
from .models import BaseUser

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_of_birth', 'date_joined', 'is_active']