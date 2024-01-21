from django.contrib.auth.models import AbstractUser
from django.db import models
from ..models import BaseUser
from ...post.models import Post

class Professional(BaseUser):
    bio = models.TextField(max_length=500, blank=True)
