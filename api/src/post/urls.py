from django.urls import path
from .views import create_post, get_post_by_id, create_comment, create_like, create_dislike, delete_post


urlpatterns = [
    path('personal/create-post/', create_post, name='create-post'),
    
    path('posts/<uuid:post_id>/', get_post_by_id, name='get_post_by_id'),
    path('posts/<uuid:post_id>/comment/', create_comment, name='create-comment'),
    path('posts/<uuid:post_id>/like/', create_like, name='like-post'),
    path('posts/<uuid:post_id>/dislike/', create_dislike, name='dislike-post'),
    path('posts/<uuid:post_id>/delete/', delete_post, name='delete-post'),

]
