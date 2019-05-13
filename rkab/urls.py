from django.urls import path
from . views import InputRCI, ListRCI, InputReklamasi, ListReklamasi, matriksRKAB


urlpatterns = [
    path('input_rci/', InputRCI.as_view(), name='input-rci'),
    path('list_rci/', ListRCI.as_view(), name='list-rci'),
    path('input_reklamasi/', InputReklamasi.as_view(), name='input-reklamasi'),
    path('list_reklamasi/', ListReklamasi.as_view(), name='list-reklamasi'),
    path('matriksrkab/', matriksRKAB, name='matriks-rkab')
]
