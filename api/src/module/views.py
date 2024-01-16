# src/user/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Module
from .serializers import ModuleSerializer
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_modules(request):
    try:
        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_module(request):
    try:
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def module_detail(request, module_id):
    try:
        module = Module.objects.get(id=module_id)
    except Module.DoesNotExist:
        return Response({'error': 'Module not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ModuleSerializer(module)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = ModuleSerializer(module, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        module.delete()
        return Response({'message': 'Module deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# # src/user/views.py
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework import status
# from ..user.models import Personal
# from .models import Module
# from ..user.serializers import PersonalSerializer, ModuleSerializer
# from django.shortcuts import get_object_or_404
# from rest_framework import serializers 

# @api_view(['GET', 'PUT'])
# def personal_detail(request, pk):
#     try:
#         personal = Personal.objects.get(pk=pk)
#     except Personal.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = PersonalSerializer(personal)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = PersonalSerializer(personal, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# from ..user.models import BaseUser

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def module_create(request):
#     try:
#         serializer_data = {
#             'module_title': request.data.get('module_title'),
#             'property': request.data.get('property', []),
#         }
#         serializer = ModuleSerializer(data=serializer_data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print(serializer.errors)  # Add this line to print errors to console
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
#     except BaseUser.DoesNotExist:
#         return Response({"message": "Personal object does not exist for the authenticated user"}, status=status.HTTP_404_NOT_FOUND)