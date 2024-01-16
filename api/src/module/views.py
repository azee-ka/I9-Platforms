from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from .models import Module, ModuleItem
from .serializers import ModuleSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_module(request):
    if request.user.role.lower() != 'personal':
        return Response({"message": "Only personal users can create modules"}, status=403)

    module_title = request.data.get('module_title')
    
    if not module_title:
        return Response({"message": "Module title is required"}, status=400)

    module = Module.objects.create(module_title=module_title, user=request.user.personal)

    # Create associated ModuleItems
    module_items_data = request.data.get('module_items', [])  # Assuming 'module_items' is the key for associated items
    for item_data in module_items_data:
        ModuleItem.objects.create(module=module, **item_data)

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