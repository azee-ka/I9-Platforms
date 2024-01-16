from rest_framework import serializers
from django.db import models
from .models import Module, ModuleItem

class ModuleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleItem
        fields = ['description', 'association']

class ModuleSerializer(serializers.ModelSerializer):
    module_items = ModuleItemSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'module_title', 'module_items']
