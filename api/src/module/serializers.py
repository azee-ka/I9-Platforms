# src/user/serializers.py
from rest_framework import serializers
from .models import Module, ModuleProperty
from ..user.models import BaseUser, Personal

class ModulePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleProperty
        fields = ['association_name', 'start_date', 'end_date', 'description']


class ModuleSerializer(serializers.ModelSerializer):
    property = ModulePropertySerializer(many=True)

    class Meta:
        model = Module
        fields = ['id', 'module_title', 'property']

    def create(self, validated_data):
        property_data = validated_data.pop('property', None)
        
        try:
            module = Module.objects.create(**validated_data)

            if property_data:
                for prop_data in property_data:
                    ModuleProperty.objects.create(module=module, **prop_data)

            return module
        except BaseUser.DoesNotExist as e:
            print(f"BaseUser.DoesNotExist: {e}")
            raise serializers.ValidationError({'user': 'Invalid format for the user field'})
        except Personal.DoesNotExist as e:
            print(f"Personal.DoesNotExist: {e}")
            raise serializers.ValidationError({'user': 'Personal object does not exist for the authenticated user'})
        except Exception as e:
            print(f"Exception: {e}")
            raise serializers.ValidationError({'error': str(e)})
