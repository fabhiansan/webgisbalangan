from django.urls import path
from . import views
from django.conf.urls import include,url
from .views import AllBorView, ReklamasiView, RcihaulingView, pojokss, AllBorList, allborclass

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^borhole/', views.AllBorView, name='borhole'),
    url(r'^rci/', views.RcihaulingView, name='rci'),
    url(r'^reklamasi', views.ReklamasiView, name='reklamasi'),
    path('pojokss/', views.pojokss, name='pojokss'),
    path('allborlist/', AllBorList, name='allbor-list'),
    path('allborlist-class', allborclass.as_view(), name='allborclass')
]
