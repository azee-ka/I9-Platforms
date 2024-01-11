# serializers.py
from rest_framework import serializers
from .models import Expression
from ...baseUser.models import BaseUser
from ...userHistory.models import UserHistory

class ExpressionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=BaseUser.objects.all(), required=False)

    class Meta:
        model = Expression
        fields = '__all__'


class ExpressionResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expression
        fields = ['id', 'user', 'expression', 'category', 'description', 'result']
