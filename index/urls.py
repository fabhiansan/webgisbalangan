from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('map/', views.mapviews),
    path('jquery/', views.jquery),
    path('map2/', views.api),
    path('dmsconverter/', views.dmsconverter, name='dmsconverter'),
    path("degreeconverter/", views.degreeconverter, name='degreeconverter'),
]
