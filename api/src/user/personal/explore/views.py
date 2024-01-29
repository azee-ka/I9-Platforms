# api/phrase/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ....post.models import Post
from ....post.serializers import PostSerializer, MinimalPostSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # You can add authentication as needed
def get_explore_posts(request):
    # Get all posts from the database
    posts = Post.objects.all().order_by('?')
    
    # Serialize the posts
    serializer = MinimalPostSerializer(posts, many=True)
    return Response(serializer.data)
