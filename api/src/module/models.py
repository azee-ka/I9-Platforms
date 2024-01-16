from django.db import models
from ..user.models import BaseUser


class Module(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE, related_name='modules')
    module_title = models.CharField(max_length=100)
    
class ModuleItem(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='module_items')
    description = models.TextField()
    association = models.CharField(max_length=100)
