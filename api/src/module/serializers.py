from rest_framework import serializers
from django.db import models
from .models import Module

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id', 'module_title', 'details']