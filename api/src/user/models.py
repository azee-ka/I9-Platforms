# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class BaseUser(AbstractUser):
    username = models.CharField(unique=True, max_length=150)
    date_of_birth = models.DateField(null=True, blank=True)
    role = models.CharField(unique=True, max_length=150)

class Learner(BaseUser):
    # Add learner-specific fields if needed
    pass

class Educator(BaseUser):
    # Add educator-specific fields if needed
    pass