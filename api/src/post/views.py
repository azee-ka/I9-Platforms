# # api/time_line/struct/post/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from .models import Post, Comment, MediaFile
from .serializers import PostSerializer, CommentSerializer, MediaFileSerializer

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
class PostRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CreateCommentView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer





from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Post, MediaFile
from .serializers import PostSerializer
import uuid

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        if request.user.is_authenticated:
            # Create a new post
            post = serializer.save(user=request.user, id=uuid.uuid4())

            # Handle multiple media files
            media_files = request.FILES.getlist('media[]')
            print(media_files)
            for media_file in media_files:
                media_type = media_file.name.split('.')[-1]
                media = MediaFile.objects.create(file=media_file, media_type=media_type)
                post.media_files.add(media)

            post.save()


            base_user = request.user
            # Attempt to cast the base user to more specific user types
            if hasattr(base_user, 'learner'):
                user = base_user.learner
            elif hasattr(base_user, 'educator'):
                user = base_user.educator
            elif hasattr(base_user, 'personal'):
                user = base_user.personal
            else:
                # Handle unexpected user types if any
                return Response({"message": "Invalid user type"}, status=400)

            # Associate the new post with the user's my_posts field
            user.my_posts.add(post)

            # Include the username in the response data
            serialized_data = serializer.data
            serialized_data['id'] = str(post.id)
            serialized_data['username'] = request.user.username  # Add username to the response

            return Response(serialized_data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
