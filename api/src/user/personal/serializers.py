from rest_framework import serializers
from django.db import models
from .models import Personal
from ...module.serializers import ModuleSerializer
from ..serializers import BaseUserSerializer
from ...post.serializers import PostSerializer, MinimalPostSerializer

class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = ['id', 'username', 'profile_picture']

class PersonalSerializer(BaseUserSerializer):

    my_posts = serializers.SerializerMethodField()

    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    followers_list = serializers.SerializerMethodField()
    following_list = serializers.SerializerMethodField()

    class Meta(BaseUserSerializer.Meta):
        model = Personal
        fields = BaseUserSerializer.Meta.fields + ['my_posts', 'followers_count', 'following_count', 'followers_list', 'following_list']
        
    def get_my_posts(self, obj):
            # Serialize the user's posts as an array of post objects
        posts = obj.my_posts.all()
        return MinimalPostSerializer(posts, many=True).data

    def get_followers_count(self, obj):
            return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()
        
    def get_followers_list(self, obj):
        followers = obj.followers.all()
        return FollowerSerializer(followers, many=True).data

    def get_following_list(self, obj):
        following = obj.following.all()
        return FollowerSerializer(following, many=True).data
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
                
        # Check if the current user is following the profile
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            data['is_followed_by_current_user'] = instance.followers.filter(id=request.user.id).exists()
        else:
            data['is_followed_by_current_user'] = False

        return data