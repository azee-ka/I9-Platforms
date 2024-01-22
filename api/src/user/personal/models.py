from django.contrib.auth.models import AbstractUser
from django.db import models
from ..models import BaseUser
from ...post.models import Post

class Personal(BaseUser):
    bio = models.TextField(max_length=500, blank=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following')
    my_posts = models.ManyToManyField(Post, related_name='posted_by', blank=True)
    followers_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
