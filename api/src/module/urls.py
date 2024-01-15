from django.urls import path
from .views import PersonalDetail, ModuleCreate

urlpatterns = [
    path('personal/<int:pk>/', PersonalDetail.as_view(), name='personal-detail'),
    path('personal/module/create/', ModuleCreate.as_view(), name='module-create'),
]