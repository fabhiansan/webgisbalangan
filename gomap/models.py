
from django.db import models
from django.contrib.gis.db import models   
from django.db.models import Manager

# Create your models here.
class AllBor(models.Model):
    objectid_1 = models.AutoField(primary_key=True)
    objectid = models.IntegerField(blank=True, null=True)
    nomor = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    id_bor = models.CharField(max_length=254, blank=True, null=True)
    x = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    y = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    z = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    depth_from = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    depth_bott = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    lithologi = models.CharField(max_length=254, blank=True, null=True)
    azimuth = models.CharField(max_length=254, blank=True, null=True)
    inklinasi = models.CharField(max_length=254, blank=True, null=True)
    seam = models.CharField(max_length=254, blank=True, null=True)
    depth = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    shape = models.GeometryField(srid=32750, blank=True, null=True)
    objects = Manager()

    def __str__(self):
        return self.id_bor

    class Meta:
        db_table = 'all_bor'

class RciHauling(models.Model):
    objectid_1 = models.AutoField(primary_key=True)
    objectid = models.IntegerField(blank=True, null=True)
    segmen = models.CharField(max_length=50, blank=True, null=True)
    undulating = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    potholeord = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    mainroad = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    shoulder = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    drainage = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    bundwall = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    grade = models.DecimalField(max_digits=38, decimal_places=8, blank=True, null=True)
    shape = models.GeometryField(srid=32750, blank=True, null=True)
    objects = Manager()

    def roadindex(self):
        rci = (self.undulating + 0.2 ) + (self.potholeord * 0.2) + (self.mainroad * 0.15) + (self.shoulder * 0.15) + (self.drainage * 0.15) + (self.bundwall * 0.1) + (self.grade * 0.05)
        return rci 

    class Meta:
        db_table = 'rci_hauling'
    
    def __str__(self):
        return self.segmen
    


class Reklamasi(models.Model):
    objectid_1 = models.AutoField(primary_key=True)
    objectid = models.IntegerField(blank=True, null=True)
    luasan = models.DecimalField(max_digits=18, decimal_places=8, blank=True, null=True)
    kemiringan = models.IntegerField(blank=True, null=True)
    tinggi = models.IntegerField(blank=True, null=True)
    lebar = models.DecimalField(max_digits=18, decimal_places=8, blank=True, null=True)
    panjang = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    shape = models.GeometryField(srid=32750, blank=True, null=True)
    objects = Manager()

    class Meta:
        db_table = 'reklamasi'
    
    def __str__(self):
        return self.name
