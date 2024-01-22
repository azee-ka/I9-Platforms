from ...post.models import Post
from ...post.serializers import PostSerializer
from .models import Personal
from .serializers import PersonalSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q
import uuid
from django.core.files.base import ContentFile
import base64
import os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Personal
from .serializers import PersonalSerializer, MyPersonalProfileSerializer, PrivatePersonalProfileSerializer, PublicPersonalProfileSerializer
from rest_framework import status


# View to retrieve the authenticated user's profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_profile(request):
    base_user = request.user
    
    # Attempt to cast the base user to more specific user types
    if hasattr(base_user, 'learner'):
        user = base_user.learner
    elif hasattr(base_user, 'educator'):
        user = base_user.educator
    elif hasattr(base_user, 'personal'):
        user = base_user.personal
    else:
        # Handle unexpected user types if any
        return Response({"message": "Invalid user type"}, status=400)
    
    serializer = PersonalSerializer(user)
    return Response(serializer.data)



# View to retrieve a user's profile by username
@api_view(['GET'])
def get_user_profile(request, username):
    user = get_object_or_404(Personal, username=username)

    if user.is_private_profile and not request.user.is_authenticated:
        # User has a private profile and the viewer is not authenticated
        serializer = PublicPersonalProfileSerializer(user)
    elif user == request.user:
        # Viewer is the same user, use the MyProfileSerializer
        serializer = MyPersonalProfileSerializer(user)
    elif user.is_private_profile and not user.followers.filter(id=request.user.id).exists():
        # User has a private profile and the viewer is not a follower
        serializer = PublicPersonalProfileSerializer(user)
    else:
        # User has either a public profile or the viewer is a follower
        serializer = PrivatePersonalProfileSerializer(user)

    return Response(serializer.data)








@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    user_to_follow = get_object_or_404(Personal, id=user_id)
    current_user = request.user

    if current_user != user_to_follow:
        current_user.following.add(user_to_follow)
        user_to_follow.followers.add(current_user)
        current_user.save()
        user_to_follow.save()

    serializer = PersonalSerializer(current_user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfollow_user(request, user_id):
    user_to_unfollow = get_object_or_404(Personal, id=user_id)
    current_user = request.user

    if current_user != user_to_unfollow:
        current_user.following.remove(user_to_unfollow)
        user_to_unfollow.followers.remove(current_user)
        current_user.save()
        user_to_unfollow.save()

    serializer = PersonalSerializer(current_user)
    return Response(serializer.data)



from django.core.exceptions import ObjectDoesNotExist

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_users(request):
    print("hello")
    search_query = request.GET.get('query', '')

    try:
        users = Personal.objects.filter(Q(username__icontains=search_query))
        serializer = PersonalSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        # No users found
        return Response([], status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Other unexpected errors
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)