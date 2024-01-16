# urls.py
from django.urls import path, include

urlpatterns = [
    path('', include('src.user.urls')),
    path('calculator/', include('src.calc.expression.urls')), 
    # path('personal/', include('src.module.urls')),       
]