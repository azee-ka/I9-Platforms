# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import BaseUser
from .learner.models import Learner
from .educator.models import Educator
from .personal.models import Personal
from ..notification.models import Notification

from .learner.serializers import LearnerSerializer
from .educator.serializers import EducatorSerializer
from .personal.serializers import PersonalSerializer
from .professional.serializers import ProfessionalSerializer

from .serializers import BaseUserSerializer, UserProfilePictureUpdateSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework import status
import uuid
from django.core.files.base import ContentFile
import base64
import os


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    role = request.data.get('role')

    # Choose the appropriate model based on the 'role' field
    if role.lower() == 'learner':
        serializer = LearnerSerializer(data=request.data)
    elif role.lower() == 'educator':
        serializer = EducatorSerializer(data=request.data)
    elif role.lower() == 'personal':
        serializer = PersonalSerializer(data=request.data)
    elif role.lower() == 'professional':
        serializer = ProfessionalSerializer(data=request.data)
    else:
        return Response({"message": "Invalid role"}, status=400)
        
    if serializer.is_valid():
        user = serializer.save()

        # Use set_password to handle password hashing
        user.set_password(request.data['password'])
        user.save()

        token, created = Token.objects.get_or_create(user=user)

        response_data = {'user': {'id': user.id, 'username': user.username, 'role': user.role}, 'token': token.key}
        return Response(response_data, status=201)
    else:
        print(f"Registration Failed. Errors: {serializer.errors}")
        return Response(serializer.errors, status=400)



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        # Login the user and generate a new token
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)

        response_data = {'user': {'id': user.id, 'username': user.username, 'role': user.role}, 'token': token.key}
        return Response(response_data, status=200)
    else:
        return Response({"message": "Invalid credentials"}, status=401)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    base_user = request.user  # This gives you the authenticated user of type BaseUser

    # # Attempt to cast the base user to more specific user types
    # if hasattr(base_user, 'learner'):
    #     user = base_user.learner
    # elif hasattr(base_user, 'educator'):
    #     user = base_user.educator
    # elif hasattr(base_user, 'personal'):
    #     user = base_user.personal
    # else:
    #     # Handle unexpected user types if any
    #     return Response({"message": "Invalid user type"}, status=400)

    # # Serialize the user based on their role
    # if isinstance(user, Learner):
    #     serializer = LearnerSerializer(user)
    # elif isinstance(user, Educator):
    #     serializer = EducatorSerializer(user)
    # elif isinstance(user, Personal):
    #     serializer = PersonalSerializer(user)
    # else:
    #     # Handle unexpected user types if any
    #     return Response({"message": "Invalid user type"}, status=400)

    serializer = BaseUserSerializer(base_user)
    return Response(serializer.data, status=200)















from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from ..notification.utils import send_notification

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def link_profile(request):
    # Ensure the user is authenticated and authorized to link profiles
    user = request.user

    # Get the profile to be linked based on the provided credentials
    profile_to_be_linked_credentials = request.data.get('profile_to_be_linked_credentials', {})
    if not profile_to_be_linked_credentials:
        return Response({"message": "Credentials not provided"}, status=400)

    # Authenticate the user with provided credentials
    linked_profile = authenticate(username=profile_to_be_linked_credentials.get('username'), password=profile_to_be_linked_credentials.get('password'))
    if not linked_profile:
        return Response({"message": "Invalid credentials for linking profiles"}, status=401)

    # Send link request notification to the linked profile
    # send_notification(sender=user, recipient=linked_profile, message=f"{user.username} wants to link profiles. Do you accept?")
    send_notification(
        sender=user,
        recipient=linked_profile,
        message=f"{user.username} wants to link profiles.",
        notification_type='profile_link_request'
    )
    return Response({"message": f"Link invitiation sent successfully to @{linked_profile.username}. Accounts will be linked once @{linked_profile.username} accepts the inivitation."})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_link_request(request, notification_id):
    user = request.user
    notification = get_object_or_404(Notification, id=notification_id, recipient=user, is_accepted=False)

    # Accept the link request
    notification.is_accepted = True
    notification.save()

    # Link the profiles
    user.link_profile(notification.sender)
    
    notification.delete()
    
    send_notification(
        sender=user,
        recipient=notification.sender,
        message=f"{user.username} sucessfully accepted your invite! Profile are now linked.",
        notification_type='message'
    )
    
    return Response({"message": "Link request accepted successfully"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_link_request(request, notification_id):
    user = request.user
    notification = get_object_or_404(Notification, id=notification_id, recipient=user, is_accepted=False)

    # Reject the link request
    notification.delete()
    
    send_notification(
        sender=user,
        recipient=notification.sender,
        message=f"{user.username} declined your invite! You do not have permission to link the profile",
        notification_type='message'
    )

    return Response({"message": "Link request rejected"})


from .serializers import LinkedProfileSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_linked_profiles(request):
    user = request.user
    linked_profiles = user.get_linked_profiles()

    serializer = LinkedProfileSerializer(linked_profiles, many=True)
    return Response(serializer.data, status=200)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlink_profile(request, linked_profile_id):
    # Ensure the user is authenticated and authorized to unlink profiles
    user = request.user
    linked_profile = get_object_or_404(BaseUser, id=linked_profile_id)

    # Unlink the profiles
    user.unlink_profile(linked_profile)
    # Ensure reciprocal unlinking
    linked_profile.unlink_profile(user)

    return Response({"message": "Profiles unlinked successfully"})





def perform_login(request, user):
    # Login the user and generate a new token
    login(request, user)
    token, created = Token.objects.get_or_create(user=user)

    response_data = {'user': {'id': user.id, 'username': user.username, 'role': user.role, 'profile_picture': user.profile_picture}, 'token': token.key}
    return Response(response_data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def switch_profile(request):
    # Ensure the user is authenticated
    user = request.user

    # Get the username of the linked profile to switch to
    linked_profile_username = request.data.get('linked_profile_username')
    if not linked_profile_username:
        return Response({"message": "Linked profile username not provided"}, status=400)

    # Check if the linked profile exists
    linked_profile = get_object_or_404(BaseUser, username=linked_profile_username)

    # Call the perform_login function to authenticate and login the user with the linked profile
    return perform_login(request, linked_profile)




@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user_profile_picture(request):
    user = request.user

    profile_picture_data = request.data.get('profile_picture', None)

    if profile_picture_data:
        # Generate a unique filename using uuid
        unique_filename = f"{uuid.uuid4()}.jpg"

        # Decode the base64 string and create a ContentFile
        decoded_image = base64.b64decode(profile_picture_data.split(',')[1])
        content_file = ContentFile(decoded_image, name=unique_filename)

        # Save the profile picture
        user.profile_picture.save(unique_filename, content_file, save=True)
        user.save()

    # Use the new serializer for the response
    serializer = UserProfilePictureUpdateSerializer({'profile_picture': user.profile_picture.url})
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_user_profile_picture(request):
    user = request.user

    # Check if the user wants to remove the profile picture
    if user.profile_picture:
        # Remove the profile picture
        user.profile_picture.delete(save=True)
        user.save()

        return Response({'detail': 'Profile picture removed successfully.'})
    else:
        return Response({'detail': 'No profile picture to remove.'}, status=400)