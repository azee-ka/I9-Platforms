# serializers.py
from rest_framework import serializers
from ..baseUser.models import BaseUser
from ..calc.expression.models import Expression
from .models import UserHistory

class UserHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHistory
        fields = '__all__'