# views.py
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from .models import UserHistory
# from .serializers import UserHistorySerializer

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def save_to_history(request):
#     serializer = UserHistorySerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(user=request.user)
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)