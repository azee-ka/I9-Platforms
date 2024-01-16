# src/user/models.py
from django.db import models
from ..user.models import Personal, BaseUser

class ModuleProperty(models.Model):
    association_name = models.CharField(max_length=100)
    start_date = models.DateField(default=None)
    end_date = models.DateField(default=None)
    description = models.TextField()

class Module(models.Model):
    # user = models.ForeignKey(BaseUser, on_delete=models.CASCADE, related_name='modules')
    module_title = models.TextField()
    property = models.ManyToManyField(ModuleProperty)
