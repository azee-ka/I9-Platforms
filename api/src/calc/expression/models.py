# models.py
from django.db import models
from src.user.models import BaseUser

class ExpressionHistory(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
    expression = models.TextField()
    category = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    result = models.JSONField(null=True, blank=True)  # Assuming result is a JSONField


class Expression(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
    expression = models.TextField()
    category = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
