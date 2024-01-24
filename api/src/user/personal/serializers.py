# serializers.py
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

class BasePersonalProfileSerializer(serializers.ModelSerializer):
    is_followed_by_current_user = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = Personal
        fields = BaseUserSerializer.Meta.fields + ['followers_count', 'following_count', 'is_followed_by_current_user']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

    def get_is_followed_by_current_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.followers.filter(id=request.user.id).exists()
        return False
    
    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

class PersonalSerializer(BaseUserSerializer):
    my_posts = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    followers_list = serializers.SerializerMethodField()
    following_list = serializers.SerializerMethodField()
    is_followed_by_current_user = serializers.SerializerMethodField()

    class Meta(BaseUserSerializer.Meta):
        model = Personal
        fields = BaseUserSerializer.Meta.fields + ['my_posts', 'followers_count', 'following_count', 'followers_list', 'following_list', 'is_followed_by_current_user']

    def get_my_posts(self, obj):
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

    def get_is_followed_by_current_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.followers.filter(id=request.user.id).exists()
        return False

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data


class PublicPersonalProfileSerializer(BasePersonalProfileSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

class PrivatePersonalProfileSerializer(BasePersonalProfileSerializer):
    my_posts = serializers.SerializerMethodField()
    followers_list = serializers.SerializerMethodField()
    following_list = serializers.SerializerMethodField()
    is_followed_by_current_user = serializers.SerializerMethodField()

    class Meta(BasePersonalProfileSerializer.Meta):
        fields = BasePersonalProfileSerializer.Meta.fields + ['my_posts', 'followers_list', 'following_list']

    def get_my_posts(self, obj):
        posts = obj.my_posts.all()
        return MinimalPostSerializer(posts, many=True).data

    def get_followers_list(self, obj):
        followers = obj.followers.all()
        return FollowerSerializer(followers, many=True).data

    def get_following_list(self, obj):
        following = obj.following.all()
        return FollowerSerializer(following, many=True).data

    def get_can_follow(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return not obj.followers.filter(id=request.user.id).exists()
        return False

    def get_is_followed_by_current_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.followers.filter(id=request.user.id).exists()
        return False

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data
