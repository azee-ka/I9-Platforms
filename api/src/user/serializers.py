# serializers.py
from rest_framework import serializers
from .models import BaseUser, Learner, Educator

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_of_birth', 'date_joined', 'is_active', 'role'] 

class LearnerSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Learner

class EducatorSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Educator