# urls.py
from django.urls import path, include

urlpatterns = [
    path('', include('src.baseUser.urls')),
    path('calculator/', include('src.calc.expression.urls')),    
]