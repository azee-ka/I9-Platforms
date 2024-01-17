from django.contrib.auth.models import AbstractUser
from django.db import models
from ..models import BaseUser
from ...post.models import Post

def upload_to(instance, filename):
    return f'profile_pictures/{instance.username}/{filename}'

class Personal(BaseUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following')
    my_posts = models.ManyToManyField(Post, related_name='posted_by', blank=True)