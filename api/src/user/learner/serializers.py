from rest_framework import serializers
from django.db import models
from .models import Learner
from ..serializers import BaseUserSerializer
from ...module.serializers import ModuleSerializer

    
class LearnerSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Learner
        fields = BaseUserSerializer.Meta.fields + ['institution']
