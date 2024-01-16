from django.db import models
from ..user.models import BaseUser

class Module(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE, related_name='modules')
    module_title = models.CharField(max_length=100)
    details = models.TextField(null=True, blank=True)