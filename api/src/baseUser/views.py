# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import BaseUser
from .serializers import BaseUserSerializer
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = BaseUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()

        # Obtain a token for the user
        token, created = Token.objects.get_or_create(user=user)

        # Serialize the user without including the password
        user_data = BaseUserSerializer(user).data

        # Return the response with the token separate from the user
        response_data = {'user': user_data, 'token': token.key}
        return Response(response_data, status=201)
    else:
        print(f"Registration Failed. Errors: {serializer.errors}")
        return Response(serializer.errors, status=400)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user:
        if user.is_active:
            login(request, user)

            # Create a new token for the authenticated user
            token, created = Token.objects.get_or_create(user=user)

            # You may also include additional user information in the response
            user_data = BaseUserSerializer(user).data

            # Return the response with the token separate from the user
            response_data = {'user': user_data, 'token': token.key}
            return Response(response_data, status=200)
        else:
            return Response({"message": "User account is inactive"}, status=401)
    else:
        return Response({"message": "Invalid credentials"}, status=401)
