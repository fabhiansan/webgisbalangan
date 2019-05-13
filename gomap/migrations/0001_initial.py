# Generated by Django 2.1.7 on 2019-04-26 06:54

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AllBor',
            fields=[
                ('objectid_1', models.AutoField(primary_key=True, serialize=False)),
                ('objectid', models.IntegerField(blank=True, null=True)),
                ('nomor', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('id_bor', models.CharField(blank=True, max_length=254, null=True)),
                ('x', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('y', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('z', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('depth_from', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('depth_bott', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('lithologi', models.CharField(blank=True, max_length=254, null=True)),
                ('azimuth', models.CharField(blank=True, max_length=254, null=True)),
                ('inklinasi', models.CharField(blank=True, max_length=254, null=True)),
                ('seam', models.CharField(blank=True, max_length=254, null=True)),
                ('depth', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('shape', django.contrib.gis.db.models.fields.GeometryField(blank=True, null=True, srid=32750)),
            ],
            options={
                'db_table': 'all_bor',
            },
        ),
        migrations.CreateModel(
            name='RciHauling',
            fields=[
                ('objectid_1', models.AutoField(primary_key=True, serialize=False)),
                ('objectid', models.IntegerField(blank=True, null=True)),
                ('segmen', models.CharField(blank=True, max_length=50, null=True)),
                ('undulating', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('potholeo', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('mainroad', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('shoulder', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('drainage', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('bundwall', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('grade', models.DecimalField(blank=True, decimal_places=8, max_digits=38, null=True)),
                ('shape', django.contrib.gis.db.models.fields.GeometryField(blank=True, null=True, srid=32750)),
            ],
            options={
                'db_table': 'rci_hauling',
            },
        ),
        migrations.CreateModel(
            name='Reklamasi',
            fields=[
                ('objectid_1', models.AutoField(primary_key=True, serialize=False)),
                ('objectid', models.IntegerField(blank=True, null=True)),
                ('luasan', models.DecimalField(blank=True, decimal_places=8, max_digits=18, null=True)),
                ('kemiringan', models.IntegerField(blank=True, null=True)),
                ('tinggi', models.IntegerField(blank=True, null=True)),
                ('lebar', models.DecimalField(blank=True, decimal_places=8, max_digits=18, null=True)),
                ('panjang', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('shape', django.contrib.gis.db.models.fields.GeometryField(blank=True, null=True, srid=32750)),
            ],
            options={
                'db_table': 'reklamasi',
            },
        ),
    ]
