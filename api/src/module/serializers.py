from rest_framework import serializers
from django.db import models
from .models import Module, ModuleItem

class ModuleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleItem
        fields = ['id', 'description', 'association', 'start_date', 'end_date']

class ModuleSerializer(serializers.ModelSerializer):
    module_items = ModuleItemSerializer(many=True, read_only=True, source='module_items.all')

    class Meta:
        model = Module
        fields = ['id', 'module_title', 'module_items']