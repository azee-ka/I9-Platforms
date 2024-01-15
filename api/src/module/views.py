# src/user/views.py

# src/user/views.py
from rest_framework import generics
from ..user.models import Personal
from .models import Module
from ..user.serializers import PersonalSerializer, ModuleSerializer

class PersonalDetail(generics.RetrieveUpdateAPIView):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

class ModuleCreate(generics.CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
