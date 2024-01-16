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





from ..user.models import Module
from ..user.serializers import ModuleSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_module(request):
    if request.user.role.lower() != 'personal':
        return Response({"message": "Only personal users can create modules"}, status=403)

    module_title = request.data.get('module_title')
    details = request.data.get('details')

    if not module_title:
        return Response({"message": "Module title is required"}, status=400)

    module = Module.objects.create(module_title=module_title, details=details, user=request.user.personal)
    
    serializer = ModuleSerializer(module)
    return Response(serializer.data, status=201)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_modules(request):
    if request.user.role.lower() != 'personal':
        return Response({"message": "Only personal users can retrieve modules"}, status=403)

    modules = Module.objects.filter(user=request.user.personal)
    serializer = ModuleSerializer(modules, many=True)
    return Response(serializer.data, status=200)