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

    # Check if a module with the specified title already exists for the user
    existing_module = Module.objects.filter(user=request.user.personal, module_title=module_title).first()
    try :
        if existing_module:
            # If the module exists, add new module_items to it
            module_items_data = request.data.get('module_items', [])
            for item_data in module_items_data:
                ModuleItem.objects.create(module=existing_module, **item_data)

            serializer = ModuleSerializer(existing_module)
            return Response(serializer.data, status=201)
        else:
            # If the module doesn't exist, create a new module with module_items
            module = Module.objects.create(module_title=module_title, user=request.user.personal)

            module_items_data = request.data.get('module_items', [])
            for item_data in module_items_data:
                ModuleItem.objects.create(module=module, **item_data)

            serializer = ModuleSerializer(module)
            return Response(serializer.data, status=201)
    except Exception as e:
        print(f'Exception: {e}')
        return Response({"message": "Title with this name already exists"}, status=500)
 



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_modules(request):
    if request.user.role.lower() != 'personal':
        return Response({"message": "Only personal users can retrieve modules"}, status=403)

    modules = Module.objects.filter(user=request.user.personal)
    serializer = ModuleSerializer(modules, many=True)
    return Response(serializer.data, status=200)