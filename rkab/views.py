from django.shortcuts import render
from . models import RCI, Reklamasi
from django.views.generic import CreateView, ListView
from django.forms import ModelForm
# Create your views here.
from django.utils import timezone
from . models import RCI, Reklamasi

class InputRCI(CreateView):
    model = RCI
    template_name = "rkab/input_rci.html"
    fields = ['segmen', 'undulating', 'porthole', 'mainroad', 'shoulder', 'drainage', 'bundwall', 'grade', 'RCI']
    success_url = '/list_rci'
    def form_valid(self, form):
        return super().form_valid(form)
    


class ListRCI(ListView):
    model = RCI
    template_name = "rkab/list_rci.html"
    paginate_by = 10
    ordering = ['-segmen']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context

class InputReklamasi(CreateView):
    model = Reklamasi
    template_name = "rkab/input_reklamasi.html"
    fields = ['nama', 'luas', 'tanaman_utama', 'status']
    success_url = '/list_reklamasi'
    def form_valid(self, form):
        return super().form_valid(form)
    


class ListReklamasi(ListView):
    model = Reklamasi
    template_name = "rkab/list_reklamasi.html"
    paginate_by = 10
    ordering = ['-nama']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context

def matriksRKAB(request):
    reklamasi = Reklamasi.objects.all()
    rci = RCI.objects.all()
    context = {
        'reklamasi' : reklamasi,
        'rci' : rci
    }
    return render(request, 'rkab/matriksrkab.html', context=context)
