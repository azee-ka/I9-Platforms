# api/time_line/struct/post/serializers.py

from rest_framework import serializers
from .models import Post, Comment, MediaFile

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'text',
            'user',
            'created_at',
        ]

    def get_user(self, obj):
        user = obj.user
        return {
            'username': user.username,
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
        }
        
class MediaFileSerializer(serializers.ModelSerializer):
    media_type = serializers.CharField()
    
    class Meta:
        model = MediaFile
        fields = ['file', 'media_type']
        
class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    profile_picture = serializers.ImageField(source='user.profile_picture', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    media_files = MediaFileSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = Post
        fields = [
            'text',
            'media_files',
            'id',
            'user',
            'profile_picture',
            'created_at',
            'likes',
            'dislikes',
            'comments',
        ]

    def get_user(self, obj):
        user = obj.user
        custom_user = {
            'username': user.username,
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
        }
        return custom_user

    def get_likes(self, obj):
        return [
            {
                'username': like.username,
                'profile_picture': like.profile_picture.url if like.profile_picture else None,
            }
            for like in obj.likes.all()
        ]

    # Add the following method if you want to get the count of likes directly
    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_dislikes(self, obj):
        return [
            {
                'username': dislike.username,
                'profile_picture': dislike.profile_picture.url if dislike.profile_picture else None,
            }
            for dislike in obj.dislikes.all()
        ]

    def get_dislikes_count(self, obj):
        return obj.dislikes.count()




import cv2
import numpy as np
import tempfile
import os

class MinimalPostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'thumbnail',
            'id',
        ]

    def get_thumbnail(self, obj):
        # Assuming 'media_files' is a related manager on the Post model
        thumbnail_media_file = obj.media_files.first()

        if thumbnail_media_file:
            return {
                'file': thumbnail_media_file.file.url,
                'media_type': thumbnail_media_file.media_type,
            }

        return None