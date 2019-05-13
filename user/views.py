from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.generic import CreateView, DeleteView, UpdateView, ListView


class UserCreateView(CreateView):
    model = User
    email = ['email']
    template_name = "user/register.html"
    fields = ['username', 'email', 'first_name', 'last_name', 'password']

 

class UserUpdateView(UpdateView):
    model = User
    template_name = "user/update_profile.html"
    fields = ['username', 'email', 'first_name', 'last_name']