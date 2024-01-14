from django.contrib.auth.models import AbstractUser
from django.db import models

class BaseUser(AbstractUser):
    username = models.CharField(unique=True, max_length=150)
    date_of_birth = models.DateField(null=True, blank=True)
    role = models.TextField()

class Learner(BaseUser):
    # Add learner-specific fields if needed
    institution = models.CharField(max_length=50)

class Educator(BaseUser):
    # Add educator-specific fields if needed
    institution = models.CharField(max_length=50)
