# src/user/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from ..models import BaseUser

class Learner(BaseUser):
    institution = models.CharField(max_length=50)
