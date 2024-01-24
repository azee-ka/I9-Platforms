# # api/time_line/struct/post/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, CreateAPIView
from .models import Post, Comment, MediaFile
from .serializers import PostSerializer, CommentSerializer, MediaFileSerializer
from django.db import transaction

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
from .serializers import PostSerializer, PostSerializer, CommentSerializer
import uuid
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


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
            elif hasattr(base_user, 'professional'):
                user = base_user.professional
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






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_post_by_id(request, post_id):

    try:
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK) # Use status.HTTP_200_OK
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND) # Use status.HTTP_404_NOT_FOUND


@api_view(['POST'])  # Use POST method for creating comments
@permission_classes([IsAuthenticated])
def create_comment(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    # Assuming the 'text' for the comment is sent in the request data
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def create_like(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user

    if request.method == 'POST':
        # Check if the user has already disliked the post, and remove the dislike
        if user in post.dislikes.all():
            post.dislikes.remove(user)

        # Check if the user is already in the list of likers
        if user not in post.likes.all():
            # Like the post
            post.likes.add(user)

    elif request.method == 'DELETE':
        # Unlike the post
        post.likes.remove(user)

    post.save()

    serializer = PostSerializer(post)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def create_dislike(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user

    if request.method == 'POST':
        # Check if the user has already liked the post, and remove the like
        if user in post.likes.all():
            post.likes.remove(user)

        # Check if the user is already in the list of dislikers
        if user not in post.dislikes.all():
            # Dislike the post
            post.dislikes.add(user)

    elif request.method == 'DELETE':
        # Remove the dislike
        post.dislikes.remove(user)

    post.save()

    serializer = PostSerializer(post)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the current user is the owner of the post
    if request.user == post.user:
        post.delete()
        return Response({'success': True, 'message': 'Post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({'error': 'You do not have permission to delete this post'}, status=status.HTTP_403_FORBIDDEN)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_like_status(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.user

    # Check if the user has liked the post
    liked = user in post.likes.all()

    # Check if the user has disliked the post
    disliked = user in post.dislikes.all()

    # Return the like status
    return Response({'liked': liked, 'disliked': disliked}, status=status.HTTP_200_OK)