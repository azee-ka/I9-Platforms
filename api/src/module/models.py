from django.db import models
from ..user.models import BaseUser
from ..user.professional.models import Professional

class Module(models.Model):
    user = models.ForeignKey(Professional, on_delete=models.CASCADE, related_name='modules')
    module_title = models.CharField(max_length=100)
    
class ModuleItem(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='module_items')
    description = models.TextField()
    association = models.CharField(max_length=100, unique=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)