# src/module/models.py
from django.db import models
from ..user.models import Personal

class ModuleProperty(models.Model):
    association_name = models.CharField(max_length=100)
    duration = models.DurationField()
    description = models.TextField()
    
class Module(models.Model):
    personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    property = models.ManyToManyField(ModuleProperty)

