from rest_framework import serializers
from .models import BaseUser, Learner, Educator, Personal

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_of_birth', 'date_joined', 'is_active', 'role']

class PersonalSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Personal
        fields = BaseUserSerializer.Meta.fields
        
class LearnerSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Learner
        fields = BaseUserSerializer.Meta.fields + ['institution']

class EducatorSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Educator
        fields = BaseUserSerializer.Meta.fields + ['institution']
