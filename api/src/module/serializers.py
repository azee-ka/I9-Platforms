# src/module/serializers.py
from rest_framework import serializers
from .models import ModuleProperty, Module

class ModulePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleProperty
        fields = ['association_name', 'duration', 'description']

class ModuleSerializer(serializers.ModelSerializer):
    property = ModulePropertySerializer(many=True)

    class Meta:
        model = Module
        fields = ['id', 'personal', 'property']