from rest_framework import serializers
from django.db import models
from .models import Educator
from ..serializers import BaseUserSerializer
from ...module.serializers import ModuleSerializer


class EducatorSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = Educator
        fields = BaseUserSerializer.Meta.fields + ['institution']
