# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import BaseUser, Learner, Educator, Personal
from .serializers import BaseUserSerializer, LearnerSerializer, EducatorSerializer, PersonalSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token

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

        response_data = {'user': serializer.data, 'token': token.key}
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
    role = request.data.get('role')

    user = authenticate(username=username, password=password)

    if user:
        # # Check if the user has the specified role
        # if user.role.lower() != role.lower():
        #     return Response({"message": "Invalid role for the user"}, status=400)

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
    user = request.user
    # # Choose the appropriate serializer based on the user's role
    # if isinstance(user, Learner):
    #     serializer = BaseUserSerializer(user)
    # elif isinstance(user, Educator):
    #     serializer = EducatorSerializer(user)
    # else:
    serializer = BaseUserSerializer(user)

    return Response(serializer.data, status=200)