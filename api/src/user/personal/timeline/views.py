# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ....post.models import Post
from ....post.serializers import PostSerializer, TimelinePostSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def timeline_posts(request):
    base_user = request.user
    
    if hasattr(base_user, 'learner'):
        user = base_user.learner
    elif hasattr(base_user, 'educator'):
        user = base_user.educator
    elif hasattr(base_user, 'personal'):
        user = base_user.personal
    else:
        # Handle unexpected user types if any
        return Response({"message": "Invalid user type"}, status=400)


    following = user.following.all()

    posts = Post.objects.filter(user__in=following).order_by('-created_at')  # Correct the field to 'user' and order by created_at
    serializer = TimelinePostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
