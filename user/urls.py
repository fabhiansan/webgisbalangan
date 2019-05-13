from django.contrib.auth.models import User
from django.urls import include, path
from . views import UserCreateView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register')
]