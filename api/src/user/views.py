# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import BaseUser
from .learner.models import Learner
from .educator.models import Educator
from .personal.models import Personal

from .learner.serializers import LearnerSerializer
from .educator.serializers import EducatorSerializer
from .personal.serializers import PersonalSerializer

from .serializers import BaseUserSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework import status

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def link_profile(request, linked_profile_id):
    # Ensure the user is authenticated and authorized to link profiles
    # Your authentication and authorization logic here...

    # Get the user instance
    user = request.user

    # Get the profile to be linked
    linked_profile = get_object_or_404(BaseUser, id=linked_profile_id)

    # Link the profiles
    user.link_profile(linked_profile)

    return Response({"message": "Profiles linked successfully"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlink_profile(request, linked_profile_id):
    # Ensure the user is authenticated and authorized to unlink profiles
    # Your authentication and authorization logic here...

    # Get the user instance
    user = request.user

    # Get the profile to be unlinked
    linked_profile = get_object_or_404(BaseUser, id=linked_profile_id)

    # Unlink the profiles
    user.unlink_profile(linked_profile)

    return Response({"message": "Profiles unlinked successfully"})
