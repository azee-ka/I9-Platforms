# models.py
from django.db import models
from src.baseUser.models import BaseUser

class Expression(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE, null=True)
    expression = models.TextField()
    category = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
