from rest_framework import serializers
from django.db import models
from .models import Professional
from ...module.serializers import ModuleSerializer
from ..serializers import BaseUserSerializer
from ...post.serializers import PostSerializer, MinimalPostSerializer


class ProfessionalSerializer(BaseUserSerializer):
    module = ModuleSerializer(read_only=True)
    
    class Meta(BaseUserSerializer.Meta):
        model = Professional
        fields = BaseUserSerializer.Meta.fields + ['module']
    