from rest_framework import serializers
from django.db import models
from .models import BaseUser, Learner, Educator, Personal
from ..module.serializers import ModuleSerializer

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_of_birth', 'date_joined', 'is_active', 'role']

    
class LearnerSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Learner
        fields = BaseUserSerializer.Meta.fields + ['institution']

class EducatorSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Educator
        fields = BaseUserSerializer.Meta.fields + ['institution']



class PersonalSerializer(BaseUserSerializer):
    module = ModuleSerializer(read_only=True)

    class Meta(BaseUserSerializer.Meta):
        model = Personal
        fields = BaseUserSerializer.Meta.fields + ['module']