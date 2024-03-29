# urls.py
from django.urls import path, include

urlpatterns = [
    path('', include('src.user.urls')),
    path('calculator/', include('src.calc.expression.urls')), 
    path('', include('src.module.urls')),
    path('', include('src.post.urls')),
    path('', include('src.notification.urls')),

]