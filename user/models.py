from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pp = models.CharField(default='default.jpg', max_length=64)
    departement = models.CharField(max_length=3)
    nik = models.IntegerField()
    
    def __str__(self):
        return self.user

    