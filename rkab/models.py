from django.db import models
# Create your models here.

class RCI(models.Model):
    segmen = models.CharField(max_length=5)
    undulating = models.IntegerField()
    porthole = models.IntegerField()
    mainroad = models.IntegerField()
    shoulder = models.IntegerField()
    drainage = models.IntegerField()
    bundwall = models.IntegerField()
    grade = models.IntegerField()
    RCI = models.FloatField()
    objects = models.Manager()
    def __str__(self):
        return self.segmen

class Reklamasi(models.Model):
    nama = models.CharField(max_length=5)
    luas = models.FloatField()
    tanaman_utama = models.CharField(max_length=24)
    status = models.CharField(max_length=24)
    objects = models.Manager()
    def __str__(self):
        return self.nama