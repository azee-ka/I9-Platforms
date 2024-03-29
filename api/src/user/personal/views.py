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
from ..models import BaseUser
from .serializers import PersonalSerializer, PrivatePersonalProfileSerializer, PublicPersonalProfileSerializer
from rest_framework import status
from .utils.cast_down_user import cast_down_user

# View to retrieve the authenticated user's profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_profile(request):
    base_user = request.user
    
    user = cast_down_user(base_user)
    if user is None:
        return Response({"message": "Invalid user type"}, status=400)
    
    serializer = PersonalSerializer(user)
    return Response(serializer.data)



# View to retrieve a user's profile by username
@api_view(['GET'])
@permission_classes([AllowAny]) 
def get_user_profile(request, username):
    base_user = get_object_or_404(BaseUser, username=username)
    user = cast_down_user(base_user)
    
    if user is None:
        return Response({"message": "Invalid user type"}, status=400)

    is_full_view = None
    if user.is_private_profile and not request.user.is_authenticated:
        # User has a private profile and the viewer is not authenticated
        is_full_view = False
        serializer = PublicPersonalProfileSerializer(user, context={'request': request})
    elif user == request.user:
        # Viewer is the same user, use the MyProfileSerializer
        serializer = PersonalSerializer(user, context={'request': request})
    elif user.is_private_profile and not user.followers.filter(id=request.user.id).exists():
        # User has a private profile and the viewer is not a follower
        followers_list = list(user.followers.all())
        print(f"User ID: {user.id}, Viewer ID: {request.user.id}, Followers: {followers_list}")
        is_full_view = False
        serializer = PublicPersonalProfileSerializer(user, context={'request': request})
    else:
        # User has either a public profile or the viewer is a follower
        is_full_view = True
        serializer = PrivatePersonalProfileSerializer(user, context={'request': request})

    response_data = {'profile_data': serializer.data, 'is_full_view': is_full_view}
    return Response(response_data)



from ...notification.utils import send_notification
from ...notification.models import Notification
@api_view(['POST'])
@permission_classes([AllowAny])
def follow_user(request, username):
    base_user_to_follow = get_object_or_404(BaseUser, username=username)
    user_to_follow = cast_down_user(base_user_to_follow)
    
    base_current_user = request.user
    current_user = cast_down_user(base_current_user)

    if user_to_follow is None or current_user is None:
        return Response({"message": "Invalid user type"}, status=400)

    try:
        # Try to get the notification, if it doesn't exist, proceed with the follow operation
        notification = Notification.objects.get(recipient=user_to_follow, sender=current_user, is_accepted=False)
        return Response({"message": "Your previous request to follow is still pending! Wait for the approval."})
    except ObjectDoesNotExist:
        # Notification not found, continue with follow operation
        pass
        
    if current_user != user_to_follow:
        if user_to_follow.is_private_profile:
            send_notification(
                sender=current_user,
                recipient=user_to_follow,
                message=f'@{current_user.username} attempted to follow your account!',
                notification_type='follow_request'
            )
            return Response({"message": "Request to follow was sent! Pending approval."})
        else:
            current_user.following.add(user_to_follow)
            user_to_follow.followers.add(current_user)
            current_user.save()
            user_to_follow.save()
        
            serializer = PersonalSerializer(current_user)
            return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_follow_request(request, notification_id):
    base_user_to_follow = request.user
    user_to_follow = cast_down_user(base_user_to_follow)
    
    notification = get_object_or_404(Notification, id=notification_id, recipient=user_to_follow, is_accepted=False)
    
    base_follow_requesting_user = notification.sender
    follow_requesting_user = cast_down_user(base_follow_requesting_user)
    
    follow_requesting_user.following.add(user_to_follow)
    user_to_follow.followers.add(follow_requesting_user)
    follow_requesting_user.save()
    user_to_follow.save()
    
    notification.delete()
    
    send_notification(
        sender=user_to_follow,
        recipient=follow_requesting_user,
        message=f'Your request to follow @{user_to_follow.username} has been approved. You now follow @{user_to_follow.username}!',
        notification_type='message'
    )
            
    return Response({"message": "Follow request accepted"})
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_follow_request(request, notification_id):
    base_user = request.user
    user = cast_down_user(base_user)
    
    notification = get_object_or_404(Notification, id=notification_id, recipient=user, is_accepted=False)

    send_notification(
            sender=notification.recipient,
            recipient=notification.sender,
            message=f'Your request to follow @{notification.recipient.username} was declined!',
            notification_type='message'
    )

    # Mark the notification as rejected
    notification.delete()

    return Response({"message": "Follow request rejected"})




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfollow_user(request, username):
    base_user_to_unfollow = get_object_or_404(BaseUser, username=username)
    user_to_unfollow = cast_down_user(base_user_to_unfollow)
    
    base_current_user = request.user
    current_user = cast_down_user(base_current_user)

    if user_to_unfollow is None or current_user is None:
        return Response({"message": "Invalid user type"}, status=400)

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