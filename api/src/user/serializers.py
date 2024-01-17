from rest_framework import serializers
from django.db import models
from .models import BaseUser
from .learner.models import Learner
from .educator.models import Educator
from ..module.serializers import ModuleSerializer


class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_of_birth', 'date_joined', 'is_active', 'role']
