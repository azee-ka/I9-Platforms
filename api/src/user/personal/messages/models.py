# models.py

from django.db import models
from ..models import BaseUser

class Message(models.Model):
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(BaseUser, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(BaseUser, on_delete=models.CASCADE, related_name='received_messages')
    server = models.ForeignKey('Server', on_delete=models.SET_NULL, null=True, blank=True)

class Server(models.Model):
    server_name = models.CharField(max_length=255)
    server_cover_picture = models.ImageField(upload_to='server_covers/', blank=True, null=True)
    members = models.ManyToManyField(BaseUser, related_name='servers')
