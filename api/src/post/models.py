# src/post/models.py

from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
import uuid

import cv2
import numpy as np
import tempfile
import os
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"



class MediaFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(upload_to='post_media/')
    media_type = models.CharField(max_length=10, default="default")
    order = models.IntegerField(default=0)
    
    
    
class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    text = models.TextField(blank=True)  # Make the text field optional
    media_files = models.ManyToManyField(MediaFile, related_name='post_media', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes_count = models.PositiveIntegerField(default=0)  # Field for the number of likes
    comments_count = models.PositiveIntegerField(default=0)  # Field for the number of comments
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)
    dislikes_count = models.PositiveIntegerField(default=0)  # Field for the number of dislikes
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='disliked_posts', blank=True)

    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Post by {self.user.username}"